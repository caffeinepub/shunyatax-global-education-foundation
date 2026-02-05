import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, Heart, Calendar, DollarSign, Mail, TrendingUp, UserPlus, Loader2 } from 'lucide-react';
import { useAdminQueries } from '@/hooks/useAdminQueries';
import { useAdminRoleManagement } from '@/hooks/useAdminRoleManagement';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { normalizeAuthError } from '@/utils/authorizationErrors';
import { Principal } from '@icp-sdk/core/principal';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function AdminDashboard() {
  const { useGetDashboardStats, useGetAllContactForms } = useAdminQueries();
  const { grantAdminByEmail } = useAdminRoleManagement();

  const { data: stats, isLoading: statsLoading } = useGetDashboardStats();
  const { data: contacts, isLoading: contactsLoading } = useGetAllContactForms();

  const [grantEmail, setGrantEmail] = useState('');
  const [grantPrincipal, setGrantPrincipal] = useState('');
  const [isGranting, setIsGranting] = useState(false);

  const dashboardStats = [
    {
      title: 'Programs',
      value: stats ? Number(stats.totalPrograms) : 0,
      icon: BookOpen,
      color: 'from-primary/15 to-accent/15',
      textColor: 'text-primary',
      loading: statsLoading,
    },
    {
      title: 'Team Members',
      value: stats ? Number(stats.totalTeamMembers) : 0,
      icon: Users,
      color: 'from-secondary/15 to-primary/15',
      textColor: 'text-secondary',
      loading: statsLoading,
    },
    {
      title: 'Impact Stories',
      value: stats ? Number(stats.totalImpactStories) : 0,
      icon: Heart,
      color: 'from-accent/15 to-secondary/15',
      textColor: 'text-accent',
      loading: statsLoading,
    },
    {
      title: 'Total Events',
      value: stats ? Number(stats.totalEvents) : 0,
      icon: Calendar,
      color: 'from-primary/15 to-accent/15',
      textColor: 'text-primary',
      loading: statsLoading,
    },
    {
      title: 'Upcoming Events',
      value: stats ? Number(stats.totalUpcomingEvents) : 0,
      icon: Calendar,
      color: 'from-accent/15 to-primary/15',
      textColor: 'text-accent',
      loading: statsLoading,
    },
    {
      title: 'Total Donations',
      value: stats ? Number(stats.totalDonations) : 0,
      icon: DollarSign,
      color: 'from-primary/15 to-accent/15',
      textColor: 'text-primary',
      loading: statsLoading,
    },
    {
      title: 'Contact Messages',
      value: stats ? Number(stats.totalContactForms) : 0,
      icon: Mail,
      color: 'from-secondary/15 to-accent/15',
      textColor: 'text-secondary',
      loading: statsLoading,
    },
    {
      title: 'Unread Messages',
      value: contacts?.filter(c => !c.read).length || 0,
      icon: TrendingUp,
      color: 'from-accent/15 to-primary/15',
      textColor: 'text-accent',
      loading: contactsLoading,
    },
  ];

  const handleGrantAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!grantEmail || !grantEmail.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (!grantPrincipal) {
      toast.error('Please enter the principal ID');
      return;
    }

    setIsGranting(true);
    try {
      const principal = Principal.fromText(grantPrincipal);
      await grantAdminByEmail.mutateAsync({
        email: grantEmail,
        emailPrincipal: principal,
      });
      toast.success(`Admin rights granted to ${grantEmail}`);
      setGrantEmail('');
      setGrantPrincipal('');
    } catch (error) {
      console.error('Grant admin error:', error);
      toast.error(normalizeAuthError(error));
    } finally {
      setIsGranting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the admin panel. Here's an overview of your content.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {dashboardStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card 
              key={index}
              className="border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`rounded-lg bg-gradient-to-br ${stat.color} p-2`}>
                  <Icon className={`h-5 w-5 ${stat.textColor}`} />
                </div>
              </CardHeader>
              <CardContent>
                {stat.loading ? (
                  <Skeleton className="h-8 w-20" />
                ) : (
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <a href="/admin-panel/programs" className="block p-3 rounded-lg border border-border/50 hover:bg-accent/5 transition-colors">
              <div className="font-medium text-foreground">Manage Programs</div>
              <div className="text-sm text-muted-foreground">Add, edit, or remove educational programs</div>
            </a>
            <a href="/admin-panel/events" className="block p-3 rounded-lg border border-border/50 hover:bg-accent/5 transition-colors">
              <div className="font-medium text-foreground">Manage Events</div>
              <div className="text-sm text-muted-foreground">Create and manage upcoming events</div>
            </a>
            <a href="/admin-panel/team" className="block p-3 rounded-lg border border-border/50 hover:bg-accent/5 transition-colors">
              <div className="font-medium text-foreground">Manage Team</div>
              <div className="text-sm text-muted-foreground">Update team member information</div>
            </a>
            <a href="/admin-panel/impact-stories" className="block p-3 rounded-lg border border-border/50 hover:bg-accent/5 transition-colors">
              <div className="font-medium text-foreground">Manage Impact Stories</div>
              <div className="text-sm text-muted-foreground">Share success stories and testimonials</div>
            </a>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates and submissions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {contactsLoading ? (
              <>
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </>
            ) : contacts && contacts.length > 0 ? (
              contacts.slice(0, 3).map((contact) => (
                <div key={contact.id} className="p-3 rounded-lg border border-border/50 bg-accent/5">
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-medium text-foreground text-sm">{contact.name}</div>
                    {!contact.read && (
                      <span className="text-xs bg-primary/15 text-primary px-2 py-0.5 rounded-full">New</span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">{contact.email}</div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">No recent activity</div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Grant Admin Access Section */}
      <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-primary" />
            <CardTitle>Grant Admin Access</CardTitle>
          </div>
          <CardDescription>
            Grant admin privileges to users who have associated their email with their Internet Identity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4">
            <AlertDescription className="text-sm">
              <strong>Prerequisites:</strong> The user must first log in with Internet Identity and associate their email address with their principal. Only then can you grant them admin rights using this form.
            </AlertDescription>
          </Alert>
          
          <form onSubmit={handleGrantAdmin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="grantEmail" className="text-foreground font-semibold">
                Email Address
              </Label>
              <Input
                id="grantEmail"
                type="email"
                placeholder="nikhil44soni7@gmail.com"
                value={grantEmail}
                onChange={(e) => setGrantEmail(e.target.value)}
                className="h-11 border-border/50 focus:border-primary focus:ring-primary"
                disabled={isGranting}
                required
              />
              <p className="text-xs text-muted-foreground">
                The email that was associated by the user
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="grantPrincipal" className="text-foreground font-semibold">
                Principal ID
              </Label>
              <Input
                id="grantPrincipal"
                type="text"
                placeholder="xxxxx-xxxxx-xxxxx-xxxxx-xxx"
                value={grantPrincipal}
                onChange={(e) => setGrantPrincipal(e.target.value)}
                className="h-11 border-border/50 focus:border-primary focus:ring-primary font-mono text-sm"
                disabled={isGranting}
                required
              />
              <p className="text-xs text-muted-foreground">
                The Internet Identity principal of the user
              </p>
            </div>

            <Button
              type="submit"
              className="w-full h-11 text-base font-semibold bg-gradient-to-r from-primary via-gradient-mid to-gradient-end hover:shadow-glow-lg transition-all duration-300"
              disabled={isGranting}
            >
              {isGranting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Granting Admin Rights...
                </>
              ) : (
                <>
                  <UserPlus className="mr-2 h-5 w-5" />
                  Grant Admin Rights
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
