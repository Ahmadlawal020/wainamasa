import { ShoppingBag, CreditCard, Truck } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: ShoppingBag,
      title: "Browse & Select",
      description: "Explore a curated menu of fresh, home-cooked meals made with love. Choose your favorites, your way."
    },
    {
      icon: CreditCard,
      title: "Pay Securely",
      description: "Enjoy seamless checkout through our secure and trusted payment options. Easy, safe, and fast."
    },
    {
      icon: Truck,
      title: "Delivered or Ready for Pickup",
      description: "Relax while we prepare your meal. Pick it up or let us deliver straight to your doorstep — fresh and right on time."
    }
  ];

  return (
    <section className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-bold text-3xl mb-3 tracking-tight leading-tight text-green-600">How It Works</h2>
          <p className="text-base text-neutral-600 max-w-xl mx-auto">
            Getting real, delicious food has never been this easy. From our kitchen to your table — fast, fresh, and fuss-free.
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
