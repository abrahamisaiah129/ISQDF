import { Trophy, Users, GraduationCap, HeartHandshake } from "lucide-react";
import slide1 from "../assets/images/girls_1.jfif";
import slide2 from "../assets/images/girls_2.jfif";
import slide3 from "../assets/images/girls playing football.webp";

/**
 * Dummy/placeholder data for ProgramsSection — realistic in structure and
 * scale for a small, real grassroots NGO, NOT real donor or fundraising
 * records. Swap out with actual program details, photos, and verified
 * raised/goal amounts before launch.
 */
export const programsData = [
  {
    id: "training-academy",
    icon: Trophy,
    image: slide1, // card cover
    images: [slide1, slide2, slide3], // lightbox gallery — swap for real training photos
    title: "Grassroots Training Academy",
    summary:
      "Weekly coaching sessions for girls aged 8–16 across communities in Owerri, focused on skill-building, fitness, and discipline.",
    fullDescription:
      "This program runs weekly coaching sessions across several communities in Owerri, led by experienced coaches focused on fundamentals: ball control, positioning, fitness, and teamwork. Beyond the technical side, sessions build discipline and confidence that carry into school and everyday life. Funds raised go toward pitch access, coach stipends, and basic training equipment.",
    goalAmount: 500000,
    raisedAmount: 128000,
    currencySymbol: "₦",
    donateHref: "/donate?program=training-academy",
    donateLabel: "Support This Program",
    shareUrl: "https://isqdf.org/programs/training-academy",
  },
  {
    id: "scholarship-support",
    icon: GraduationCap,
    image: slide2,
    images: [slide2, slide1],
    title: "Scholarship & Education Support",
    summary:
      "Covers school fees, uniforms, and learning materials for players whose families cannot afford them, keeping girls in school and on the pitch.",
    fullDescription:
      "Many of the girls we work with face real risk of dropping out of school due to fees, uniforms, or basic learning materials their families can't cover. This program pays those costs directly for enrolled players who need it, on the belief that a girl shouldn't have to choose between an education and a place on the team. Every donation goes toward a specific student's documented school costs.",
    goalAmount: 750000,
    raisedAmount: 265000,
    currencySymbol: "₦",
    donateHref: "/donate?program=scholarships",
    donateLabel: "Support This Program",
    shareUrl: "https://isqdf.org/programs/scholarships",
  },
  {
    id: "mentorship-program",
    icon: Users,
    image: slide3,
    images: [slide3, slide1],
    title: "Mentorship Program",
    summary:
      "Pairs players with mentors — former athletes, coaches, and professionals — who guide them on discipline, confidence, and life beyond football.",
    fullDescription:
      "Each player in this program is paired with a mentor — a former athlete, coach, or working professional — for regular check-ins beyond the pitch. Mentors help with goal-setting, schoolwork accountability, and simply having a trusted adult to talk to. Funds cover mentor coordination, occasional group sessions, and materials used in mentorship meetings.",
    goalAmount: 300000,
    raisedAmount: 62000,
    currencySymbol: "₦",
    donateHref: "/donate?program=mentorship",
    donateLabel: "Support This Program",
    shareUrl: "https://isqdf.org/programs/mentorship",
  },
  {
    id: "kits-equipment-fund",
    icon: HeartHandshake,
    image: slide1,
    images: [slide1, slide2],
    title: "Kits & Equipment Fund",
    summary:
      "Provides boots, jerseys, and training equipment for girls who join the program with none of their own.",
    fullDescription:
      "A significant barrier to entry for many girls is simply not having boots, a jersey, or basic training gear. This fund exists to remove that barrier entirely — every girl who joins gets what she needs to train and play, regardless of her family's ability to pay for it. Donations go directly toward bulk kit purchases distributed each season.",
    goalAmount: 400000,
    raisedAmount: 91000,
    currencySymbol: "₦",
    donateHref: "/donate?program=kits",
    donateLabel: "Support This Program",
    shareUrl: "https://isqdf.org/programs/kits",
  },
];
