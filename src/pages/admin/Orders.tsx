// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Clock,
//   AlertCircle,
//   CheckCircle,
//   Calendar,
//   Truck,
//   Store,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useGetOrdersQuery } from "../../services/api/orderApi"; // adjust path if needed

// const getOrderStatusClass = (status: string) => {
//   switch (status) {
//     case "pending":
//       return "bg-yellow-100 text-yellow-800 border-yellow-200";
//     case "preparing":
//       return "bg-blue-100 text-blue-800 border-blue-200";
//     case "ready":
//       return "bg-green-100 text-green-800 border-green-200";
//     case "completed":
//       return "bg-gray-200 text-gray-800 border-gray-300";
//     case "cancelled":
//       return "bg-red-100 text-red-800 border-red-200";
//     default:
//       return "bg-gray-100 text-gray-800 border-gray-200";
//   }
// };

// const getStatusIcon = (status: string) => {
//   switch (status) {
//     case "pending":
//       return <Clock className="h-4 w-4" />;
//     case "preparing":
//       return <AlertCircle className="h-4 w-4" />;
//     case "ready":
//     case "completed":
//       return <CheckCircle className="h-4 w-4" />;
//     case "cancelled":
//       return <AlertCircle className="h-4 w-4 text-red-500" />;
//     default:
//       return <Clock className="h-4 w-4" />;
//   }
// };

// const getDeliveryIcon = (type: string) => {
//   return type === "delivery" ? (
//     <Truck className="h-4 w-4 text-blue-500" />
//   ) : (
//     <Store className="h-4 w-4 text-green-500" />
//   );
// };

// export default function Orders() {
//   const navigate = useNavigate();
//   const { data: orders = [], isLoading, isError, error } = useGetOrdersQuery();

//   const handleOrderClick = (orderId: string) => {
//     navigate(`orderdetails/${orderId}`);
//   };

//   if (isLoading) {
//     return <p className="text-center text-gray-500">Loading orders...</p>;
//   }

//   if (isError) {
//     return (
//       <p className="text-center text-red-500">
//         Failed to load orders: {error?.message || "Unknown error"}
//       </p>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="text-left">
//         <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
//           Active Orders
//         </h1>
//         <p className="text-neutral-600 mt-2 text-sm sm:text-base">
//           Manage current orders in progress
//         </p>
//       </div>

//       {/* Orders List */}
//       <Card className="border-0 shadow-sm bg-white">
//         <CardHeader className="p-4 sm:p-6">
//           <CardTitle className="text-base sm:text-lg font-semibold text-neutral-900">
//             Current Orders ({orders.length})
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="p-0">
//           <div className="divide-y divide-neutral-100">
//             {orders.map((order: any) => (
//               <div
//                 key={order._id}
//                 onClick={() => handleOrderClick(order._id)}
//                 className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 hover:bg-neutral-50 transition-colors cursor-pointer"
//               >
//                 <div className="flex-1 min-w-0 space-y-2">
//                   <div className="flex items-center space-x-3">
//                     {getStatusIcon(order.status)}
//                     <p className="font-medium text-neutral-900 text-sm sm:text-base">
//                       {order.buyer.fullName}
//                     </p>
//                     <span
//                       className={`px-2 py-1 rounded-full text-xs font-medium border ${getOrderStatusClass(
//                         order.status
//                       )}`}
//                     >
//                       {order.status.charAt(0).toUpperCase() +
//                         order.status.slice(1)}
//                     </span>
//                   </div>

//                   <div className="flex items-center space-x-2 ml-7">
//                     {getDeliveryIcon(order.delivery.type)}
//                     <p className="text-xs sm:text-sm text-neutral-500">
//                       {order._id.slice(-6).toUpperCase()} • {order.items.length}{" "}
//                       items • {order.delivery.type}
//                     </p>
//                   </div>

//                   {order.isScheduled && (
//                     <div className="flex items-center space-x-2 ml-7">
//                       <Calendar className="h-4 w-4 text-purple-500" />
//                       <p className="text-xs sm:text-sm text-purple-600">
//                         Scheduled: {order.scheduledDate} at{" "}
//                         {order.scheduledTime}
//                       </p>
//                     </div>
//                   )}

