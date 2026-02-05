import { Card, CardContent } from '@/components/ui/card';
import { Image as ImageIcon } from 'lucide-react';

export default function ControlGallery() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Gallery Management</h1>
        <p className="text-muted-foreground mt-1">Manage gallery images</p>
      </div>

      <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
        <CardContent className="text-center py-12">
          <ImageIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Gallery Management Coming Soon</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Gallery image management functionality will be available in a future update. 
            Currently, gallery images are managed through static assets.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
