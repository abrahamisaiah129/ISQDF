import { DoorOpen, HeartHandshake, Users, UserCheck } from 'lucide-react';
import storyBannerImage from '../assets/images/girls_1.jfif';
import storyMainImage from '../assets/images/girls_1.jfif';

export const storyData = {
  banner: {
    eyebrow: 'Our Story',
    eyebrowIcon: UserCheck,
    heading: 'Driving change on and off the pitch.',
    description:
      'Learn about the journey, vision, and leadership behind the ISQDF movement.',
    image: storyBannerImage,
  },
  narrative: {
    eyebrow: 'The beginning',
    heading: 'A unified belief that access changes everything.',
    image: storyMainImage,
    imageAlt: 'Women footballers',
    content:
      "The IMO Striker Queens Development Foundation (ISQDF) wasn't built by a single individual; it was ignited by a collective realization within our community. We saw immense, untapped potential in young women and girls who had the talent and drive for football, but lacked the platforms, resources, and encouragement to pursue it. ISQDF started as a shared commitment among sports advocates, community leaders, and passionate supporters to change that narrative. We came together with one clear mandate: to dismantle the barriers female athletes face. We built this foundation to create a sustainable ecosystem where women and girls are seen, supported, and equipped to lead—not just on the pitch, but in every aspect of their lives.",
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
    author: '— The ISQDF Founding Board',
  },
  cta: {
    eyebrow: 'Support the vision today',
    title: 'Help us open more doors for women and girls',
    ctaText: 'Be the Change',
    ctaHref: '/donate',
  },
};

export default storyData;
