
import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    id: 1,
    name: "Amina Ibrahim",
    role: "Regular Customer",
    content: "The masa here reminds me of my grandmother's recipe. Perfectly made with the right balance of sweetness. Delivery was on time too!",
    rating: 5,
  },
  {
    id: 2,
    name: "Musa Danjuma",
    role: "Food Enthusiast",
    content: "The Miyan Taushe was exceptional. Rich flavors that take me back to Kano. Will definitely be ordering again!",
    rating: 5,
  },
  {
    id: 3,
    name: "Fatima Yusuf",
    role: "First-time Customer",
    content: "I tried their goat pepper soup and was blown away by the authenticity. Perfect spice level and the meat was tender.",
    rating: 4,
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const next = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-display mb-3">What Our Customers Say</h2>
          <p className="text-neutral-600 max-w-xl mx-auto">
            Don't just take our word for it, hear from our satisfied customers.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out" 
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white p-8 rounded-lg shadow-md">
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={cn(
                            "h-5 w-5 mr-1",
                            i < testimonial.rating ? "text-earth-400 fill-earth-400" : "text-neutral-200"
                          )}
                        />
                      ))}
                    </div>
                    <blockquote className="mb-6 text-lg italic">
                      "{testimonial.content}"
                    </blockquote>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-neutral-100 rounded-full mr-4">
                        <div className="w-full h-full flex items-center justify-center text-2xl font-display text-brand-500">
                          {testimonial.name.charAt(0)}
                        </div>
                      </div>
                      <div>
                        <p className="font-medium">{testimonial.name}</p>
                        <p className="text-neutral-500 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            <Button variant="outline" size="icon" onClick={prev}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            {testimonials.map((_, i) => (
              <Button
                key={i}
                variant="ghost"
                size="icon"
                className={cn(
                  "w-2 h-2 p-0 rounded-full",
                  i === currentIndex ? "bg-brand-500" : "bg-neutral-200"
                )}
                onClick={() => setCurrentIndex(i)}
              />
            ))}
            <Button variant="outline" size="icon" onClick={next}>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
