import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Target, Award } from 'lucide-react';
import { useQueries } from '@/hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProgramsPage() {
  const { useGetAllPrograms } = useQueries();
  const { data: allPrograms, isLoading } = useGetAllPrograms();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = allPrograms
    ? ['all', ...Array.from(new Set(allPrograms.map((p) => p.category)))]
    : ['all'];

  const displayedPrograms =
    selectedCategory === 'all'
      ? allPrograms
      : allPrograms?.filter((p) => p.category === selectedCategory);

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
  }, [displayedPrograms]);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 text-primary-foreground">
        <div className="absolute inset-0 bg-gradient-to-br from-gradient-start via-gradient-mid to-gradient-end gradient-animate" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,oklch(var(--accent)/0.15),transparent_70%)]" />
        
        <div className="container relative mx-auto px-4">
          <div className="animate-on-scroll mx-auto max-w-3xl text-center">
            <Badge className="mb-4 bg-accent/95 text-accent-foreground shadow-accent-glow">Our Programs</Badge>
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">Transforming Lives Through Education</h1>
            <p className="text-lg text-primary-foreground/80 leading-relaxed">
              Explore our comprehensive range of educational programs designed to empower individuals and strengthen
              communities.
            </p>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="bg-background py-20">
        <div className="container mx-auto px-4">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <div className="animate-on-scroll mb-12 flex justify-center">
              <TabsList className="flex-wrap bg-secondary/50 backdrop-blur-sm">
                {categories.map((category) => (
                  <TabsTrigger 
                    key={category} 
                    value={category} 
                    className="capitalize transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-primary-foreground"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <TabsContent value={selectedCategory} className="mt-0">
              {isLoading ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <Card key={i} className="overflow-hidden">
                      <Skeleton className="h-48 w-full shimmer" />
                      <CardHeader>
                        <Skeleton className="h-6 w-3/4 shimmer" />
                        <Skeleton className="mt-2 h-4 w-1/2 shimmer" />
                      </CardHeader>
                      <CardContent>
                        <Skeleton className="h-20 w-full shimmer" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : displayedPrograms && displayedPrograms.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {displayedPrograms.map((program, index) => (
                    <Card
                      key={program.id}
                      className="animate-on-scroll group overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-500 hover:-translate-y-3 hover:shadow-glow hover:border-primary/40"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {program.image && (
                        <div className="aspect-video overflow-hidden relative">
                          <img
                            src={program.image.getDirectURL()}
                            alt={program.title}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      )}
                      <CardHeader>
                        <div className="mb-2 flex items-center justify-between">
                          <Badge variant="secondary" className="capitalize bg-primary/10 text-primary">
                            {program.category}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">{program.title}</CardTitle>
                        <CardDescription className="leading-relaxed">{program.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {program.objectives.length > 0 && (
                          <div>
                            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                              <div className="rounded-lg bg-primary/10 p-1.5">
                                <Target className="h-4 w-4 text-primary" />
                              </div>
                              Objectives
                            </div>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                              {program.objectives.slice(0, 3).map((objective, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-r from-primary to-accent" />
                                  {objective}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {program.outcomes.length > 0 && (
                          <div>
                            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                              <div className="rounded-lg bg-accent/10 p-1.5">
                                <Award className="h-4 w-4 text-accent" />
                              </div>
                              Expected Outcomes
                            </div>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                              {program.outcomes.slice(0, 2).map((outcome, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-r from-accent to-accent/70" />
                                  {outcome}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 to-accent/10">
                    <BookOpen className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-foreground">No Programs Yet</h3>
                  <p className="text-muted-foreground">
                    Programs in this category will be available soon. Check back later!
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-20 text-primary-foreground">
        <div className="absolute inset-0 bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end gradient-animate" />
        
        <div className="container relative mx-auto px-4 text-center">
          <div className="animate-on-scroll mx-auto max-w-3xl space-y-6">
            <h2 className="text-3xl font-bold md:text-4xl">Want to Learn More?</h2>
            <p className="text-lg text-primary-foreground/80 leading-relaxed">
              Get in touch with us to learn more about our programs and how you can get involved.
            </p>
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-accent-glow hover:shadow-glow-lg transition-all duration-300">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

