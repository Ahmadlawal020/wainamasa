 declare global {
  interface Window {
    PaystackPop?: any;
  }
 }

 import { useEffect, useState } from "react";
 import { useNavigate } from "react-router-dom";
 import { useSelector, useDispatch } from "react-redux";
 import { RootState } from "../app/store";
 import { clearCart } from "../services/cartSlice";
 import { useVerifyPaymentMutation } from "../services/api/orderApi";

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
 import { deliveryZones, getDeliveryZoneById } from "@/data/deliveryZones";

 export default function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [verifyPayment] = useVerifyPaymentMutation();

  const items = useSelector((state: RootState) => state.cart.items);
  const totalAmount = items.reduce((acc, item) => {
    const price = item.selectedPackage?.price || item.product.price;
    return acc + price * item.quantity;
  }, 0);

  // Form States
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("pickup");
  const [deliveryZone, setDeliveryZone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedZone = deliveryZone ? getDeliveryZoneById(deliveryZone) : undefined;

  // Define the pickup address
  const pickupAddress = "Aroma Kitchen, Citec Estate, Mbora, Abuja"; // Example pickup address

  // Load Paystack
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

    const grandTotal = totalAmount; // delivery fee is paid on arrival

    const paystack = window.PaystackPop?.setup({
      key: "pk_test_076ac43c69aec7a3279d8048922477c32bbdf891",
      email: email || "noemail@aroma-kitchen.com",
      amount: grandTotal * 100,
      currency: "NGN",
      ref: generateOrderId(),
      metadata: {
        custom_fields: [
          { display_name: "Full Name", variable_name: "full_name", value: name },
          { display_name: "Phone Number", variable_name: "phone_number", value: phone },
        ],
      },
      callback: (response: any) => {
        const orderPayload = {
          reference: response.reference,
          orderData: {
            buyer: {
              fullName: name,
              phoneNumber: phone,
              emailAddress: email || "noemail@aroma-kitchen.com",
            },
            items: items.map((item) => ({
              product: item.product._id,
              quantity: item.quantity,
            })),
            delivery: {
              type: deliveryMethod,
              address: deliveryMethod === "pickup" ? pickupAddress : deliveryAddress, // Use pickupAddress if pickup
              fee: deliveryMethod === "pickup" ? 0 : (selectedZone?.price || 0), // Set delivery fee to 0 for pickup
            },
            isScheduled,
            scheduledDate,
            scheduledTime,
            paymentOnDelivery: false,
            totalAmount: grandTotal,
          },
        };

        verifyPayment(orderPayload)
          .unwrap()
          .then(() => {
            dispatch(clearCart());
            toast.success("Payment successful, order placed!");
            navigate("/");
          })
          .catch(() => {
            toast.error("Payment verified but failed to place order.");
            setIsSubmitting(false);
          });
      },
      onClose: () => {
        setIsSubmitting(false);
        toast.info("Payment cancelled.");
      },
    });

    if (paystack) {
      paystack.openIframe();
    } else {
      setIsSubmitting(false);
      toast.error("Unable to load payment gateway.");
    }
  };

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-xl font-semibold mb-4">Your cart is empty</h1>
            <p className="mb-6 text-sm text-muted-foreground">
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
          <h1 className="text-2xl font-semibold mb-6">Checkout</h1>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Form Section */}
            <div className="md:col-span-2 space-y-6">
              {/* User Info */}
              <div className="bg-white p-5 rounded-lg shadow-sm border">
                <h2 className="text-lg font-medium mb-4">Your Information</h2>
                <div className="space-y-4">
                  <Input required placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
                  <Input required placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  <Input placeholder="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>

              {/* Delivery */}
              <div className="bg-white p-5 rounded-lg shadow-sm border">
                <h2 className="text-lg font-medium mb-4">Pickup or Delivery</h2>
                <RadioGroup value={deliveryMethod} onValueChange={(val) => setDeliveryMethod(val as DeliveryMethod)} className="mb-4 flex gap-4">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="pickup" id="pickup" />
                    <Label htmlFor="pickup">Pickup (Citec Estate, Mbora)</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="delivery" id="delivery" />
                    <Label htmlFor="delivery">Delivery (Paid on arrival)</Label>
                  </div>
                </RadioGroup>

                {deliveryMethod === "pickup" && (
                  <div className="space-y-4">
                    <p className="text-sm text-neutral-600">
                      **Pickup Address:** {pickupAddress}
                    </p>
                  </div>
                )}

                {deliveryMethod === "delivery" && (
                  <div className="space-y-4">
                    <Select value={deliveryZone} onValueChange={setDeliveryZone} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select delivery zone" />
                      </SelectTrigger>
                      <SelectContent>
                        {deliveryZones.map((zone) => (
                          <SelectItem key={zone.id} value={zone.id}>
                            {zone.name} - {formatCurrency(zone.price)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="Detailed Address"
                      required
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                    />
                  </div>
                )}

                {/* Scheduling */}
                <div className="mt-4 space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium">
                    <input type="checkbox" id="scheduled" checked={isScheduled} onChange={() => setIsScheduled(!isScheduled)} />
                    Schedule for later
                  </label>
                  {isScheduled && (
                    <div className="grid grid-cols-2 gap-4">
                      <Input type="date" value={scheduledDate} onChange={(e) => setScheduledDate(e.target.value)} required />
                      <Input type="time" value={scheduledTime} onChange={(e) => setScheduledTime(e.target.value)} required />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="md:col-span-1">
              <div className="bg-white p-5 rounded-lg shadow-sm border sticky top-24">
                <h2 className="text-lg font-medium mb-4">Order Summary</h2>
                <div className="space-y-3 text-sm">
                  {items.map((item, index) => {
                    const quantity = item.quantity;
                    const unitPrice = item.selectedPackage?.price || item.product.price;
                    return (
                      <div
                        key={`${item.product._id}-${item.selectedPackage?.id || "default"}-${index}`}
                        className="flex justify-between"
                      >
                        <div>
                          {quantity}x {item.product.product} {/* Changed item.product.name to item.product.product */}
                          {item.selectedPackage && ` (${item.selectedPackage.name})`}
                        </div>
                        <div>{formatCurrency(unitPrice * quantity)}</div>
                      </div>
                    );
                  })}
                </div>

                <hr className="my-4" />
                <div className="flex justify-between text-sm font-semibold">
                  <span>Total:</span>
                  <span>{formatCurrency(totalAmount)}</span>
                </div>

                {deliveryMethod === "delivery" && selectedZone && (
                  <div className="flex justify-between text-sm text-neutral-600 mt-2">
                    <span>Delivery Fee ({selectedZone.name}):</span>
                    <span>{formatCurrency(selectedZone.price)}</span>
                  </div>
                )}

                <Button type="submit" className="w-full mt-6" disabled={isSubmitting}>
                  {isSubmitting ? "Processing..." : "Pay Now"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
 }
