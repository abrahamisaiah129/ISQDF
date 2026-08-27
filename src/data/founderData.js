import { DoorOpen, HeartHandshake, Users, UserCheck } from 'lucide-react';
import founderBannerImage from '../assets/images/girls_1.jfif';

export const founderData = {
  banner: {
    eyebrow: 'Leadership & Vision',
    eyebrowIcon: UserCheck,
    heading: 'Driving change on and off the pitch.',
    description:
      'Meet the leadership and vision behind the IMO Striker Queens Development Foundation.',
    image: founderBannerImage,
  },
  founder: {
    name: 'Prince Chidiebere Eze',
    role: 'Founder & President',
    organization: 'IMO Striker Queens Development Foundation',
    badge: 'Founder & Visionary Leader',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
    imageAlt: 'ISQDF Founder',
    eyebrow: 'Letter from the Founder',
    heading: 'Empowering the next generation of female leaders through football.',
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
      name: 'Prince Chidiebere Eze',
      title: 'Founder & President, ISQDF',
    },
  },
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
    author: '— Prince Chidiebere Eze',
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
