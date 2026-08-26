import { Heart } from "lucide-react";
import Button from "../ui/Button";

export default function MovementCta({
  eyebrow = "Join the movement",
  title = "Help the next girl take her first step.",
  ctaText = "Support our work",
}) {
  return (
    <section className="bg-[#b30006] px-6 py-14 text-white sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-red-100">
            <Heart size={15} fill="currentColor" />
            {eyebrow}
          </p>
          <h2 className="mt-2 text-3xl font-bold">{title}</h2>
        </div>

        <Button
          as="a"
          href="/donate"
          variant="primary"
          className="border-white bg-transparent text-white hover:bg-white hover:text-[#b30006]"
          rightIcon={<Heart size={16} fill="currentColor" aria-hidden="true" />}
        >
          {ctaText}
        </Button>
      </div>
    </section>
  );
}
