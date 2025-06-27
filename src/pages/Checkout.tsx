declare global {
  interface Window {
    PaystackPop?: any;
  }
}

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCart } from "@/context/CartContext";
import { formatCurrency, generateOrderId } from "@/lib/utils";
import { DeliveryMethod } from "@/data/types";
import { toast } from "@/components/ui/sonner";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Calendar, Clock } from "lucide-react";
import { deliveryZones, getDeliveryZoneById } from "@/data/deliveryZones";

export default function Checkout() {
  const navigate = useNavigate();
  const { items, totalAmount, clearCart } = useCart();
  
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
  
  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-xl font-medium mb-4">Your cart is empty</h1>
            <p className="mb-6 text-sm">Add some delicious items to your cart before checking out.</p>
            <Button onClick={() => navigate("/menu")} size="sm">Browse Menu</Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  
  // Load Paystack script
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

    // Calculate total (including delivery if needed)
    const deliveryFee = deliveryMethod === "delivery" && selectedZone ? selectedZone.price : 0;
    const grandTotal = totalAmount + deliveryFee;

    // Paystack payment handler
    const paystack = (window as any).PaystackPop && (window as any).PaystackPop.setup({
      key: "pk_test_580f8fb3386a58f8bd2af3e96228aa02fc13782c", // Replace with your Paystack public key
      email: email || "noemail@aroma-kitchen.com",
      amount: grandTotal * 100, // Paystack expects amount in kobo
      currency: "NGN",
      ref: generateOrderId(),
      callback: function (response: any) {
        // Payment successful, send email via backend
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
            clearCart();
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

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-10 bg-neutral-50">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-medium mb-6">Checkout</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Customer Info */}
              <div className="md:col-span-2 space-y-5">
                <div className="bg-white p-5 rounded-lg shadow-sm border">
                  <h2 className="text-lg font-medium mb-4">Your Information</h2>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <Label htmlFor="name" className="text-sm">Full Name</Label>
                        <Input 
                          id="name"
                          placeholder="Enter your full name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="text-sm"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="phone" className="text-sm">Phone Number</Label>
                        <Input 
                          id="phone"
                          placeholder="Enter your phone number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="text-sm"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="email" className="text-sm">Email Address (Optional)</Label>
                        <Input 
                          id="email"
                          type="email"
                          placeholder="Enter your email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Delivery Options */}
                <div className="bg-white p-5 rounded-lg shadow-sm border">
                  <h2 className="text-lg font-medium mb-4">Delivery Options</h2>
                  
                  <RadioGroup 
                    value={deliveryMethod} 
                    onValueChange={(val) => setDeliveryMethod(val as DeliveryMethod)}
                    className="mb-6"
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value="pickup" id="pickup" />
                      <Label htmlFor="pickup" className="text-sm">Pickup (Free)</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="delivery" id="delivery" />
                      <Label htmlFor="delivery" className="text-sm">
                        Delivery (Paid on arrival to delivery agent)
                      </Label>
                    </div>
                  </RadioGroup>
                  
                  {deliveryMethod === "delivery" && (
                    <div className="space-y-4 mb-6">
                      <div>
                        <Label htmlFor="zone" className="text-sm">Select Your Zone</Label>
                        <Select 
                          value={deliveryZone} 
                          onValueChange={setDeliveryZone}
                          required={deliveryMethod === "delivery"}
                        >
                          <SelectTrigger className="text-sm">
                            <SelectValue placeholder="Select a zone" />
                          </SelectTrigger>
                          <SelectContent>
                            {deliveryZones.map((zone) => (
                              <SelectItem key={zone.id} value={zone.id} className="text-sm">
                                {zone.name} - {formatCurrency(zone.price)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="address" className="text-sm">Detailed Address</Label>
                        <Input 
                          id="address"
                          placeholder="Enter your full address"
                          value={deliveryAddress}
                          onChange={(e) => setDeliveryAddress(e.target.value)}
                          className="text-sm"
                          required={deliveryMethod === "delivery"}
                        />
                      </div>
                    </div>
                  )}
                  
                  {deliveryMethod === "pickup" && (
                    <div className="mb-6 p-4 bg-neutral-50 rounded-lg">
                      <h3 className="font-medium mb-2 text-sm">Pickup Address</h3>
                      <p className="text-neutral-700 text-sm">
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
                      <div className="flex items-center h-5">
                        <input
                          id="scheduled"
                          type="checkbox"
                          className="w-4 h-4 border border-neutral-300 rounded"
                          checked={isScheduled}
                          onChange={() => setIsScheduled(!isScheduled)}
                        />
                      </div>
                      <label htmlFor="scheduled" className="ml-2 font-medium text-sm">
                        Schedule for later
                      </label>
                    </div>
                    
                    {isScheduled && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="date" className="flex items-center text-sm">
                            <Calendar className="h-3 w-3 mr-1" />
                            Date
                          </Label>
                          <Input 
                            id="date"
                            type="date"
                            value={scheduledDate}
                            onChange={(e) => setScheduledDate(e.target.value)}
                            className="text-sm"
                            required={isScheduled}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="time" className="flex items-center text-sm">
                            <Clock className="h-3 w-3 mr-1" />
                            Time
                          </Label>
                          <Input 
                            id="time"
                            type="time"
                            value={scheduledTime}
                            onChange={(e) => setScheduledTime(e.target.value)}
                            className="text-sm"
                            required={isScheduled}
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
                      <div key={`${item.product.id}-${item.selectedPackage?.id || 'default'}`} className="flex justify-between border-b pb-2">
                        <div>
                          <span className="font-medium text-sm">
                            {item.quantity}x {item.product.name}
                            {item.selectedPackage && ` (${item.selectedPackage.name})`}
                          </span>
                          {item.notes && (
                            <p className="text-xs text-neutral-500 mt-1">{item.notes}</p>
                          )}
                        </div>
                        <span className="text-sm">
                          {formatCurrency(
                            item.selectedPackage 
                              ? item.selectedPackage.price * item.quantity 
                              : item.product.price * item.quantity
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-2 pt-2 mb-5">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>{formatCurrency(totalAmount)}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm text-neutral-500">
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
                          <span className="text-xs text-neutral-500 block text-right">
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
