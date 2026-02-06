import React, { useEffect, useRef, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, Heart, Award, ArrowRight, Sparkles } from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    title: 'Quality Education',
    description: 'Providing access to quality educational resources and learning opportunities for all.',
  },
  {
    icon: Users,
    title: 'Community Impact',
    description: 'Building stronger communities through education and empowerment programs.',
  },
  {
    icon: Heart,
    title: 'Compassionate Care',
    description: 'Supporting students with holistic care and personalized attention.',
  },
  {
    icon: Award,
    title: 'Proven Results',
    description: 'Transforming lives with measurable outcomes and lasting impact.',
  },
];

const stats = [
  { value: '10,000+', label: 'Students Reached' },
  { value: '50+', label: 'Programs Launched' },
  { value: '25+', label: 'Communities Served' },
  { value: '100+', label: 'Volunteers' },
];

const heroImages = [
  {
    src: '/assets/Screenshot%202025-12-24%20153629.jpg',
    alt: 'Foundation Activities',
    delay: '0ms',
  },
  {
    src: '/assets/e00003_42eb4111f5ba46b39436fec811df105d~mv2.avif',
    alt: 'Educational Programs',
    delay: '200ms',
  },
  {
    src: '/assets/e00003_b89bd166a314421cbcb505ffec9c884c~mv2.avif',
    alt: 'Community Engagement',
    delay: '400ms',
  },
];

const impactImages = [
  {
    src: '/assets/generated/rural-classroom-education.dim_800x600.jpg',
    alt: 'Rural Classroom Education',
    caption: 'Empowering Futures',
  },
  {
    src: '/assets/generated/volunteers-distributing-books.dim_800x600.jpg',
    alt: 'Volunteers Distributing Books',
    caption: 'Education for All',
  },
  {
    src: '/assets/generated/students-studying-tree.dim_800x600.jpg',
    alt: 'Students Studying Under Tree',
    caption: 'Learning Without Limits',
  },
  {
    src: '/assets/generated/community-building-school.dim_800x600.jpg',
    alt: 'Community Building School',
    caption: 'Building Together',
  },
];

