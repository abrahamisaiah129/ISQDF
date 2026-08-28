import { DoorOpen, HeartHandshake, Users, UserCheck, ShieldCheck, Trophy, FileSpreadsheet } from 'lucide-react';
import founderBannerImage from '../assets/images/girls_1.jfif';
import ugochukwuOparaImage from '../assets/images/ugochukwu_opara.jpg';
import nellyOrisakweImage from '../assets/images/nelly_orisakwe.jpg';

export const leaders = [
  {
    id: 'president',
    name: 'President [Placeholder]',
    role: 'Founder & President',
    organization: 'IMO Striker Queens Development Foundation',
    badge: 'Founder & Visionary Leader',
    icon: UserCheck,
    image: '',
    imageAlt: 'ISQDF Founder & President',
    eyebrow: 'Letter from the Founder & President',
    heading: 'Empowering the next generation of female leaders through football.',
    shortBio: 'Pioneering grassroots female football development and holistic educational pathways across Nigeria.',
    bio: [
      "The IMO Striker Queens Development Foundation (ISQDF) was born from a simple yet powerful observation: across Nigeria, countless young women and girls possess immense athletic talent and boundless potential, but lack the structural support, safe spaces, and resources needed to thrive.",
      "Growing up witnessing the transformative power of sport, I realized football is far more than just 90 minutes on the pitch. It is a classroom for leadership, resilience, self-discipline, and community cohesion. When you give a girl boots, a ball, and dedicated coaching, you give her the confidence to stand tall, pursue education, and shatter societal ceilings.",
      "Since establishing ISQDF, our mission has remained steadfast: to build an inclusive, sustainable ecosystem where young female footballers receive world-class training, educational scholarships, mentorship, and life-skills development. Every girl who steps onto our field is a testament to what is possible when community, purpose, and opportunity converge.",
    ],
    highlights: [
      {
        title: 'Grassroots Development',
        description: 'Creating accessible football academies across Imo State for girls regardless of socio-economic background.',
      },
      {
        title: 'Education First',
        description: 'Integrating academic scholarships and mentorship programs with athletic training.',
      },
      {
        title: 'Community Empowerment',
        description: 'Engaging families and local leaders to dismantle gender barriers in athletics.',
      },
    ],
    signature: {
      name: 'President [Placeholder]',
      title: 'Founder & President, ISQDF',
    },
    quote: '"When girls have the chance to play, they gain more than a sport. They gain a voice, a team, and a future."',
  },
  {
    id: 'trustee',
    name: 'Ugochukwu Opara',
    role: 'Board Trustee',
    organization: 'IMO Striker Queens Development Foundation',
    badge: 'Governance & Stewardship',
    icon: ShieldCheck,
    image: ugochukwuOparaImage,
    imageAlt: 'Ugochukwu Opara - Board Trustee',
    eyebrow: 'Trustee Perspective & Governance',
    heading: 'Anchoring our mission with institutional integrity and long-term sustainability.',
    shortBio: 'Guiding foundational governance, partnership networks, and ethical stewardship to ensure lasting community impact.',
    bio: [
      "As trustees of the IMO Striker Queens Development Foundation, our primary commitment is safeguarding the foundation's core values, fiduciary responsibility, and long-term strategic growth. We believe that empowering young female athletes requires not only passionate field leadership but also robust institutional governance.",
      "Our board works tirelessly to forge strategic alliances with domestic and international sports federations, educational institutions, and corporate sponsors who share our vision of gender equality in athletics.",
      "By instilling transparent processes, sustainable endowment initiatives, and welfare programs, we ensure that every donor dollar and community investment directly translates into life-changing opportunities for our girls.",
    ],
    highlights: [
      {
        title: 'Governance & Transparency',
        description: 'Ensuring strict compliance, fiduciary accountability, and ethical institutional leadership.',
      },
      {
        title: 'Strategic Partnerships',
        description: 'Brokering institutional collaborations with global sports foundations and educational boards.',
      },
      {
        title: 'Long-term Sustainability',
        description: 'Building an endowment framework to fund perpetual player scholarships and welfare.',
      },
    ],
    signature: {
      name: 'Ugochukwu Opara',
      title: 'Board Trustee, ISQDF',
    },
    quote: '"Institutional integrity and unyielding compassion form the twin pillars that elevate grassroots potential into generational impact."',
  },
  {
    id: 'head-coach',
    name: 'Nelly Orisakwe',
    role: 'Head Coach & Technical Director',
    organization: 'IMO Striker Queens Development Foundation',
    badge: 'Technical & Player Development',
    icon: Trophy,
    image: nellyOrisakweImage,
    imageAlt: 'Nelly Orisakwe - Head Coach & Technical Director',
    eyebrow: 'Technical Direction & Coaching Philosophy',
    heading: 'Developing elite footballing talent with character, discipline, and tactical brilliance.',
    shortBio: 'Leading technical training regimens, tactical development, and athletic mentorship on the pitch.',
    bio: [
      "On the pitch, our goal is excellence in every touch, pass, and tactical decision. But more importantly, our coaching philosophy centers on building mental fortitude, mutual trust, and athletic discipline.",
      "We implement modern, age-appropriate technical curriculum tailored to the physiological and psychological development of young female players. From grassroots drills to competitive match preparation, we cultivate players who understand positional discipline and game intelligence.",
      "Every training session is engineered to push boundaries while creating a nurturing, safe environment where young talents can dare to express their creativity and fulfill their football dreams.",
    ],
    highlights: [
      {
        title: 'Modern Tactical Regimens',
        description: 'Implementing contemporary European & international coaching methodologies adapted for youth development.',
      },
      {
        title: 'Holistic Player Conditioning',
        description: 'Focusing on athletic performance, injury prevention, nutrition, and mental resilience.',
      },
      {
        title: 'Scouting & Pathways',
        description: 'Connecting exceptional talent with national youth teams and collegiate/professional scouts.',
      },
    ],
    signature: {
      name: 'Nelly Orisakwe',
      title: 'Head Coach & Technical Director, ISQDF',
    },
    quote: '"Champions are not just made in 90 minutes; they are forged in the quiet hours of relentless discipline and team solidarity."',
  },
  {
    id: 'secretary',
    name: 'Nelly Orisakwe',
    role: 'General Secretary & Head of Administration',
    organization: 'IMO Striker Queens Development Foundation',
    badge: 'Administration & Operations',
    icon: FileSpreadsheet,
    image: nellyOrisakweImage,
    imageAlt: 'Nelly Orisakwe - General Secretary',
    eyebrow: 'Administration & Operations',
    heading: 'Ensuring operational excellence and seamless execution across all foundation programs.',
    shortBio: 'Managing day-to-day operations, official correspondence, player welfare documentation, and compliance.',
    bio: [
      "Behind every match, tournament, and training clinic is a dedicated administrative engine that ensures our athletes, coaches, and volunteers have what they need to succeed effortlessly.",
      "The Secretariat oversees day-to-day operations, communications, regulatory compliance, logistics, and athlete welfare documentation. We work closely with families and schools to safeguard the rights, safety, and academic tracking of every child enrolled in ISQDF programs.",
      "Our goal is operational smoothness and total transparency, ensuring that ISQDF operates with the highest standard of non-profit professionalism.",
    ],
    highlights: [
      {
        title: 'Operational Logistics',
        description: 'Coordinating tournaments, player travel, kit supplies, and facility schedules seamlessly.',
      },
      {
        title: 'Welfare & Child Safeguarding',
        description: 'Maintaining rigorous safeguarding protocols, parental consent frameworks, and health records.',
      },
      {
        title: 'Stakeholder Relations',
        description: 'Managing official correspondence with governing bodies, community leaders, and media partners.',
      },
    ],
    signature: {
      name: 'Nelly Orisakwe',
      title: 'General Secretary, ISQDF',
    },
    quote: '"Precision in administration builds the dependable foundation where athletes can focus purely on soaring to greatness."',
  },
];

