import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Calendar, Image, Users, Heart, TrendingUp, Globe, Shield } from 'lucide-react';
import { useAdminQueries } from '@/hooks/useAdminQueries';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function StandaloneControlDashboard() {
  const { useGetDashboardStats } = useAdminQueries();
  const { data: stats, isLoading } = useGetDashboardStats();

  const dashboardCards = [
    {
      title: 'Programs',
      value: stats ? Number(stats.totalPrograms) : 0,
      icon: BookOpen,
      color: 'from-primary/15 to-accent/15',
      textColor: 'text-primary',
      link: '/programs',
      description: 'Educational programs',
    },
    {
      title: 'Events',
      value: stats ? Number(stats.totalEvents) : 0,
      icon: Calendar,
      color: 'from-accent/15 to-secondary/15',
      textColor: 'text-accent',
      link: '/events',
      description: 'Total events',
    },
    {
      title: 'Gallery Images',
      value: 0,
      icon: Image,
      color: 'from-secondary/15 to-primary/15',
      textColor: 'text-secondary',
      link: '/gallery',
      description: 'Gallery photos',
    },
    {
      title: 'Team Members',
      value: stats ? Number(stats.totalTeamMembers) : 0,
      icon: Users,
      color: 'from-primary/15 to-accent/15',
      textColor: 'text-primary',
      link: '/team',
      description: 'Team members',
    },
    {
      title: 'Impact Stories',
      value: stats ? Number(stats.totalImpactStories) : 0,
      icon: Heart,
      color: 'from-accent/15 to-primary/15',
      textColor: 'text-accent',
      link: '/impact',
      description: 'Success stories',
    },
    {
      title: 'Upcoming Events',
      value: stats ? Number(stats.totalUpcomingEvents) : 0,
      icon: TrendingUp,
      color: 'from-secondary/15 to-accent/15',
      textColor: 'text-secondary',
      link: '/events',
      description: 'Scheduled events',
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header with Status Badge */}
      <div className="space-y-4">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Independent Control Panel
            </h1>
            <p className="text-muted-foreground text-lg">
              Centralized management for Shunyatax Global Education Foundation
            </p>
          </div>
          <Badge variant="outline" className="flex items-center gap-2 px-4 py-2">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span>Live & Synced</span>
          </Badge>
        </div>
        
        {/* Info Banner */}
        <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-full bg-primary/10 p-3">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm">Secure Independent Access</h3>
              <p className="text-xs text-muted-foreground">
                This control panel operates independently while maintaining real-time synchronization with the main website backend.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Statistics Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {dashboardCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Card
              key={index}
              className="border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-glow group cursor-pointer"
              onClick={() => window.location.href = card.link}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {card.title}
                  </CardTitle>
                  <CardDescription className="text-xs">{card.description}</CardDescription>
                </div>
                <div className={`rounded-lg bg-gradient-to-br ${card.color} p-3 transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className={`h-6 w-6 ${card.textColor}`} />
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-10 w-24" />
                ) : (
                  <div className="text-4xl font-bold text-foreground">{card.value}</div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Quick Actions</CardTitle>
          <CardDescription>Manage your content efficiently</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Button
              variant="outline"
              className="h-auto flex-col items-start p-4 hover:bg-primary/5 hover:border-primary/50 transition-all duration-300"
              onClick={() => window.location.href = '/programs'}
            >
              <BookOpen className="h-6 w-6 mb-2 text-primary" />
              <div className="text-left">
                <div className="font-semibold">Add Program</div>
                <div className="text-xs text-muted-foreground">Create new educational program</div>
              </div>
            </Button>
            <Button
              variant="outline"
              className="h-auto flex-col items-start p-4 hover:bg-accent/5 hover:border-accent/50 transition-all duration-300"
              onClick={() => window.location.href = '/events'}
            >
              <Calendar className="h-6 w-6 mb-2 text-accent" />
              <div className="text-left">
                <div className="font-semibold">Add Event</div>
                <div className="text-xs text-muted-foreground">Schedule new event</div>
              </div>
            </Button>
            <Button
              variant="outline"
              className="h-auto flex-col items-start p-4 hover:bg-secondary/5 hover:border-secondary/50 transition-all duration-300"
              onClick={() => window.location.href = '/gallery'}
            >
              <Image className="h-6 w-6 mb-2 text-secondary" />
              <div className="text-left">
                <div className="font-semibold">Upload Image</div>
                <div className="text-xs text-muted-foreground">Add to gallery</div>
              </div>
            </Button>
            <Button
              variant="outline"
              className="h-auto flex-col items-start p-4 hover:bg-primary/5 hover:border-primary/50 transition-all duration-300"
              onClick={() => window.location.href = '/team'}
            >
              <Users className="h-6 w-6 mb-2 text-primary" />
              <div className="text-left">
                <div className="font-semibold">Add Team Member</div>
                <div className="text-xs text-muted-foreground">Expand your team</div>
              </div>
            </Button>
            <Button
              variant="outline"
              className="h-auto flex-col items-start p-4 hover:bg-accent/5 hover:border-accent/50 transition-all duration-300"
              onClick={() => window.location.href = '/impact'}
            >
              <Heart className="h-6 w-6 mb-2 text-accent" />
              <div className="text-left">
                <div className="font-semibold">Add Story</div>
                <div className="text-xs text-muted-foreground">Share impact story</div>
              </div>
            </Button>
            <Button
              variant="outline"
              className="h-auto flex-col items-start p-4 hover:bg-secondary/5 hover:border-secondary/50 transition-all duration-300"
              onClick={() => window.open('https://shunyatax.org', '_blank')}
            >
              <Globe className="h-6 w-6 mb-2 text-secondary" />
              <div className="text-left">
                <div className="font-semibold">View Website</div>
                <div className="text-xs text-muted-foreground">See public site</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Features Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border/50 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl">Independent Domain Access</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              This control panel can be accessed from a separate domain (e.g., control.shunyatax.org) 
              while maintaining full functionality and real-time synchronization with the main website.
            </p>
            <div className="grid gap-2">
              <div className="flex items-start gap-2 text-sm">
                <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <span className="text-muted-foreground">Secure Internet Identity authentication</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <span className="text-muted-foreground">Real-time backend synchronization</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <span className="text-muted-foreground">Independent deployment capability</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-gradient-to-br from-accent/5 via-secondary/5 to-primary/5 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl">Full Management Capabilities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Complete CRUD operations for all content types with an intuitive interface 
              designed for efficient content management.
            </p>
            <div className="grid gap-2">
              <div className="flex items-start gap-2 text-sm">
                <div className="h-5 w-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="h-2 w-2 rounded-full bg-accent" />
                </div>
                <span className="text-muted-foreground">Programs, Events, and Gallery management</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <div className="h-5 w-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="h-2 w-2 rounded-full bg-accent" />
                </div>
                <span className="text-muted-foreground">Team members and Impact stories</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <div className="h-5 w-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="h-2 w-2 rounded-full bg-accent" />
                </div>
                <span className="text-muted-foreground">Responsive design for all devices</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
