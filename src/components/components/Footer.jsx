import React from "react";
import Button from "../ui/Button";
import DynamicIcon from "../ui/Dynamicicon";
import { siteMeta } from "../../data/siteMeta";

export default function Footer() {
  const year = new Date().getFullYear();
  const { footer, brand } = siteMeta;

  return (
    <footer className="overflow-hidden bg-black text-red-50">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 sm:px-8 lg:grid-cols-[1.5fr_1fr_1fr] lg:px-12">
        <div>
          <a href="/">
            <img
              src={brand.logoWhite || brand.logo}
              alt={`${brand.name} logo`}
              className="h-20 w-auto object-contain"
            />
          </a>
          <p className="mt-5 max-w-md text-sm leading-7 text-red-100">
            {footer.about}
          </p>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-white">
            Explore
          </h2>
          <nav
            aria-label="Footer navigation"
            className="mt-4 flex flex-col items-start gap-3 text-sm"
          >
            {footer.exploreLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-white hover:underline"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-white">
            {footer.getInvolvedTitle}
          </h2>
          <p className="mt-4 max-w-xs text-sm leading-7 text-red-100">
            {footer.getInvolvedText}
          </p>
          <Button
            as="a"
            href="/donate"
            variant="primary"
            className="mt-5 border-white bg-transparent text-white hover:bg-white hover:text-[#b30006]"
            rightIcon={
              <DynamicIcon name="FaHeart" size={16} aria-hidden="true" />
            }
          >
            {footer.ctaButtonText}
          </Button>
        </div>
      </div>

      <div className="bg-black px-6 py-5 text-center text-xs text-red-100 sm:px-8 lg:px-12 border-t border-white/10">
        <p>&copy; {year} {brand.name}. {footer.copyright}</p>
      </div>
    </footer>
  );
}
