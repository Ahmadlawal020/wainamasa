import { Link } from "react-router-dom";
import { Phone, Mail, Clock, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#000000] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold mb-3 text-green-400">Masa Treat</h3>
            <p className="text-neutral-300 text-sm leading-relaxed mb-4">
              Bringing Northern Nigeria's rich flavors to your table — one meal at a time. 
              Prepared with heritage, heart, and the finest ingredients.
            </p>
            <div className="flex space-x-3">
              <a href="https://instagram.com/masa_treat" target="_blank" rel="noopener noreferrer" 
                 className="text-neutral-400 hover:text-green-400 transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://facebook.com/masatreat" target="_blank" rel="noopener noreferrer" 
                 className="text-neutral-400 hover:text-green-400 transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Opening Hours */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-3 text-green-400 flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              Opening Hours
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-neutral-300">Every Day</span>
                <span className="text-white font-medium">8:00 AM - 6:00 PM</span>
              </div>
              <p className="text-neutral-400 text-xs mt-2">
                Kindly note: Orders can only be placed within these hours.
              </p>
            </div>
          </div>
          
          {/* Contact Info */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-3 text-green-400">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <Mail className="h-4 w-4 mr-2 text-green-400 flex-shrink-0" />
                <a href="mailto:support@masatreat.ng" className="text-neutral-300 hover:text-green-400 transition-colors">
                  support@masatreat.ng
                </a>
              </div>
              <div className="flex items-center text-sm">
                <Phone className="h-4 w-4 mr-2 text-green-400 flex-shrink-0" />
                <a href="tel:+2347037255182" className="text-neutral-300 hover:text-green-400 transition-colors">
                  +234 703 725 5182
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-neutral-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-neutral-400 text-sm">
              © 2025 Masa Treat. All rights reserved.
            </p>
            <p className="text-neutral-400 text-sm">
              Crafted with <span className="text-red-400">❤️</span> by{" "}
              <a href="https://sableboxx.com" target="_blank" rel="noopener noreferrer" 
                 className="text-green-400 hover:text-green-300 transition-colors">
                Sableboxx
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
