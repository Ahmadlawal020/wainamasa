
import { Clock, Utensils, Heart } from "lucide-react";

export default function ValueProposition() {
  const values = [
    {
      icon: Clock,
      title: "Fast Service",
      description: "We prepare and deliver your food promptly without compromising quality."
    },
    {
      icon: Utensils,
      title: "Authentic Northern Taste",
      description: "Experience the genuine flavors of Northern Nigeria in every bite."
    },
    {
      icon: Heart,
      title: "Homemade Quality",
      description: "Every dish is prepared with care and love, just like in a Northern Nigerian home."
    }
  ];

  return (
    <section className="py-12 bg-[#111111] text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div key={index} className="flex items-start p-5">
              <div className="mr-4 bg-black/20 p-2 rounded-full">
                <value.icon className="h-6 w-6 text-green-500" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-lg md:text-xl mb-2">{value.title}</h3>
                <p className="text-neutral-300 text-base md:text-base sm:text-sm">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
