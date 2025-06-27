
import { ShoppingBag, CreditCard, Truck } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: ShoppingBag,
      title: "Choose Your Meal",
      description: "Browse our menu of authentic Northern Nigerian delicacies and select your favorites."
    },
    {
      icon: CreditCard,
      title: "Make Payment",
      description: "Securely pay online through our trusted payment gateway."
    },
    {
      icon: Truck,
      title: "Pickup or Delivery",
      description: "Pick up your order at our location or have it delivered to your doorstep."
    }
  ];

  return (
    <section className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-bold text-3xl mb-3 tracking-tight leading-tight text-green-600">How It Works</h2>
          <p className="text-base text-neutral-600 max-w-xl mx-auto">
            It's easy to get your favorite Northern Nigerian meals at your convenience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="flex justify-center mb-6">
                <div className="bg-green-50 p-4 rounded-full">
                  <step.icon className="h-8 w-8 text-green-500" />
                </div>
              </div>
              <h3 className="font-bold text-xl mb-3">{step.title}</h3>
              <p className="text-base text-neutral-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
