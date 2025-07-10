import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  AlertCircle,
  CheckCircle,
  Truck,
  Store,
  Calendar,
  ChevronLeft,
  User,
  Phone,
  Mail,
  Package,
  CreditCard,
  Loader2,
  Check,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import {
  useGetOrderByIdQuery,
  useUpdateOrderStatusMutation,
} from "../../services/api/orderApi";

const statusOptions = [
  {
    value: "pending",
    label: "Pending",
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    value: "preparing",
    label: "Preparing",
    color: "bg-blue-100 text-blue-800",
  },
  { value: "ready", label: "Ready", color: "bg-green-100 text-green-800" },
  {
    value: "completed",
    label: "Completed",
    color: "bg-purple-100 text-purple-800",
  },
  { value: "cancelled", label: "Cancelled", color: "bg-red-100 text-red-800" },
];

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: order, isLoading, isError } = useGetOrderByIdQuery(orderId!);
  const [updateStatus, { isLoading: isUpdating }] =
    useUpdateOrderStatusMutation();
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    if (order) {
      setSelectedStatus(order.status);
    }
  }, [order]);

  // const handleStatusChange = async (newStatus: string) => {
  //   try {
  //     await updateStatus({ id: orderId!, status: newStatus }).unwrap();
  //     toast({
  //       title: "Success",
  //       description: `Order status updated to ${newStatus}`,
  //     });
  //   } catch (err) {
  //     toast({
  //       title: "Error",
  //       description: "Failed to update order status",
  //       variant: "destructive",
  //     });
  //   }
  // };

  const handleStatusChange = async (newStatus: string) => {
    try {
      await updateStatus({ id: orderId!, status: newStatus }).unwrap();
      toast({
        title: "Success",
        description: `Order status updated to ${newStatus}`,
      });

      // Navigate back after a short delay (optional)
      setTimeout(() => {
        navigate(-1);
      }, 1000); // Delay by 1 second for better UX
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update order status",
        variant: "destructive",
      });
    }
  };

  const getStatusDetails = (status: string) => {
    return (
      statusOptions.find((option) => option.value === status) ||
      statusOptions[0]
    );
  };

  const calculateDeliveryFee = () => {
    return order?.delivery.type === "delivery" ? 500 : 0;
  };

  const calculateTotal = () => {
    return order?.totalPrice + calculateDeliveryFee();
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="p-6 text-center">
        <AlertCircle className="h-12 w-12 mx-auto text-gray-400" />
        <h3 className="mt-4 text-lg font-medium">Order not found</h3>
        <p className="mt-2 text-gray-500">
          The order you're looking for doesn't exist or may have been deleted.
        </p>
        <Button onClick={() => navigate(-1)} className="mt-4">
          Go back
        </Button>
      </div>
    );
  }

  // Use populated product data directly
  const enrichedItems = order.items.map((item: any) => ({
    ...item,
    productDetails: item.product,
    price: item.product?.price || 0,
  }));

  return (
    <div className="space-y-6 p-4 sm:p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Orders
        </Button>

        <Badge
          variant="outline"
          className={getStatusDetails(order.status).color}
        >
          {getStatusDetails(order.status).label}
        </Badge>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Order Details */}
        <div className="flex-1 space-y-6">
          {/* Customer & Delivery Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Customer Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Customer</span>
                </CardTitle>
                <CardDescription>Contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium">{order.buyer.fullName}</p>
                  <p className="text-sm text-gray-500">Customer</p>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span>{order.buyer.emailAddress}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span>{order.buyer.phoneNumber}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  {order.delivery.type === "delivery" ? (
                    <Truck className="h-5 w-5" />
                  ) : (
                    <Store className="h-5 w-5" />
                  )}
                  <span>
                    {order.delivery.type === "delivery" ? "Delivery" : "Pickup"}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {order.delivery.type === "delivery" ? (
                  <div>
                    <p className="font-medium">{order.delivery.address}</p>
                    <p className="text-sm text-gray-500">Delivery address</p>
                  </div>
                ) : (
                  <div>
                    <p className="font-medium">Masa Treat</p>
                    <p className="text-sm text-gray-500">
                      B14 Close, Citec Estate, Mbora, Abuja.
                    </p>
                  </div>
                )}
                {order.isScheduled && (
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>
                      {order.scheduledDate} at {order.scheduledTime}
                    </span>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-4 w-4 text-gray-400" />
                  <span>
                    Payment:{" "}
                    {order.paymentOnDelivery ? "On Delivery" : "Paid Online"}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
              <CardDescription>
                {enrichedItems.length} items in this order
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {enrichedItems.map((item: any, i: number) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                      {item.productDetails?.image ? (
                        <img
                          src={item.productDetails.image}
                          alt={item.productDetails.product}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Package className="h-full w-full p-3 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">
                        {item.productDetails?.product || "Unknown Product"}
                      </p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm text-gray-500">
                          {item.productDetails?.category || "Uncategorized"}
                        </span>
                        <span className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="font-medium">
                    ₦{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Summary + Update Status */}
        <div className="lg:w-96 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span>₦{order.totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Delivery Fee</span>
                <span>₦{calculateDeliveryFee()}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₦{calculateTotal()}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Update Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                disabled={isUpdating}
                className="w-full border rounded px-3 py-2"
              >
                {statusOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <Button
                className="w-full"
                disabled={isUpdating || selectedStatus === order.status}
                onClick={() => handleStatusChange(selectedStatus)}
              >
                {isUpdating ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Check className="h-4 w-4 mr-2" />
                )}
                Update Status
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
