
import { Link } from "react-router-dom";
import { MapPin, Phone, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#000000] text-white pt-16 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-28">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-green-400">Masa Treat</h3>
            <p className="text-neutral-400 mb-5 text-base leading-relaxed">
              We're dedicated to bringing the authentic taste of Northern Nigerian cuisine to your doorstep. 
              Our handcrafted masa and traditional delicacies are prepared with love and the finest ingredients.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://instagram.com/masa_treat" target="_blank" rel="noopener noreferrer" 
                 className="text-neutral-500 hover:text-green-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://facebook.com/masatreat" target="_blank" rel="noopener noreferrer" 
                 className="text-neutral-500 hover:text-green-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Opening Hours */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-green-400">Opening Hours</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span className="text-neutral-400">Every Day</span>
                <span className="text-neutral-400">8:00 AM - 6:00 PM</span>
              </li>
            </ul>
            <p className="text-neutral-500 mt-3 text-sm">Orders can only be placed during our opening hours.</p>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-green-400">Contact Us</h3>
            <address className="not-italic text-neutral-400 space-y-3 text-sm">
              <p className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 text-green-400 mt-0.5" />
                <span>B14 Close, Citec Estate, Mbora, Abuja</span>
              </p>
              <p className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-green-400" />
                <span>+2347037255182</span>
              </p>
            </address>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-neutral-800 mt-12 pt-6 text-center text-neutral-500 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Masa Treat. All rights reserved.</p>
          <p className="mt-2 md:mt-0 text-sm">Powered by <a href="https://sableboxx.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-400">Sableboxx</a></p>
        </div>
      </div>
    </footer>
  );
}
