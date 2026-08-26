import { Image as ImageIcon } from "lucide-react";
import girls1 from "../assets/images/girls_1.jfif";
import girls2 from "../assets/images/girls_2.jfif";
import Sd from "../assets/images/Sports-Direct.png";
import girlsPlayingFootball from "../assets/images/girls playing football.webp";
import isqdf1 from "../assets/images/isqdf_logo.png";
import isqdf2 from "../assets/images/isqdf_logo_white.png";
import adidas from "../assets/images/adidas.png";
import Nike from "../assets/images/Nike.png";

export const galleryBanner = {
  eyebrow: "Our work in motion",
  eyebrowIcon: ImageIcon,
  heading: "Football can open doors that last a lifetime.",
  description: "Every session is a step forward.",
  image: girlsPlayingFootball,
};

export const galleryItems = [
  {
    image: girls1,
    title: "Training together",
    date: "2026-03-14",
  },
  {
    image: girls2,
    title: "Making space to grow",
    date: "2026-02-27",
  },
  {
    image: girlsPlayingFootball,
    title: "Community in motion",
    date: "2026-04-02",
  },
  {
    image: Sd,
    title: "The next generation",
    date: "2026-01-18",
  },
  {
    image: isqdf1,
    title: "Building skill, one session at a time",
    date: "2026-05-09",
  },
  {
    image: isqdf2,
    title: "Celebrating every win",
    date: "2026-05-30",
  },
  {
    image: adidas,
    title: "Guided by experienced coaches",
    date: "2026-03-01",
  },
  {
    image: Nike,
    title: "Built on friendship",
    date: "2026-02-11",
  },
  {
    image: isqdf1,
    title: "Match day energy",
    date: "2026-06-05",
  },
  {
    image: isqdf2,
    title: "Stronger together",
    date: "2026-04-19",
  },
  {
    image: girls1,
    title: "Every session counts",
    date: "2026-01-05",
  },
  {
    image: girls2,
    title: "Confidence built on the pitch",
    date: "2026-06-20",
  },
];

export const galleryPageData = {
  banner: galleryBanner,
  items: galleryItems,
};

export default galleryItems;
