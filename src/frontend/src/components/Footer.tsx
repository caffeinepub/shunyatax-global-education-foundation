import { Link } from '@tanstack/react-router';
import { SiFacebook, SiX, SiInstagram, SiLinkedin, SiYoutube } from 'react-icons/si';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = {
  quickLinks: [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Programs', path: '/programs' },
    { name: 'Gallery', path: '/gallery' },
  ],
  getInvolved: [
    { name: 'Donate', path: '/donate' },
    { name: 'Volunteer', path: '/donate' },
    { name: 'Contact Us', path: '/contact' },
  ],
};

const socialLinks = [
  { 
    icon: SiFacebook, 
    href: 'https://www.facebook.com/people/Shunyatax-Global/100090713358913/', 
    label: 'Facebook', 
    color: 'text-[#1877F2]', 
    hoverColor: 'hover:text-[#0d5dbf]' 
  },
  { 
    icon: SiX, 
    href: 'https://x.com/shunyatax', 
    label: 'X (Twitter)', 
    color: 'text-[#1DA1F2]', 
    hoverColor: 'hover:text-[#0c85d0]' 
  },
  { 
    icon: SiInstagram, 
    href: 'https://www.instagram.com/shunyatax_global/', 
    label: 'Instagram', 
    color: 'text-[#E4405F]', 
    hoverColor: 'hover:text-[#d62954]' 
  },
  { 
    icon: SiLinkedin, 
    href: 'https://www.linkedin.com/in/c-a-prerak-baheti-b0b35537/', 
    label: 'LinkedIn', 
    color: 'text-[#0A66C2]', 
    hoverColor: 'hover:text-[#004182]' 
  },
  { 
    icon: SiYoutube, 
    href: 'https://www.youtube.com/@shunyataxglobal', 
    label: 'YouTube', 
    color: 'text-[#FF0000]', 
    hoverColor: 'hover:text-[#cc0000]' 
  },
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-primary via-gradient-mid to-gradient-end text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* About Section */}
          <div className="space-y-4">
            <img
              src="/assets/a_professional_vector_style_logo_design_Y10xaOEOT32zN1Lvad4GEQ_-removebg-preview.png"
              alt="Shunyatax Global Education Foundation"
              className="h-16 w-auto drop-shadow-lg"
            />
            <p className="text-sm text-primary-foreground/75">
              Empowering communities through education and creating opportunities for a brighter future.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`rounded-full bg-white p-2.5 transition-all duration-300 ${social.color} ${social.hoverColor} hover:scale-110 hover:shadow-lg hover:brightness-110`}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-black">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm font-bold text-black transition-all duration-300 hover:opacity-70 hover:underline hover:underline-offset-4"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-black">Get Involved</h3>
            <ul className="space-y-2">
              {footerLinks.getInvolved.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm font-bold text-black transition-all duration-300 hover:opacity-70 hover:underline hover:underline-offset-4"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-black">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 font-bold text-black transition-all duration-300 hover:opacity-70">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <a 
                  href="https://maps.app.goo.gl/ou9xPw6VEjBm6nu77" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  View Location on Map
                </a>
              </li>
              <li className="flex items-center gap-2 font-bold text-black transition-all duration-300 hover:opacity-70">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a href="tel:+919461514198" className="hover:underline">
                  +91 94615 14198
                </a>
              </li>
              <li className="flex items-center gap-2 font-bold text-black transition-all duration-300 hover:opacity-70">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a href="mailto:info@shunyataxglobal.org" className="hover:underline">
                  info@shunyataxglobal.org
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-primary-foreground/10 pt-8 text-center text-sm text-primary-foreground/60">
          <p className="flex items-center justify-center gap-1">
            © 2025. Built with <Heart className="h-4 w-4 fill-accent text-accent" /> using{' '}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-foreground transition-colors hover:text-accent"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
