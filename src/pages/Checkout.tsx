declare global {
  interface Window {
    PaystackPop?: any;
  }
}

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store"; // <-- Ensure you have this defined in your app
import { clearCart } from "../services/cartSlice";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatCurrency, generateOrderId } from "@/lib/utils";
import { DeliveryMethod } from "@/data/types";
import { toast } from "@/components/ui/sonner";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Calendar, Clock } from "lucide-react";
import { deliveryZones, getDeliveryZoneById } from "@/data/deliveryZones";

export default function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const items = useSelector((state: RootState) => state.cart.items);
  const totalAmount = items.reduce((acc, item) => {
    const price = item.selectedPackage?.price || item.product.price;
    return acc + price * item.quantity;
  }, 0);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [deliveryMethod, setDeliveryMethod] =
    useState<DeliveryMethod>("pickup");
  const [deliveryZone, setDeliveryZone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedZone = deliveryZone
    ? getDeliveryZoneById(deliveryZone)
    : undefined;

  useEffect(() => {
    if (!window.PaystackPop) {
      const script = document.createElement("script");
      script.src = "https://js.paystack.co/v1/inline.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const deliveryFee =
      deliveryMethod === "delivery" && selectedZone ? selectedZone.price : 0;
    const grandTotal = totalAmount + deliveryFee;

    const paystack =
      window.PaystackPop &&
      window.PaystackPop.setup({
        key: "pk_test_580f8fb3386a58f8bd2af3e96228aa02fc13782c",
        email: email || "noemail@aroma-kitchen.com",
        amount: grandTotal * 100,
        currency: "NGN",
        ref: generateOrderId(),
        callback: function (response: any) {
          fetch("/api/send-order-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderId: response.reference,
              name,
              phone,
              email,
              deliveryMethod,
              deliveryZone,
              deliveryAddress,
              isScheduled,
              scheduledDate,
              scheduledTime,
              items,
              totalAmount: grandTotal,
            }),
          })
            .then((res) => {
              if (!res.ok) throw new Error("Failed to send email");
              dispatch(clearCart());
              toast.success("Order placed and email sent!");
              navigate("/");
            })
            .catch(() => {
              toast.error("Order placed, but failed to send email.");
              navigate("/");
            })
            .finally(() => setIsSubmitting(false));
        },
        onClose: function () {
          setIsSubmitting(false);
          toast.info("Payment cancelled.");
        },
      });

    if (paystack) {
      paystack.openIframe();
    } else {
      setIsSubmitting(false);
      toast.error("Unable to load payment gateway. Please try again.");
    }
  };

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-xl font-medium mb-4">Your cart is empty</h1>
            <p className="mb-6 text-sm">
              Add some delicious items to your cart before checking out.
            </p>
            <Button onClick={() => navigate("/menu")} size="sm">
              Browse Menu
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-10 bg-neutral-50">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-medium mb-6">Checkout</h1>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Customer Info + Delivery Options */}
              <div className="md:col-span-2 space-y-5">
                <div className="bg-white p-5 rounded-lg shadow-sm border">
                  <h2 className="text-lg font-medium mb-4">Your Information</h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-sm">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-sm">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-sm">
                        Email Address (Optional)
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-lg shadow-sm border">
                  <h2 className="text-lg font-medium mb-4">Delivery Options</h2>

                  <RadioGroup
                    value={deliveryMethod}
                    onValueChange={(val) =>
                      setDeliveryMethod(val as DeliveryMethod)
                    }
                    className="mb-6"
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value="pickup" id="pickup" />
                      <Label htmlFor="pickup" className="text-sm">
                        Pickup (Free)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="delivery" id="delivery" />
                      <Label htmlFor="delivery" className="text-sm">
                        Delivery (Paid on arrival)
                      </Label>
                    </div>
                  </RadioGroup>

                  {deliveryMethod === "delivery" && (
                    <div className="space-y-4 mb-6">
                      <div>
                        <Label htmlFor="zone" className="text-sm">
                          Select Your Zone
                        </Label>
                        <Select
                          value={deliveryZone}
                          onValueChange={setDeliveryZone}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a zone" />
                          </SelectTrigger>
                          <SelectContent>
                            {deliveryZones.map((zone) => (
                              <SelectItem
                                key={zone.id}
                                value={zone.id}
                                className="text-sm"
                              >
                                {zone.name} - {formatCurrency(zone.price)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="address" className="text-sm">
                          Detailed Address
                        </Label>
                        <Input
                          id="address"
                          value={deliveryAddress}
                          onChange={(e) => setDeliveryAddress(e.target.value)}
                          placeholder="Enter your full address"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {deliveryMethod === "pickup" && (
                    <div className="mb-6 p-4 bg-neutral-50 rounded-lg">
                      <h3 className="font-medium mb-2 text-sm">
                        Pickup Address
                      </h3>
                      <p className="text-sm text-neutral-700">
                        House 13, B14 Close, Citect Estate, Mbora, Abuja
                      </p>
                      <a
                        href="https://maps.google.com/?q=Citect+Estate+Mbora+Abuja"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-brand-500 hover:underline mt-1 inline-block"
                      >
                        View on Google Maps
                      </a>
                    </div>
                  )}

                  <div className="mb-6">
                    <div className="flex items-center mb-4">
                      <input
                        type="checkbox"
                        id="scheduled"
                        checked={isScheduled}
                        onChange={() => setIsScheduled(!isScheduled)}
                        className="w-4 h-4"
                      />
                      <label htmlFor="scheduled" className="ml-2 text-sm">
                        Schedule for later
                      </label>
                    </div>

                    {isScheduled && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label
                            htmlFor="date"
                            className="text-sm flex items-center"
                          >
                            <Calendar className="h-3 w-3 mr-1" />
                            Date
                          </Label>
                          <Input
                            id="date"
                            type="date"
                            value={scheduledDate}
                            onChange={(e) => setScheduledDate(e.target.value)}
                            required
                          />
                        </div>

                        <div>
                          <Label
                            htmlFor="time"
                            className="text-sm flex items-center"
                          >
                            <Clock className="h-3 w-3 mr-1" />
                            Time
                          </Label>
                          <Input
                            id="time"
                            type="time"
                            value={scheduledTime}
                            onChange={(e) => setScheduledTime(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="md:col-span-1">
                <div className="bg-white p-5 rounded-lg shadow-sm border sticky top-24">
                  <h2 className="text-lg font-medium mb-4">Order Summary</h2>

                  <div className="space-y-3 mb-5">
                    {items.map((item) => (
                      <div
                        key={`${item.product._id}-${
                          item.selectedPackage?.id || "default"
                        }`}
                        className="flex justify-between border-b pb-2"
                      >
                        <div>
                          <span className="font-medium text-sm">
                            {item.quantity}x {item.product.name}
                            {item.selectedPackage &&
                              ` (${item.selectedPackage.name})`}
                          </span>
                          {item.notes && (
                            <p className="text-xs text-neutral-500 mt-1">
                              {item.notes}
                            </p>
                          )}
                        </div>
                        <span className="text-sm">
                          {formatCurrency(
                            (item.selectedPackage?.price ||
                              item.product.price) * item.quantity
                          )}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 pt-2 mb-5 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>{formatCurrency(totalAmount)}</span>
                    </div>

                    <div className="flex justify-between text-neutral-500">
                      <span>Delivery Fee</span>
                      <span>
                        {deliveryMethod === "pickup"
                          ? "Free"
                          : selectedZone
                          ? formatCurrency(selectedZone.price)
                          : "Select a zone"}
                      </span>
                    </div>

                    <div className="flex justify-between border-t pt-2 font-medium">
                      <span>Total</span>
                      <span className="text-brand-500">
                        {formatCurrency(totalAmount)}
                        {deliveryMethod === "delivery" && selectedZone && (
                          <span className="block text-xs text-neutral-500">
                            + {formatCurrency(selectedZone.price)} on delivery
                          </span>
                        )}
                      </span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-brand-500 hover:bg-brand-600 text-sm"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing..." : "Place Order"}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
