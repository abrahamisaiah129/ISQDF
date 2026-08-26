import { Mail, MapPin, Clock3 } from 'lucide-react';
import { FaFacebook, FaXTwitter, FaYoutube, FaInstagram, FaWhatsapp } from 'react-icons/fa6';

export const contactData = {
  header: {
    eyebrow: "Let's connect",
    heading: 'Bring a question, an idea, or a partnership.',
    description:
      'We would love to hear from people and organizations who believe in creating more opportunity through football.',
  },
  infoList: [
    {
      icon: Mail,
      iconName: 'Mail',
      title: 'Email us',
      text: 'hello@isqdf.org',
      href: 'mailto:hello@isqdf.org',
    },
    {
      icon: MapPin,
      iconName: 'MapPin',
      title: 'Find us',
      text: 'Owerri, Imo State, Nigeria',
    },
    {
      icon: Clock3,
      iconName: 'Clock3',
      title: 'Response time',
      text: 'Usually within 2 business days',
    },
  ],
  socials: [
    { icon: FaFacebook, iconName: 'FaFacebook', label: 'Facebook', href: 'https://facebook.com/isqdf' },
    { icon: FaXTwitter, iconName: 'FaXTwitter', label: 'Twitter', href: 'https://twitter.com/isqdf' },
    { icon: FaYoutube, iconName: 'FaYoutube', label: 'YouTube', href: 'https://youtube.com/isqdf' },
    { icon: FaInstagram, iconName: 'FaInstagram', label: 'Instagram', href: 'https://instagram.com/isqdf' },
    { icon: FaWhatsapp, iconName: 'FaWhatsapp', label: 'WhatsApp', href: 'https://wa.me/2340000000000' },
  ],
  form: {
    title: 'Send us a message',
    submitText: 'Send message',
    placeholders: {
      name: 'Your name',
      email: 'Email address',
      subject: 'Subject',
      message: 'How can we help?',
    },
  },
};

export default contactData;
