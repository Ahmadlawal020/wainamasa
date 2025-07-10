import { Link } from "react-router-dom";
import { MapPin, Phone, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-8 text-[14px]"> {/* Further reduced vertical padding */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6"> {/* Reduced grid gap */}
          
          {/* Logo + Description */}
          <div className="md:col-span-2">
            <h3 className="text-[16px] font-bold mb-2 text-green-400">Masa Treat</h3> {/* Reduced mb */}
            <p className="text-neutral-400 leading-tight mb-4 max-w-md"> {/* Adjusted leading, reduced mb */}
              Bringing Northern Nigeria’s rich flavors to your table — one meal at a time.
              Prepared with heritage, heart, and the finest ingredients.
            </p>
            <div className="flex gap-2"> {/* Reduced social icon gap */}
              <a
                href="https://instagram.com/masa_treat"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-full bg-neutral-800 hover:bg-green-400 transition-colors" // Slightly smaller padding for icons
              >
                <Instagram className="h-4 w-4 text-white" /> {/* Smaller icons */}
              </a>
              <a
                href="https://facebook.com/masatreat"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-full bg-neutral-800 hover:bg-green-400 transition-colors" // Slightly smaller padding for icons
              >
                <Facebook className="h-4 w-4 text-white" /> {/* Smaller icons */}
              </a>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-[16px] font-bold mb-2 text-green-400">Opening Hours</h4> {/* Reduced mb */}
            <ul className="space-y-0.5 text-neutral-300"> {/* Further reduced space-y */}
              <li className="flex justify-between">
                <span>Every Day</span>
                <span>8:00 AM - 6:00 PM</span>
              </li>
            </ul>
            <p className="mt-1.5 text-neutral-500"> {/* Reduced mt */}
              Kindly note: Orders can only be placed within these hours.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-[16px] font-bold mb-2 text-green-400">Contact Us</h4> {/* Reduced mb */}
            <address className="not-italic text-neutral-300 space-y-1.5"> {/* Reduced space-y */}
              <p className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 text-green-400 mt-0.5" />
                B14 Close, Citec Estate, Mbora, Abuja
              </p>
              <p className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-green-400" />
                +2347037255182
              </p>
            </address>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="border-t border-neutral-800 mt-8 pt-4 flex flex-col md:flex-row justify-between items-center text-neutral-500"> {/* Reduced mt and pt */}
          <p>&copy; {new Date().getFullYear()} Masa Treat. All rights reserved.</p>
          <p className="mt-2 md:mt-0"> {/* Reduced mt */}
            Crafted with ❤️ by{" "}
            <a
              href="https://sableboxx.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-400"
            >
              Sableboxx
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
