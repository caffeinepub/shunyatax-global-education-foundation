import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, Eye, Heart, Users, BookOpen, Globe, Lightbulb, TrendingUp } from 'lucide-react';
import { getAllTeamMembers, getAllImpactStories } from '../data/staticDataClient';

const values = [
  {
    icon: Target,
    title: 'Excellence',
    description: 'We strive for excellence in everything we do, ensuring the highest quality education and support.',
  },
  {
    icon: Eye,
    title: 'Transparency',
    description: 'We operate with complete transparency, building trust with our communities and supporters.',
  },
  {
    icon: Heart,
    title: 'Compassion',
    description: 'We approach every student and community with empathy, understanding, and genuine care.',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'We believe in the power of partnership and working together to achieve greater impact.',
  },
];

export default function AboutPage() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [impactStories, setImpactStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [team, stories] = await Promise.all([
        getAllTeamMembers(),
        getAllImpactStories()
      ]);
      setTeamMembers(team);
      setImpactStories(stories);
      setLoading(false);
    }
    loadData();
  }, []);

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
  }, [teamMembers, impactStories]);

  return (
    <div className="min-h-screen pt-20">
      <section className="relative overflow-hidden py-20 text-primary-foreground">
        <div className="absolute inset-0 bg-gradient-to-br from-gradient-start via-gradient-mid to-gradient-end gradient-animate" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,oklch(var(--accent)/0.15),transparent_70%)]" />
        
        <div className="container relative mx-auto px-4">
          <div className="animate-on-scroll mx-auto max-w-3xl text-center">
            <Badge className="mb-4 bg-accent/95 text-accent-foreground shadow-accent-glow">About Us</Badge>
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">Empowering Communities Through Education</h1>
            <p className="text-lg text-primary-foreground/90 leading-relaxed">
              Shunyatax Global Education Foundation is dedicated to transforming lives through accessible, quality education 
              and empowering underprivileged communities worldwide to achieve sustainable development and lifelong learning.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="animate-on-scroll">
              <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 transition-all duration-300 hover:scale-110 hover:rotate-3">
                <img 
                  src="/assets/generated/mission-icon-transparent.dim_64x64.png" 
                  alt="Mission Icon" 
                  className="h-16 w-16"
                />
              </div>
              <h2 className="mb-6 text-3xl font-bold text-foreground md:text-4xl">Our Mission</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p className="text-lg">
                  To promote access to quality education for all, with a special focus on empowering underprivileged 
                  communities and creating pathways to lifelong learning opportunities.
                </p>
                <p>
                  We are committed to breaking down barriers that prevent children and adults from accessing education. 
                  Through innovative programs, community partnerships, and sustainable initiatives, we work to ensure 
                  that every individual has the tools and resources needed to unlock their full potential.
                </p>
              </div>
            </div>
            <Card className="animate-on-scroll border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-glow">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 text-primary">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Quality Education Access</h3>
                    <p className="text-sm text-muted-foreground">
                      Providing free and accessible educational resources to underserved communities worldwide.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-accent/10 to-secondary/10 text-accent">
                    <Users className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Community Empowerment</h3>
                    <p className="text-sm text-muted-foreground">
                      Building capacity within communities to create sustainable, locally-driven educational initiatives.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="container mx-auto px-4">
          <div className="animate-on-scroll mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">Our Core Values</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              These principles guide our work and define who we are as an organization.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Card
                key={index}
                className="animate-on-scroll group border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-500 hover:-translate-y-3 hover:shadow-glow hover:border-primary/40"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-glow">
                    <value.icon className="h-7 w-7" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {impactStories.length > 0 && (
        <section className="relative overflow-hidden bg-gradient-to-b from-secondary/30 to-background py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,oklch(var(--primary)/0.04),transparent_50%)]" />
          
          <div className="container relative mx-auto px-4">
            <div className="animate-on-scroll mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">Impact Stories</h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                Real stories of transformation and hope from the communities we serve.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {impactStories.map((story, index) => (
                <Card
                  key={index}
                  className="animate-on-scroll group overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-glow"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <CardTitle className="text-xl">{story.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{story.story}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {teamMembers.length > 0 && (
        <section className="bg-background py-20">
          <div className="container mx-auto px-4">
            <div className="animate-on-scroll mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">Our Team</h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                Meet the dedicated individuals working to make our mission a reality.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {teamMembers.map((member, index) => (
                <Card
                  key={index}
                  className="animate-on-scroll group border-border/50 bg-card/80 backdrop-blur-sm text-center transition-all duration-500 hover:-translate-y-3 hover:shadow-glow"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 to-accent/10 text-primary ring-2 ring-primary/15 transition-all duration-300 group-hover:ring-4 group-hover:ring-primary/30">
                      <Users className="h-12 w-12" />
                    </div>
                    <CardTitle className="mt-4 text-xl">{member.name}</CardTitle>
                    <Badge variant="secondary" className="mx-auto">
                      {member.role}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
