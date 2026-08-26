import { Heart } from 'lucide-react';
import aboutImage from '../assets/images/girls playing football.webp';
import aboutImage2 from '../assets/images/girls_2.jfif';

export const aboutSections = [
  {
    image: aboutImage,
    imagePosition: 'left',
    eyebrow: 'About ISQDF',
    heading: 'Over 1,000 female footballers have participated',
    description:
      "IMO Striker Queens Development Foundation is a women's football charity committed to bringing hope and opportunity through programs, mentorship, and competitions.",
    points: [
      {
        label: 'Vision',
        text: "To elevate women's football in Nigeria by developing talented athletes, promoting equality, and using sport as a catalyst for positive social impact.",
      },
      {
        label: 'Mission',
        text: 'Empowering women in Nigerian football through inclusive programs that promote skill development, leadership, and community engagement.',
      },
    ],
    stat: { number: '9', label: 'Years and\nCounting' },
  },
  {
    image: aboutImage2,
    imagePosition: 'right',
    eyebrow: 'Our Programs',
    heading: 'Training, mentorship, and pathways to opportunity',
    description:
      'From grassroots coaching sessions to scholarship support, every ISQDF program is built to keep girls in school, on the pitch, and moving toward a future they choose for themselves.',
    points: [
      {
        label: 'Training',
        text: 'Weekly coaching sessions for girls across communities in Imo State, led by experienced coaches focused on skill-building and discipline.',
      },
      {
        label: 'Mentorship',
        text: 'Pairing players with mentors who guide them on and off the pitch, building confidence that carries into school and life.',
      },
    ],
    ctaIcon: 'ArrowRight',
    ctaText: 'See Our Programs',
    ctaHref: '#programs',
  },
];

export const aboutPageData = {
  banner: {
    eyebrow: 'About ISQDF',
    eyebrowIcon: Heart,
    heading: 'Football can open doors that last a lifetime.',
    description:
      'We use the power of football to support, equip, and elevate women and girls in Nigeria.',
    image: aboutImage2,
  },
  sections: aboutSections,
  programsHeader: {
    eyebrow: 'What We Run',
    heading: 'Programs Girls Can Actually Join',
    description:
      'Every program below is a real, ongoing way girls in Imo State build skill, confidence, and opportunity through football.',
  },
  cta: {
    eyebrow: 'Be part of the story',
    heading: 'Help create the next opportunity.',
    buttonText: 'Support our work',
    buttonHref: '/donate',
  },
};

export default aboutPageData;