import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Calendar, Image, Users, Heart, TrendingUp } from 'lucide-react';
import { useAdminQueries } from '@/hooks/useAdminQueries';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

export default function ControlDashboard() {
  const { useGetDashboardStats } = useAdminQueries();
  const { data: stats, isLoading } = useGetDashboardStats();

  const dashboardCards = [
    {
      title: 'Programs',
      value: stats ? Number(stats.totalPrograms) : 0,
      icon: BookOpen,
      color: 'from-primary/15 to-accent/15',
      textColor: 'text-primary',
      link: '/control/programs',
      description: 'Educational programs',
    },
    {
      title: 'Events',
      value: stats ? Number(stats.totalEvents) : 0,
      icon: Calendar,
      color: 'from-accent/15 to-secondary/15',
      textColor: 'text-accent',
      link: '/control/events',
      description: 'Total events',
    },
    {
      title: 'Gallery Images',
      value: 0,
      icon: Image,
      color: 'from-secondary/15 to-primary/15',
      textColor: 'text-secondary',
      link: '/control/gallery',
      description: 'Gallery photos',
    },
    {
      title: 'Team Members',
      value: stats ? Number(stats.totalTeamMembers) : 0,
      icon: Users,
      color: 'from-primary/15 to-accent/15',
      textColor: 'text-primary',
      link: '/control/team',
      description: 'Team members',
    },
    {
      title: 'Impact Stories',
      value: stats ? Number(stats.totalImpactStories) : 0,
      icon: Heart,
      color: 'from-accent/15 to-primary/15',
      textColor: 'text-accent',
      link: '/control/impact',
      description: 'Success stories',
    },
    {
      title: 'Upcoming Events',
      value: stats ? Number(stats.totalUpcomingEvents) : 0,
      icon: TrendingUp,
      color: 'from-secondary/15 to-accent/15',
      textColor: 'text-secondary',
      link: '/control/events',
      description: 'Scheduled events',
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
          Control Panel Dashboard
        </h1>
        <p className="text-muted-foreground text-lg">
          Manage all aspects of the Shunyatax Global Education Foundation website
        </p>
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
              onClick={() => window.location.href = '/control/programs'}
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
              onClick={() => window.location.href = '/control/events'}
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
              onClick={() => window.location.href = '/control/gallery'}
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
              onClick={() => window.location.href = '/control/team'}
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
              onClick={() => window.location.href = '/control/impact'}
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
              onClick={() => window.location.href = '/'}
            >
              <TrendingUp className="h-6 w-6 mb-2 text-secondary" />
              <div className="text-left">
                <div className="font-semibold">View Website</div>
                <div className="text-xs text-muted-foreground">See public site</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="border-border/50 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome to Control Panel</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            This is your centralized management hub for the Shunyatax Global Education Foundation website. 
            From here, you can manage all content including programs, events, gallery images, team members, and impact stories.
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="p-3 rounded-lg bg-card/50 border border-border/50">
              <h3 className="font-semibold text-sm mb-1">Full CRUD Operations</h3>
              <p className="text-xs text-muted-foreground">Create, read, update, and delete all content types</p>
            </div>
            <div className="p-3 rounded-lg bg-card/50 border border-border/50">
              <h3 className="font-semibold text-sm mb-1">Real-time Updates</h3>
              <p className="text-xs text-muted-foreground">Changes reflect immediately on the public website</p>
            </div>
            <div className="p-3 rounded-lg bg-card/50 border border-border/50">
              <h3 className="font-semibold text-sm mb-1">Secure Access</h3>
              <p className="text-xs text-muted-foreground">Protected by Internet Identity authentication</p>
            </div>
            <div className="p-3 rounded-lg bg-card/50 border border-border/50">
              <h3 className="font-semibold text-sm mb-1">Responsive Design</h3>
              <p className="text-xs text-muted-foreground">Manage content from any device</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
