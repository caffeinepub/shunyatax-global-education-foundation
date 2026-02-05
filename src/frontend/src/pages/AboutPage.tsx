import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, Eye, Heart, Users, BookOpen, Globe, Lightbulb, TrendingUp } from 'lucide-react';
import { useQueries } from '@/hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';

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
  const { useGetAllImpactStories, useGetAllTeamMembers } = useQueries();
  const { data: impactStories, isLoading: storiesLoading } = useGetAllImpactStories();
  const { data: teamMembers, isLoading: teamLoading } = useGetAllTeamMembers();

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
  }, [impactStories, teamMembers]);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
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

      {/* Mission Section */}
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
                <p>
                  Our mission extends beyond traditional classroom learning. We focus on holistic development, including 
                  skill-building, vocational training, digital literacy, and leadership development to prepare individuals 
                  for meaningful participation in their communities and the global economy.
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
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-secondary/10 to-primary/10 text-secondary">
                    <Lightbulb className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Lifelong Learning</h3>
                    <p className="text-sm text-muted-foreground">
                      Enabling continuous education opportunities for all ages, from early childhood to adult learning.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-secondary/30 via-background to-background py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,oklch(var(--primary)/0.04),transparent_50%)]" />
        
        <div className="container relative mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <Card className="animate-on-scroll order-2 lg:order-1 border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-glow">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 text-primary">
                    <Globe className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Global Educational Equity</h3>
                    <p className="text-sm text-muted-foreground">
                      A world where every child, regardless of location or circumstance, has equal access to quality education.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-accent/10 to-secondary/10 text-accent">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Sustainable Development</h3>
                    <p className="text-sm text-muted-foreground">
                      Self-sufficient communities where education drives economic growth and social progress.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-secondary/10 to-primary/10 text-secondary">
                    <Heart className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Empowered Generations</h3>
                    <p className="text-sm text-muted-foreground">
                      Future generations equipped with knowledge, skills, and values to create positive change.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="animate-on-scroll order-1 lg:order-2">
              <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/15 to-accent/5 transition-all duration-300 hover:scale-110 hover:rotate-3">
                <img 
                  src="/assets/generated/vision-icon-transparent.dim_64x64.png" 
                  alt="Vision Icon" 
                  className="h-16 w-16"
                />
              </div>
              <h2 className="mb-6 text-3xl font-bold text-foreground md:text-4xl">Our Vision</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p className="text-lg">
                  We envision a world where education is recognized as a fundamental human right and every individual 
                  has the opportunity to build a brighter future for themselves and their communities.
                </p>
                <p>
                  Our vision extends to creating sustainable, self-sufficient communities where education serves as 
                  the catalyst for economic growth, social development, and cultural enrichment. We see a future where 
                  educational barriers are eliminated, and learning becomes a lifelong journey accessible to all.
                </p>
                <p>
                  Through our work, we aim to inspire a global movement that values education as the cornerstone of 
                  human development, fostering innovation, critical thinking, and compassion in every learner we reach.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="bg-background py-20">
        <div className="container mx-auto px-4">
          <div className="animate-on-scroll mx-auto max-w-4xl">
            <div className="mb-8 text-center">
              <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary/15 to-secondary/5 transition-all duration-300 hover:scale-110 hover:rotate-3">
                <img 
                  src="/assets/generated/story-icon-transparent.dim_64x64.png" 
                  alt="Story Icon" 
                  className="h-16 w-16"
                />
              </div>
              <h2 className="mb-6 text-3xl font-bold text-foreground md:text-4xl">Our Story</h2>
            </div>
            <Card className="border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-500 hover:shadow-glow">
              <CardContent className="p-8 space-y-6 text-muted-foreground leading-relaxed">
                <p className="text-lg">
                  Shunyatax Global Education Foundation was born from a simple yet powerful belief: that education 
                  has the power to transform lives and break the cycle of poverty. Our journey began with a small 
                  group of passionate educators and community leaders who witnessed firsthand the challenges faced 
                  by underprivileged communities in accessing quality education.
                </p>
                <p>
                  What started as a grassroots initiative to provide basic educational resources to a handful of 
                  villages has grown into a comprehensive foundation serving thousands of learners across multiple 
                  regions. Our early experiences taught us that sustainable change requires more than just providing 
                  books and classrooms—it requires understanding the unique needs of each community and building 
                  solutions together.
                </p>
                <p>
                  Over the years, we've expanded our programs to include adult literacy classes, vocational training, 
                  digital literacy initiatives, and scholarship programs. We've partnered with local governments, 
                  international organizations, and community leaders to create a network of support that extends far 
                  beyond traditional education.
                </p>
                <p>
                  Today, Shunyatax Global Education Foundation stands as a testament to what's possible when 
                  communities come together with a shared vision. Every success story, every graduate, and every 
                  empowered community member reinforces our commitment to making quality education accessible to all.
                </p>
                <div className="grid gap-6 md:grid-cols-3 pt-6 border-t border-border/50">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
                    <div className="text-sm">Students Reached</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent mb-2">50+</div>
                    <div className="text-sm">Communities Served</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-secondary mb-2">100+</div>
                    <div className="text-sm">Programs Launched</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-secondary/30 to-background py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,oklch(var(--accent)/0.04),transparent_50%)]" />
        
        <div className="container relative mx-auto px-4">
          <div className="animate-on-scroll mb-12 text-center">
            <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-accent/10 transition-all duration-300 hover:scale-110 hover:rotate-3">
              <img 
                src="/assets/generated/impact-icon-transparent.dim_64x64.png" 
                alt="Impact Icon" 
                className="h-16 w-16"
              />
            </div>
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">Our Impact</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Real-world achievements and measurable outcomes from our educational initiatives across communities.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
            <Card className="animate-on-scroll border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-glow">
              <CardHeader>
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 text-primary transition-all duration-300 hover:scale-110 hover:rotate-3">
                  <BookOpen className="h-7 w-7" />
                </div>
                <CardTitle className="text-xl">Educational Access</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Schools Built</span>
                  <span className="text-lg font-bold text-primary">25+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Libraries Established</span>
                  <span className="text-lg font-bold text-primary">40+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Learning Centers</span>
                  <span className="text-lg font-bold text-primary">60+</span>
                </div>
                <p className="text-sm text-muted-foreground pt-3 border-t border-border/50">
                  Providing infrastructure and resources to ensure quality learning environments.
                </p>
              </CardContent>
            </Card>

            <Card className="animate-on-scroll border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-glow" style={{ animationDelay: '100ms' }}>
              <CardHeader>
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-accent/10 to-secondary/10 text-accent transition-all duration-300 hover:scale-110 hover:rotate-3">
                  <Users className="h-7 w-7" />
                </div>
                <CardTitle className="text-xl">Community Empowerment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Adult Literacy Programs</span>
                  <span className="text-lg font-bold text-accent">5,000+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Vocational Training</span>
                  <span className="text-lg font-bold text-accent">3,500+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Women Empowered</span>
                  <span className="text-lg font-bold text-accent">4,200+</span>
                </div>
                <p className="text-sm text-muted-foreground pt-3 border-t border-border/50">
                  Enabling adults to gain skills and knowledge for better livelihoods.
                </p>
              </CardContent>
            </Card>

            <Card className="animate-on-scroll border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-glow" style={{ animationDelay: '200ms' }}>
              <CardHeader>
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-secondary/10 to-primary/10 text-secondary transition-all duration-300 hover:scale-110 hover:rotate-3">
                  <TrendingUp className="h-7 w-7" />
                </div>
                <CardTitle className="text-xl">Student Success</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Scholarships Awarded</span>
                  <span className="text-lg font-bold text-secondary">2,000+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Graduation Rate</span>
                  <span className="text-lg font-bold text-secondary">92%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Career Placements</span>
                  <span className="text-lg font-bold text-secondary">1,800+</span>
                </div>
                <p className="text-sm text-muted-foreground pt-3 border-t border-border/50">
                  Supporting students from enrollment through successful career outcomes.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="animate-on-scroll border-border/50 bg-card/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6 text-center">Key Achievements</h3>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <span className="text-sm font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Digital Literacy Initiative</h4>
                      <p className="text-sm text-muted-foreground">
                        Equipped 8,000+ students with essential computer and internet skills for the digital age.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <span className="text-sm font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Mobile Education Units</h4>
                      <p className="text-sm text-muted-foreground">
                        Reached remote villages with traveling classrooms, serving 3,000+ children annually.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <span className="text-sm font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Teacher Training Programs</h4>
                      <p className="text-sm text-muted-foreground">
                        Trained 500+ educators in modern teaching methodologies and inclusive education practices.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      <span className="text-sm font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">School Feeding Program</h4>
                      <p className="text-sm text-muted-foreground">
                        Provided nutritious meals to 6,000+ students daily, improving attendance and learning outcomes.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      <span className="text-sm font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Community Libraries</h4>
                      <p className="text-sm text-muted-foreground">
                        Established 40+ libraries with over 100,000 books, fostering a culture of reading and learning.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      <span className="text-sm font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Scholarship Fund</h4>
                      <p className="text-sm text-muted-foreground">
                        Enabled 2,000+ underprivileged students to pursue higher education through financial support.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Values Section */}
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

      {/* Impact Stories */}
      {impactStories && impactStories.length > 0 && (
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
              {storiesLoading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <Card key={i} className="overflow-hidden">
                      <Skeleton className="h-48 w-full shimmer" />
                      <CardHeader>
                        <Skeleton className="h-6 w-3/4 shimmer" />
                      </CardHeader>
                      <CardContent>
                        <Skeleton className="h-20 w-full shimmer" />
                      </CardContent>
                    </Card>
                  ))
                : impactStories.map((story, index) => (
                    <Card
                      key={index}
                      className="animate-on-scroll group overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-glow"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {story.image && (
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={story.image.getDirectURL()}
                            alt={story.title}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        </div>
                      )}
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

      {/* Team Section */}
      {teamMembers && teamMembers.length > 0 && (
        <section className="bg-background py-20">
          <div className="container mx-auto px-4">
            <div className="animate-on-scroll mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">Our Team</h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                Meet the dedicated individuals working to make our mission a reality.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {teamLoading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <Card key={i} className="text-center">
                      <CardHeader>
                        <Skeleton className="mx-auto h-24 w-24 rounded-full shimmer" />
                        <Skeleton className="mx-auto mt-4 h-6 w-32 shimmer" />
                        <Skeleton className="mx-auto mt-2 h-4 w-24 shimmer" />
                      </CardHeader>
                      <CardContent>
                        <Skeleton className="h-16 w-full shimmer" />
                      </CardContent>
                    </Card>
                  ))
                : teamMembers.map((member, index) => (
                    <Card
                      key={index}
                      className="animate-on-scroll group border-border/50 bg-card/80 backdrop-blur-sm text-center transition-all duration-500 hover:-translate-y-3 hover:shadow-glow"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CardHeader>
                        {member.photo ? (
                          <div className="mx-auto h-24 w-24 overflow-hidden rounded-full ring-2 ring-primary/15 transition-all duration-300 group-hover:ring-4 group-hover:ring-primary/30">
                            <img
                              src={member.photo.getDirectURL()}
                              alt={member.name}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          </div>
                        ) : (
                          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 to-accent/10 text-primary ring-2 ring-primary/15 transition-all duration-300 group-hover:ring-4 group-hover:ring-primary/30">
                            <Users className="h-12 w-12" />
                          </div>
                        )}
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
