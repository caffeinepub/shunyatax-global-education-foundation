import { useState } from 'react';
import { useQueries } from '@/hooks/useQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Clock, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function EventsPage() {
  const { useGetAllEvents } = useQueries();
  const { data: events, isLoading } = useGetAllEvents();
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredEvents = events?.filter(event => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'upcoming') {
      return Number(event.date) > Date.now() * 1000000;
    }
    if (filterStatus === 'past') {
      return Number(event.date) <= Date.now() * 1000000;
    }
    return true;
  }) || [];

  const sortedEvents = [...filteredEvents].sort((a, b) => Number(b.date - a.date));

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gradient-start via-gradient-mid to-gradient-end pt-32 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(var(--accent)/0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,oklch(var(--primary)/0.10),transparent_50%)]" />
        
        <div className="container relative mx-auto px-4 text-center">
          <div className="animate-in fade-in slide-up duration-1000">
            <h1 className="mb-6 text-5xl font-extrabold text-primary-foreground md:text-6xl lg:text-7xl tracking-tight">
              Our Events
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-primary-foreground/85 md:text-2xl leading-relaxed font-medium">
              Join us in making a difference through our educational programs and community events
            </p>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </section>

      {/* Events Section */}
      <section className="relative overflow-hidden bg-background py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,oklch(var(--primary)/0.03),transparent_70%)]" />
        
        <div className="container relative mx-auto px-4">
          {/* Filter Controls */}
          <div className="mb-12 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Filter Events:</span>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-48 border-border/50 bg-card/80 backdrop-blur-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Events</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="past">Past Events</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="text-sm text-muted-foreground">
              Showing {sortedEvents.length} {sortedEvents.length === 1 ? 'event' : 'events'}
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-20">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              <p className="mt-4 text-muted-foreground">Loading events...</p>
            </div>
          ) : sortedEvents.length === 0 ? (
            <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
              <CardContent className="py-20 text-center">
                <Calendar className="mx-auto h-16 w-16 text-muted-foreground mb-6" />
                <h3 className="text-2xl font-bold text-foreground mb-2">No Events Found</h3>
                <p className="text-muted-foreground">Check back soon for upcoming events!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {sortedEvents.map((event, index) => {
                const eventDate = new Date(Number(event.date) / 1000000);
                const isUpcoming = eventDate > new Date();
                
                return (
                  <Card
                    key={event.id}
                    className="group border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-glow-lg animate-on-scroll"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {event.image && (
                      <div className="relative aspect-video overflow-hidden rounded-t-lg">
                        <img
                          src={event.image.getDirectURL()}
                          alt={event.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md ${
                          isUpcoming 
                            ? 'bg-primary/90 text-primary-foreground' 
                            : 'bg-secondary/90 text-secondary-foreground'
                        }`}>
                          {isUpcoming ? 'Upcoming' : 'Past Event'}
                        </div>
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                        {event.title}
                      </CardTitle>
                      <div className="space-y-2 pt-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 text-primary" />
                          <span className="font-medium">
                            {eventDate.toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 text-accent" />
                          <span className="font-medium">{event.location}</span>
                        </div>
                        {event.venue && (
                          <div className="text-sm text-muted-foreground pl-6">
                            {event.venue}
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base leading-relaxed">
                        {event.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-24 text-primary-foreground">
        <div className="absolute inset-0 bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end gradient-animate opacity-95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,oklch(var(--accent)/0.15),transparent_70%)]" />
        
        <div className="container relative mx-auto px-4 text-center">
          <div className="animate-on-scroll mx-auto max-w-3xl space-y-6">
            <h2 className="text-4xl font-extrabold md:text-5xl tracking-tight">
              Want to Stay Updated?
            </h2>
            <p className="text-xl text-primary-foreground/85 leading-relaxed">
              Contact us to learn more about our upcoming events and how you can participate
            </p>
            <Button
              size="lg"
              className="group relative overflow-hidden bg-accent text-accent-foreground hover:bg-accent/90 shadow-accent-glow hover:shadow-glow-lg transition-all duration-500 hover:scale-110 hover:-translate-y-2 px-10 py-7 text-xl font-bold"
              onClick={() => window.location.href = '/contact'}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="relative">Get in Touch</span>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