export default function HomePage() {
  const heroRef = useRef(null);
  const imagesRef = useRef(null);
  const impactRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate-in', 'fade-in', 'slide-up');
            }, index * 80);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      if (imagesRef.current) {
        const images = imagesRef.current.querySelectorAll('.parallax-image');
        images.forEach((img, index) => {
          const speed = 0.3 + (index * 0.1);
          img.style.transform = `translateY(${currentScrollY * speed}px) scale(${1 + currentScrollY * 0.0001})`;
        });
      }

      if (impactRef.current) {
        const impactSection = impactRef.current.getBoundingClientRect().top + window.scrollY;
        const images = impactRef.current.querySelectorAll('.parallax-impact-image');
        images.forEach((img, index) => {
          const speed = 0.15 + (index * 0.05);
          const offset = Math.max(0, currentScrollY - impactSection + 500);
          img.style.transform = `translateY(${offset * speed}px)`;
        });
      }
    };

    const handleMouseMove = (e) => {
      if (imagesRef.current) {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        const x = (clientX / innerWidth - 0.5) * 2;
        const y = (clientY / innerHeight - 0.5) * 2;
        
        setMousePosition({ x, y });

        const images = imagesRef.current.querySelectorAll('.parallax-image');
        images.forEach((img, index) => {
          const depth = (index + 1) * 10;
          const moveX = x * depth;
          const moveY = y * depth;
          
          const currentScrollY = window.scrollY;
          const speed = 0.3 + (index * 0.1);
          
          img.style.transform = `translateY(${currentScrollY * speed}px) translateX(${moveX}px) scale(${1 + currentScrollY * 0.0001}) rotateY(${x * 3}deg) rotateX(${-y * 3}deg)`;
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <section
        ref={heroRef}
        className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gradient-start via-gradient-mid to-gradient-end gradient-animate opacity-95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(var(--accent)/0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,oklch(var(--primary)/0.10),transparent_50%)]" />
        
        <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-accent/18 blur-3xl float-animation animate-pulse-glow-slow" />
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-primary/18 blur-3xl float-animation animate-pulse-glow" style={{ animationDelay: '1s' }} />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 rounded-full bg-secondary/15 blur-3xl float-animation animate-pulse-glow-fast" style={{ animationDelay: '0.5s' }} />
        
        <div className="container relative z-10 mx-auto px-4 py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-8 animate-in fade-in slide-up duration-1000 text-center lg:text-center flex flex-col items-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/12 px-6 py-3 text-sm font-semibold text-primary-foreground backdrop-blur-md border border-primary-foreground/20 shadow-glow hover:shadow-glow-lg transition-all duration-500 hover:scale-105">
                <Sparkles className="h-4 w-4 text-accent-foreground animate-pulse-glow-fast" />
                Empowering Through Education
              </div>
              <h1 className="text-5xl font-extrabold leading-tight md:text-6xl lg:text-7xl xl:text-8xl tracking-tight">
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-accent via-accent-foreground to-accent bg-clip-text text-transparent animate-gradient-shift">
                    Shunyatax Global Education Foundation
                  </span>
                  <span className="absolute -bottom-2 left-0 h-1.5 w-full bg-gradient-to-r from-accent/50 via-accent-foreground to-accent/50 rounded-full shadow-accent-glow" />
                </span>
              </h1>
              <p className="max-w-2xl text-xl md:text-2xl leading-relaxed mx-auto font-bold text-black">
                Empowering communities through education and creating opportunities for a brighter future.
              </p>
              <p className="max-w-2xl text-xl text-primary-foreground/85 md:text-2xl leading-relaxed mx-auto font-medium">
                We are dedicated to transforming lives through quality education,
                community empowerment, and sustainable development programs.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row w-full pt-4">
                <Link to="/programs">
                  <Button size="lg" className="group relative overflow-hidden bg-accent text-accent-foreground hover:bg-accent/90 shadow-accent-glow hover:shadow-glow-lg transition-all duration-500 hover:scale-110 hover:-translate-y-1 px-8 py-6 text-lg font-bold">
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <span className="relative">Explore Programs</span>
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-2" />
                  </Button>
                </Link>
                <Link to="/donate">
                  <Button
                    size="lg"
                    variant="outline"
                    className="relative overflow-hidden border-2 border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground backdrop-blur-md hover:bg-primary-foreground/20 hover:border-primary-foreground/50 transition-all duration-500 hover:scale-105 hover:-translate-y-1 px-8 py-6 text-lg font-bold group"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <span className="relative">Support Our Mission</span>
                  </Button>
                </Link>
              </div>
            </div>

            <div ref={imagesRef} className="relative h-[600px] lg:h-[700px]" style={{ perspective: '1200px' }}>
              <div 
                className="absolute left-0 top-0 w-full h-[400px] lg:h-[480px] overflow-hidden rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-1000 parallax-image group cursor-pointer"
                style={{ 
                  animationDelay: heroImages[0].delay,
                  transformStyle: 'preserve-3d',
                  willChange: 'transform'
                }}
              >
                <div className="absolute -inset-6 bg-gradient-to-r from-primary/35 via-accent/35 to-primary/35 rounded-3xl blur-3xl animate-pulse-glow-slow opacity-60" />
                <div className="absolute -inset-3 bg-gradient-to-br from-accent/45 via-primary/45 to-accent/45 rounded-2xl blur-2xl animate-pulse-glow opacity-70" />
                <div className="absolute -inset-1 bg-gradient-to-tr from-primary/55 via-accent/55 to-primary/55 rounded-2xl blur-xl animate-pulse-glow-fast opacity-80" />
                
                <div className="absolute inset-0 bg-gradient-to-t from-primary/25 via-transparent to-accent/15 z-10 mix-blend-overlay transition-opacity duration-700 group-hover:opacity-80" />
                <div className="absolute inset-0 bg-white/8 z-10 transition-opacity duration-700 group-hover:opacity-60" />
                
                <img
                  src={heroImages[0].src}
                  alt={heroImages[0].alt}
                  className="h-full w-full object-cover transition-all duration-1000 group-hover:scale-110 brightness-110 contrast-110"
                  style={{ filter: 'brightness(1.15) contrast(1.1) saturate(1.05)' }}
                />
                <div className="absolute inset-0 ring-2 ring-primary/30 rounded-2xl shadow-glow-lg group-hover:ring-primary/50 transition-all duration-700" />
              </div>

              <div 
                className="absolute left-0 bottom-0 w-[48%] h-[240px] lg:h-[280px] overflow-hidden rounded-2xl shadow-2xl animate-in fade-in slide-in-from-left-8 duration-1000 parallax-image group cursor-pointer"
                style={{ 
                  animationDelay: heroImages[1].delay,
                  transformStyle: 'preserve-3d',
                  willChange: 'transform'
                }}
              >
                <div className="absolute -inset-4 bg-gradient-to-br from-accent/30 via-primary/30 to-accent/30 rounded-3xl blur-2xl animate-pulse-glow-slow opacity-60" />
                <div className="absolute -inset-2 bg-gradient-to-tl from-primary/45 via-accent/45 to-primary/45 rounded-2xl blur-xl animate-pulse-glow opacity-70" />
                
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-accent/12 z-10 mix-blend-overlay transition-opacity duration-700 group-hover:opacity-80" />
                <div className="absolute inset-0 bg-white/8 z-10 transition-opacity duration-700 group-hover:opacity-60" />
                
                <img
                  src={heroImages[1].src}
                  alt={heroImages[1].alt}
                  className="h-full w-full object-cover transition-all duration-1000 group-hover:scale-115 brightness-110 contrast-110"
                  style={{ filter: 'brightness(1.15) contrast(1.1) saturate(1.05)' }}
                />
                <div className="absolute inset-0 ring-2 ring-accent/30 rounded-2xl shadow-glow group-hover:ring-accent/50 transition-all duration-700" />
              </div>

              <div 
                className="absolute right-0 bottom-0 w-[48%] h-[240px] lg:h-[280px] overflow-hidden rounded-2xl shadow-2xl animate-in fade-in slide-in-from-right-8 duration-1000 parallax-image group cursor-pointer"
                style={{ 
                  animationDelay: heroImages[2].delay,
                  transformStyle: 'preserve-3d',
                  willChange: 'transform'
                }}
              >
                <div className="absolute -inset-4 bg-gradient-to-bl from-primary/30 via-accent/30 to-primary/30 rounded-3xl blur-2xl animate-pulse-glow-slow opacity-60" />
                <div className="absolute -inset-2 bg-gradient-to-tr from-accent/45 via-primary/45 to-accent/45 rounded-2xl blur-xl animate-pulse-glow opacity-70" />
                
                <div className="absolute inset-0 bg-gradient-to-t from-accent/20 via-transparent to-primary/12 z-10 mix-blend-overlay transition-opacity duration-700 group-hover:opacity-80" />
                <div className="absolute inset-0 bg-white/8 z-10 transition-opacity duration-700 group-hover:opacity-60" />
                
                <img
                  src={heroImages[2].src}
                  alt={heroImages[2].alt}
                  className="h-full w-full object-cover transition-all duration-1000 group-hover:scale-115 brightness-110 contrast-110"
                  style={{ filter: 'brightness(1.15) contrast(1.1) saturate(1.05)' }}
                />
                <div className="absolute inset-0 ring-2 ring-primary/30 rounded-2xl shadow-glow group-hover:ring-primary/50 transition-all duration-700" />
              </div>

              <div className="absolute -top-8 -right-8 w-48 h-48 bg-accent/30 rounded-full blur-3xl animate-pulse-glow-slow" />
              <div className="absolute -bottom-8 -left-8 w-56 h-56 bg-primary/30 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-accent/25 rounded-full blur-2xl animate-pulse-glow-fast" style={{ animationDelay: '0.5s' }} />
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </section>

      <section className="bg-background py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(var(--primary)/0.03),transparent_70%)]" />
        <div className="container relative mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="animate-on-scroll text-center group"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <div className="text-5xl font-extrabold bg-gradient-to-br from-primary via-accent to-primary bg-clip-text text-transparent md:text-6xl transition-all duration-500 group-hover:scale-125 group-hover:drop-shadow-glow">
                  {stat.value}
                </div>
                <div className="mt-3 text-base text-muted-foreground md:text-lg font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <section ref={impactRef} className="relative overflow-hidden bg-gradient-to-b from-background via-secondary/25 to-background py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,oklch(var(--primary)/0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,oklch(var(--accent)/0.05),transparent_50%)]" />
        
        <div className="container relative mx-auto px-4">
          <div className="animate-on-scroll mb-20 text-center">
            <h2 className="mb-6 text-4xl font-extrabold text-foreground md:text-5xl lg:text-6xl tracking-tight">Our Impact in Action</h2>
            <p className="mx-auto max-w-3xl text-lg md:text-xl text-muted-foreground leading-relaxed">
              Witness the transformative power of education in underprivileged communities around the world.
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-2 lg:gap-14">
            {impactImages.map((image, index) => (
              <div
                key={index}
                className="animate-on-scroll group relative"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative overflow-hidden rounded-3xl shadow-2xl parallax-impact-image float-animation transition-all duration-700 hover:shadow-glow-lg hover:-translate-y-4" style={{ animationDelay: `${index * 0.5}s` }}>
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="h-full w-full object-cover transition-all duration-1000 group-hover:scale-115 group-hover:brightness-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent transition-opacity duration-700 group-hover:from-black/85" />
                  <div className="absolute inset-0 ring-1 ring-primary/20 rounded-3xl group-hover:ring-primary/40 transition-all duration-700" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-3 group-hover:translate-y-0 transition-all duration-500">
                    <h3 className="text-3xl font-extrabold text-white mb-3 drop-shadow-2xl tracking-tight">
                      {image.caption}
                    </h3>
                    <p className="text-white/95 text-base drop-shadow-lg font-medium">
                      {image.alt}
                    </p>
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-accent/20 via-transparent to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl" />
                </div>

                <div 
                  className="absolute -z-10 w-full h-full top-6 left-6 rounded-3xl bg-gradient-to-br from-primary/15 to-accent/15 blur-2xl float-animation opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ animationDelay: `${index * 0.5 + 0.3}s` }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <section className="relative overflow-hidden bg-gradient-to-b from-background via-secondary/35 to-background py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,oklch(var(--primary)/0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,oklch(var(--accent)/0.05),transparent_50%)]" />
        
        <div className="container relative mx-auto px-4">
          <div className="animate-on-scroll mb-20 text-center">
            <h2 className="mb-6 text-4xl font-extrabold text-foreground md:text-5xl lg:text-6xl tracking-tight">Why Choose Us</h2>
            <p className="mx-auto max-w-3xl text-lg md:text-xl text-muted-foreground leading-relaxed">
              We are committed to making a lasting difference in the lives of students and communities worldwide.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="animate-on-scroll group border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-700 hover:-translate-y-6 hover:shadow-glow-lg hover:border-primary/50 hover:bg-card/95"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <CardHeader>
                  <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-accent/15 text-primary transition-all duration-500 group-hover:scale-125 group-hover:rotate-6 group-hover:shadow-glow">
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-2xl font-bold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />

      <section className="relative overflow-hidden py-28 text-primary-foreground">
        <div className="absolute inset-0 bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end gradient-animate opacity-95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,oklch(var(--accent)/0.15),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,oklch(var(--primary)/0.12),transparent_60%)]" />
        
        <div className="container relative mx-auto px-4 text-center">
          <div className="animate-on-scroll mx-auto max-w-4xl space-y-8">
            <h2 className="text-4xl font-extrabold md:text-5xl lg:text-6xl tracking-tight">Join Us in Making a Difference</h2>
            <p className="text-xl md:text-2xl text-primary-foreground/85 leading-relaxed font-medium">
              Your support can transform lives and create opportunities for those who need it most. Together, we can
              build a brighter future through education.
            </p>
            <div className="flex flex-col items-center justify-center gap-6 sm:flex-row pt-4">
              <Link to="/donate">
                <Button size="lg" className="group relative overflow-hidden bg-accent text-accent-foreground hover:bg-accent/90 shadow-accent-glow hover:shadow-glow-lg transition-all duration-500 hover:scale-110 hover:-translate-y-2 px-10 py-7 text-xl font-bold">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <span className="relative">Donate Now</span>
                  <Heart className="ml-3 h-6 w-6 transition-transform group-hover:scale-125" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="relative overflow-hidden border-2 border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground backdrop-blur-md hover:bg-primary-foreground/20 hover:border-primary-foreground/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 px-10 py-7 text-xl font-bold group"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <span className="relative">Get in Touch</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
