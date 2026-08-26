import React, { useState } from "react";
import { FaBars, FaXmark } from "react-icons/fa6";
import Button from "../ui/Button";
import { siteMeta } from "../../data/siteMeta";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { navLinks, brand } = siteMeta;

  return (
    <nav className="bg-white shadow-md w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center">
              <img src={brand.logo} alt={`${brand.name} Logo`} className="h-10 w-auto" />
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const Icon = link.icon;

              if (link.isCta) {
                return (
                  <Button
                    key={link.name}
                    as="a"
                    href={link.href}
                    variant="primary"
                    rightIcon={<Icon className="w-full h-full" />}
                  >
                    {link.name}
                  </Button>
                );
              }

              return (
                <a
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 hover:text-red-600 hover:bg-gray-100 font-medium transition-colors"
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-red-600 focus:outline-none cursor-pointer"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <FaXmark size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-4 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;

            if (link.isCta) {
              return (
                <Button
                  key={link.name}
                  as="a"
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  variant="primary"
                  className="w-full justify-center"
                  leftIcon={<Icon className="w-full h-full" />}
                >
                  {link.name}
                </Button>
              );
            }

            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 hover:text-red-600 hover:bg-gray-100 font-medium"
              >
                {link.name}
              </a>
            );
          })}
        </div>
      )}
    </nav>
  );
}
