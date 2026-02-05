import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Heart, Users, BookOpen, Award, CheckCircle2 } from 'lucide-react';
import { useQueries } from '@/hooks/useQueries';
import { toast } from 'sonner';

const donationLevels = [
  {
    amount: 25,
    title: 'Supporter',
    description: 'Provide school supplies for one student',
    icon: BookOpen,
  },
  {
    amount: 50,
    title: 'Contributor',
    description: 'Fund a week of meals for a student',
    icon: Heart,
  },
  {
    amount: 100,
    title: 'Advocate',
    description: 'Sponsor a month of education',
    icon: Award,
  },
  {
    amount: 250,
    title: 'Champion',
    description: 'Support a full semester for a student',
    icon: Users,
  },
];

const impactAreas = [
  'Education programs and scholarships',
  'Learning materials and resources',
  'Teacher training and development',
  'Infrastructure and facilities',
  'Community outreach initiatives',
  'Technology and digital learning',
];

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const { useAddDonation } = useQueries();
  const addDonationMutation = useAddDonation();

  const handleDonate = async () => {
    const amount = selectedAmount || parseFloat(customAmount);
    if (!amount || amount <= 0) {
      toast.error('Please enter a valid donation amount');
      return;
    }
    if (!name.trim()) {
      toast.error('Please enter your name');
      return;
    }

    try {
      await addDonationMutation.mutateAsync({
        name: name.trim(),
        amount,
        message: message.trim(),
      });
      toast.success('Thank you for your generous donation!');
      setSelectedAmount(null);
      setCustomAmount('');
      setName('');
      setMessage('');
    } catch (error) {
      toast.error('Failed to process donation. Please try again.');
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
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 text-primary-foreground">
        <div className="absolute inset-0 bg-gradient-to-br from-gradient-start via-gradient-mid to-gradient-end gradient-animate" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,oklch(var(--accent)/0.15),transparent_70%)]" />
        
        <div className="container relative mx-auto px-4">
          <div className="animate-on-scroll mx-auto max-w-3xl text-center">
            <Badge className="mb-4 bg-accent/95 text-accent-foreground shadow-accent-glow">Make a Difference</Badge>
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">Support Our Mission</h1>
            <p className="text-lg text-primary-foreground/80 leading-relaxed">
              Your generous contribution helps us provide quality education and create opportunities for those who need
              it most.
            </p>
          </div>
        </div>
      </section>

      {/* Donation Levels */}
      <section className="bg-background py-20">
        <div className="container mx-auto px-4">
          <div className="animate-on-scroll mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">Choose Your Impact</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Select a donation level or enter a custom amount to support our programs.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {donationLevels.map((level, index) => (
              <Card
                key={index}
                className={`animate-on-scroll group cursor-pointer border-2 bg-card/80 backdrop-blur-sm transition-all duration-500 hover:-translate-y-3 ${
                  selectedAmount === level.amount
                    ? 'border-primary shadow-glow bg-primary/5'
                    : 'border-border/50 hover:border-primary/40 hover:shadow-glow'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => {
                  setSelectedAmount(level.amount);
                  setCustomAmount('');
                }}
              >
                <CardHeader>
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-glow">
                    <level.icon className="h-7 w-7" />
                  </div>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      ${level.amount}
                    </CardTitle>
                    {selectedAmount === level.amount && (
                      <CheckCircle2 className="h-6 w-6 text-primary animate-in scale-in" />
                    )}
                  </div>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">{level.title}</Badge>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">{level.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="relative overflow-hidden bg-gradient-to-b from-secondary/30 to-background py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,oklch(var(--primary)/0.04),transparent_50%)]" />
        
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-2xl">
            <Card className="animate-on-scroll border-border/50 bg-card/80 backdrop-blur-sm shadow-glow">
              <CardHeader>
                <CardTitle className="text-2xl">Complete Your Donation</CardTitle>
                <CardDescription>Fill in your details to make a difference today.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="custom-amount">Custom Amount (USD)</Label>
                  <Input
                    id="custom-amount"
                    type="number"
                    placeholder="Enter amount"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(null);
                    }}
                    min="1"
                    step="1"
                    className="transition-all duration-300 focus:ring-2 focus:ring-primary/40"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="donor-name">Your Name *</Label>
                  <Input
                    id="donor-name"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="transition-all duration-300 focus:ring-2 focus:ring-primary/40"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message (Optional)</Label>
                  <Textarea
                    id="message"
                    placeholder="Share why you're supporting our mission..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="transition-all duration-300 focus:ring-2 focus:ring-primary/40"
                  />
                </div>
                <Button
                  className="w-full bg-gradient-to-r from-accent to-accent/95 hover:from-accent/90 hover:to-accent shadow-accent-glow hover:shadow-glow-lg transition-all duration-300"
                  size="lg"
                  onClick={handleDonate}
                  disabled={addDonationMutation.isPending}
                >
                  {addDonationMutation.isPending ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-accent-foreground border-t-transparent" />
                      Processing...
                    </span>
                  ) : (
                    'Donate Now'
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact Areas */}
      <section className="bg-background py-20">
        <div className="container mx-auto px-4">
          <div className="animate-on-scroll mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">Where Your Money Goes</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Your donation directly supports these critical areas of our work.
            </p>
          </div>
          <div className="mx-auto max-w-3xl">
            <div className="grid gap-4 md:grid-cols-2">
              {impactAreas.map((area, index) => (
                <div
                  key={index}
                  className="animate-on-scroll group flex items-start gap-3 rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm p-5 transition-all duration-300 hover:bg-accent/5 hover:border-primary/40 hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 p-1.5 transition-transform duration-300 group-hover:scale-110">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-foreground leading-relaxed">{area}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer CTA */}
      <section className="relative overflow-hidden py-20 text-primary-foreground">
        <div className="absolute inset-0 bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end gradient-animate" />
        
        <div className="container relative mx-auto px-4 text-center">
          <div className="animate-on-scroll mx-auto max-w-3xl space-y-6">
            <h2 className="text-3xl font-bold md:text-4xl">Want to Get Involved?</h2>
            <p className="text-lg text-primary-foreground/80 leading-relaxed">
              Beyond donations, we welcome volunteers who want to make a hands-on difference in our communities.
            </p>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary-foreground/25 bg-primary-foreground/8 text-primary-foreground backdrop-blur-md hover:bg-primary-foreground/15 hover:border-primary-foreground/40 transition-all duration-300"
            >
              Learn About Volunteering
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

