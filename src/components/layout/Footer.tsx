import { Link } from "react-router-dom";
import { MapPin, Phone, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-20 pb-10 text-[14px]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Logo + Description */}
          <div className="md:col-span-2">
            <h3 className="text-[16px] font-bold mb-4 text-green-400">Masa Treat</h3>
            <p className="text-neutral-400 leading-relaxed mb-6 max-w-md">
              Bringing Northern Nigeria’s rich flavors to your table — one meal at a time.
              Prepared with heritage, heart, and the finest ingredients.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/masa_treat"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-neutral-800 hover:bg-green-400 transition-colors"
              >
                <Instagram className="h-5 w-5 text-white" />
              </a>
              <a
                href="https://facebook.com/masatreat"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-neutral-800 hover:bg-green-400 transition-colors"
              >
                <Facebook className="h-5 w-5 text-white" />
              </a>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-[16px] font-bold mb-4 text-green-400">Opening Hours</h4>
            <ul className="space-y-2 text-neutral-300">
              <li className="flex justify-between">
                <span>Every Day</span>
                <span>8:00 AM - 6:00 PM</span>
              </li>
            </ul>
            <p className="mt-3 text-neutral-500">
              Kindly note: Orders can only be placed within these hours.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-[16px] font-bold mb-4 text-green-400">Contact Us</h4>
            <address className="not-italic text-neutral-300 space-y-3">
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
        <div className="border-t border-neutral-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-neutral-500 text-[14px]">
          <p>&copy; {new Date().getFullYear()} Masa Treat. All rights reserved.</p>
          <p className="mt-3 md:mt-0">
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
