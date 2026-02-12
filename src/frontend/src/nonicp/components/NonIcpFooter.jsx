import React from 'react';
import { Link } from '@tanstack/react-router';
import { SiFacebook, SiX, SiInstagram, SiLinkedin, SiYoutube } from 'react-icons/si';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';
import { CANONICAL_LOGO_PATH, CANONICAL_LOGO_ALT } from '@/constants/logo';

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
    color: 'text-[#000000]', 
    hoverColor: 'hover:text-[#333333]' 
  },
  { 
    icon: SiInstagram, 
    href: 'https://www.instagram.com/shunyatax/', 
    label: 'Instagram', 
    color: 'text-[#E4405F]', 
    hoverColor: 'hover:text-[#c13584]' 
  },
  { 
    icon: SiLinkedin, 
    href: 'https://www.linkedin.com/company/shunyatax/', 
    label: 'LinkedIn', 
    color: 'text-[#0A66C2]', 
    hoverColor: 'hover:text-[#004182]' 
  },
  { 
    icon: SiYoutube, 
    href: 'https://www.youtube.com/@shunyatax', 
    label: 'YouTube', 
    color: 'text-[#FF0000]', 
    hoverColor: 'hover:text-[#cc0000]' 
  },
];

export default function NonIcpFooter() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = typeof window !== 'undefined' 
    ? encodeURIComponent(window.location.hostname) 
    : 'unknown-app';

  return (
    <footer className="relative bg-gradient-to-br from-primary via-gradient-mid to-gradient-end text-primary-foreground overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-secondary/10 gradient-animate opacity-50" />
      
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
        backgroundSize: '32px 32px'
      }} />

      <div className="container relative mx-auto px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Link to="/" className="inline-block group">
              <img
                src={CANONICAL_LOGO_PATH}
                alt={CANONICAL_LOGO_ALT}
                className="h-20 w-auto drop-shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]"
              />
            </Link>
            <p className="text-sm leading-relaxed text-primary-foreground/90 drop-shadow-sm">
              Together, we can make a difference. Supporting children, families, and communities through education and empowerment.
            </p>
          </div>

          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            <h3 className="text-lg font-bold tracking-wide drop-shadow-md">Quick Links</h3>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="group inline-flex items-center text-sm text-primary-foreground/90 transition-all duration-300 hover:text-accent-foreground hover:translate-x-2 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                  >
                    <span className="mr-2 h-1.5 w-1.5 rounded-full bg-accent-foreground opacity-0 transition-all duration-300 group-hover:opacity-100 shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            <h3 className="text-lg font-bold tracking-wide drop-shadow-md">Get Involved</h3>
            <ul className="space-y-3">
              {footerLinks.getInvolved.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="group inline-flex items-center text-sm text-primary-foreground/90 transition-all duration-300 hover:text-accent-foreground hover:translate-x-2 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                  >
                    <span className="mr-2 h-1.5 w-1.5 rounded-full bg-accent-foreground opacity-0 transition-all duration-300 group-hover:opacity-100 shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <h3 className="text-lg font-bold tracking-wide drop-shadow-md">Contact Us</h3>
            <ul className="space-y-4">
              <li className="group flex items-start gap-3 text-sm text-primary-foreground/90 transition-all duration-300 hover:text-accent-foreground">
                <Mail className="mt-0.5 h-5 w-5 flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
                <a href="mailto:info@shunyataxglobal.org" className="hover:underline">
                  info@shunyataxglobal.org
                </a>
              </li>
              <li className="group flex items-start gap-3 text-sm text-primary-foreground/90 transition-all duration-300 hover:text-accent-foreground">
                <Phone className="mt-0.5 h-5 w-5 flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
                <a href="tel:+919461514198" className="hover:underline">
                  +91 94615 14198
                </a>
              </li>
              <li className="group flex items-start gap-3 text-sm text-primary-foreground/90 transition-all duration-300 hover:text-accent-foreground">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
                <a 
                  href="https://maps.app.goo.gl/ou9xPw6VEjBm6nu77" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  View on Map
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-primary-foreground/10 pt-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
          <div className="flex flex-wrap items-center justify-center gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative ${social.color} ${social.hoverColor} transition-all duration-300 hover:scale-125 hover:drop-shadow-[0_0_12px_currentColor]`}
                aria-label={social.label}
              >
                <social.icon className="h-7 w-7 transition-transform duration-300 group-hover:rotate-12" />
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-background/90 px-2 py-1 text-xs text-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100 shadow-lg">
                  {social.label}
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-primary-foreground/10 pt-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
          <p className="text-sm text-primary-foreground/80 drop-shadow-sm">
            © {currentYear} Shunyatax Global Education Foundation. All rights reserved.
          </p>
          <p className="mt-2 text-sm text-primary-foreground/70 drop-shadow-sm">
            Built with <Heart className="inline h-4 w-4 text-red-500 animate-pulse" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-accent-foreground hover:underline transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