//                   {order.delivery.type === "delivery" &&
//                     order.delivery.address && (
//                       <p className="text-xs text-neutral-500 ml-7">
//                         {order.delivery.address}
//                       </p>
//                     )}

//                   <p className="text-xs text-neutral-400 ml-7">
//                     {new Date(order.createdAt).toLocaleString()}
//                   </p>
//                 </div>

//                 <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-right">
//                   <p className="font-semibold text-neutral-900 text-sm sm:text-base">
//                     ₦{order.totalPrice.toLocaleString()}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Clock,
  AlertCircle,
  CheckCircle,
  Calendar,
  Truck,
  Store,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetOrdersQuery } from "../../services/api/orderApi";

const getOrderStatusClass = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "preparing":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "ready":
      return "bg-green-100 text-green-800 border-green-200";
    case "completed":
      return "bg-gray-200 text-gray-800 border-gray-300";
    case "cancelled":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "pending":
      return <Clock className="h-4 w-4" />;
    case "preparing":
      return <AlertCircle className="h-4 w-4" />;
    case "ready":
    case "completed":
      return <CheckCircle className="h-4 w-4" />;
    case "cancelled":
      return <AlertCircle className="h-4 w-4 text-red-500" />;
    default:
      return <Clock className="h-4 w-4" />;
  }
};

const getDeliveryIcon = (type: string) => {
  return type === "delivery" ? (
    <Truck className="h-4 w-4 text-blue-500" />
  ) : (
    <Store className="h-4 w-4 text-green-500" />
  );
};

export default function Orders() {
  const navigate = useNavigate();
  const { data: orders = [], isLoading, isError, error } = useGetOrdersQuery();

  const handleOrderClick = (orderId: string) => {
    navigate(`orderdetails/${orderId}`);
  };

  const activeOrders = orders.filter(
    (order: any) => order.status !== "completed" && order.status !== "cancelled"
  );

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading orders...</p>;
  }

  if (isError) {
    return (
      <p className="text-center text-red-500">
        Failed to load orders: {error?.message || "Unknown error"}
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-left">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
          Active Orders
        </h1>
        <p className="text-neutral-600 mt-2 text-sm sm:text-base">
          Manage current orders in progress
        </p>
      </div>

      {/* Orders List */}
      <Card className="border-0 shadow-sm bg-white">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-base sm:text-lg font-semibold text-neutral-900">
            Current Orders ({activeOrders.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-neutral-100">
            {activeOrders.map((order: any) => (
              <div
                key={order._id}
                onClick={() => handleOrderClick(order._id)}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 hover:bg-neutral-50 transition-colors cursor-pointer"
              >
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(order.status)}
                    <p className="font-medium text-neutral-900 text-sm sm:text-base">
                      {order.buyer.fullName}
                    </p>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium border ${getOrderStatusClass(
                        order.status
                      )}`}
                    >
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 ml-7">
                    {getDeliveryIcon(order.delivery.type)}
                    <p className="text-xs sm:text-sm text-neutral-500">
                      {order._id.slice(-6).toUpperCase()} • {order.items.length}{" "}
                      items • {order.delivery.type}
                    </p>
                  </div>

                  {order.isScheduled && (
                    <div className="flex items-center space-x-2 ml-7">
                      <Calendar className="h-4 w-4 text-purple-500" />
                      <p className="text-xs sm:text-sm text-purple-600">
                        Scheduled: {order.scheduledDate} at{" "}
                        {order.scheduledTime}
                      </p>
                    </div>
                  )}

                  {order.delivery.type === "delivery" &&
                    order.delivery.address && (
                      <p className="text-xs text-neutral-500 ml-7">
                        {order.delivery.address}
                      </p>
                    )}

                  <p className="text-xs text-neutral-400 ml-7">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-right">
                  <p className="font-semibold text-neutral-900 text-sm sm:text-base">
                    ₦{order.totalPrice.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
