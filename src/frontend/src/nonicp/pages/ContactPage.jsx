import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { SiFacebook, SiX, SiInstagram, SiLinkedin, SiYoutube } from 'react-icons/si';
import { toast } from 'sonner';
import { saveContactForm } from '../data/submissionsStore';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Location',
    content: 'View on Map',
    link: 'https://maps.app.goo.gl/ou9xPw6VEjBm6nu77',
  },
  {
    icon: Phone,
    title: 'Phone',
    content: '+91 94615 14198',
    link: 'tel:+919461514198',
  },
  {
    icon: Mail,
    title: 'Email',
    content: 'info@shunyataxglobal.org',
    link: 'mailto:info@shunyataxglobal.org',
  },
  {
    icon: Clock,
    title: 'Office Hours',
    content: 'Mon-Fri: 9:00 AM - 5:00 PM',
  },
];

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

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    try {
      saveContactForm({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
      });
      toast.success('Thank you! Your message has been received. We will get back to you soon.');
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in', 'fade-in', 'slide-in-from-bottom-4');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen pt-20">
      <section className="relative overflow-hidden py-20 text-primary-foreground">
        <div className="absolute inset-0 bg-gradient-to-br from-gradient-start via-gradient-mid to-gradient-end gradient-animate" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,oklch(var(--accent)/0.15),transparent_70%)]" />
        
        <div className="container relative mx-auto px-4">
          <div className="animate-on-scroll mx-auto max-w-3xl text-center">
            <Badge className="mb-4 bg-accent/95 text-accent-foreground shadow-accent-glow">Contact Us</Badge>
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">Get in Touch</h1>
            <p className="text-lg text-primary-foreground/80 leading-relaxed">
              Have questions or want to learn more about our work? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-2">
            <Card className="animate-on-scroll border-border/50 bg-card/80 backdrop-blur-sm shadow-glow">
              <CardHeader>
                <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      placeholder="Your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="transition-all duration-300 focus:ring-2 focus:ring-primary/40"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="transition-all duration-300 focus:ring-2 focus:ring-primary/40"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us how we can help..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={6}
                      required
                      className="transition-all duration-300 focus:ring-2 focus:ring-primary/40"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-accent to-accent/95 hover:from-accent/90 hover:to-accent shadow-accent-glow hover:shadow-glow-lg transition-all duration-300"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-accent-foreground border-t-transparent" />
                        Sending...
                      </span>
                    ) : (
                      'Send Message'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <div className="animate-on-scroll" style={{ animationDelay: '100ms' }}>
                <h2 className="mb-6 text-2xl font-bold text-foreground">Contact Information</h2>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <Card 
                      key={index} 
                      className="group border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:bg-accent/5 hover:border-primary/40 hover:-translate-y-1 hover:shadow-glow"
                    >
                      <CardContent className="flex items-start gap-4 p-6">
                        <div className="rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 p-3 text-primary transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                          <info.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="mb-1 font-semibold text-foreground">{info.title}</h3>
                          {info.link ? (
                            <a 
                              href={info.link}
                              target={info.link.startsWith('http') ? '_blank' : undefined}
                              rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                              className="text-muted-foreground leading-relaxed hover:text-primary hover:underline transition-colors"
                            >
                              {info.content}
                            </a>
                          ) : (
                            <p className="text-muted-foreground leading-relaxed">{info.content}</p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <Card className="animate-on-scroll border-border/50 bg-card/80 backdrop-blur-sm" style={{ animationDelay: '150ms' }}>
                <CardHeader>
                  <CardTitle className="text-xl">Connect With Us</CardTitle>
                  <CardDescription>Follow us on social media for updates and news</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 justify-center">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className={`rounded-full bg-white p-3 transition-all duration-300 ${social.color} ${social.hoverColor} hover:scale-110 hover:shadow-lg hover:brightness-110`}
                      >
                        <social.icon className="h-6 w-6" />
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