// Re-export individual leaders for direct access if needed
export const president = leaders.find((l) => l.id === 'president') || leaders[0];
export const trustee = leaders.find((l) => l.id === 'trustee') || leaders[1];
export const headCoach = leaders.find((l) => l.id === 'head-coach') || leaders[2];
export const secretary = leaders.find((l) => l.id === 'secretary') || leaders[3];

export const founderData = {
  banner: {
    eyebrow: 'Leadership & Vision',
    eyebrowIcon: UserCheck,
    heading: 'Driving change on and off the pitch.',
    description:
      'Meet the leadership and vision behind the IMO Striker Queens Development Foundation.',
    image: founderBannerImage,
  },
  // Primary leaders array - adding any item here will dynamically render without breaking anything
  leaders,
  // Backward compatibility: keeps founderData.founder working for any existing components
  founder: leaders[0],
  president,
  trustee,
  headCoach,
  secretary,
  pillars: [
    {
      icon: DoorOpen,
      iconName: 'DoorOpen',
      title: 'Unrestricted Access',
      body: 'Every girl deserves a safe, well-equipped space to play, train, and develop her skills without prejudice or financial barriers.',
    },
    {
      icon: HeartHandshake,
      iconName: 'HeartHandshake',
      title: 'Holistic Empowerment',
      body: 'We view football as a classroom for life — nurturing leadership, teamwork, and unshakeable self-confidence.',
    },
    {
      icon: Users,
      iconName: 'Users',
      title: 'Community Integration',
      body: "We didn't just want to build a team; we wanted to build a movement — uplifting entire communities by investing in the women who will lead them.",
    },
  ],
  quote: {
    text: '"When girls have the chance to play, they gain more than a sport. They gain a voice, a team, and a future."',
    author: '— President [Placeholder]',
    role: 'Founder & President, ISQDF',
  },
  cta: {
    eyebrow: 'Support the vision today',
    title: 'Help us open more doors for women and girls',
    ctaText: 'Be the Change',
    ctaHref: '/donate',
  },
};

export default founderData;

