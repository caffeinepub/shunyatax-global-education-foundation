import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Heart, Eye, EyeOff } from 'lucide-react';
import { useAdminQueries } from '@/hooks/useAdminQueries';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import { ExternalBlob } from '@/backend';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Switch } from '@/components/ui/switch';

export default function AdminImpactStories() {
  const { useGetAllImpactStories, useAddImpactStory, useUpdateImpactStory, useDeleteImpactStory } = useAdminQueries();
  const { data: stories, isLoading } = useGetAllImpactStories();
  const addStoryMutation = useAddImpactStory();
  const updateStoryMutation = useUpdateImpactStory();
  const deleteStoryMutation = useDeleteImpactStory();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStory, setEditingStory] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [storyToDelete, setStoryToDelete] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    story: '',
    published: false,
    imageFile: null as File | null,
  });

  const resetForm = () => {
    setFormData({
      title: '',
      story: '',
      published: false,
      imageFile: null,
    });
    setEditingStory(null);
  };

  const handleEdit = (story: any) => {
    setEditingStory(story);
    setFormData({
      title: story.title,
      story: story.story,
      published: story.published,
      imageFile: null,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.story) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      let imageBlob: ExternalBlob | null = null;
      if (formData.imageFile) {
        const arrayBuffer = await formData.imageFile.arrayBuffer();
        imageBlob = ExternalBlob.fromBytes(new Uint8Array(arrayBuffer));
      }

      if (editingStory) {
        await updateStoryMutation.mutateAsync({
          id: editingStory.id,
          title: formData.title,
          story: formData.story,
          published: formData.published,
          image: imageBlob || editingStory.image || null,
        });
        toast.success('Impact story updated successfully');
      } else {
        await addStoryMutation.mutateAsync({
          title: formData.title,
          story: formData.story,
          image: imageBlob,
        });
        toast.success('Impact story added successfully');
      }

      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast.error('Failed to save impact story');
    }
  };

  const handleDelete = async () => {
    if (!storyToDelete) return;

    try {
      await deleteStoryMutation.mutateAsync(storyToDelete);
      toast.success('Impact story deleted successfully');
      setDeleteDialogOpen(false);
      setStoryToDelete(null);
    } catch (error) {
      toast.error('Failed to delete impact story');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Impact Stories</h1>
          <p className="text-muted-foreground">Share success stories and testimonials</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-accent to-accent/95 hover:from-accent/90 hover:to-accent shadow-accent-glow">
              <Plus className="h-4 w-4 mr-2" />
              Add Story
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingStory ? 'Edit Impact Story' : 'Add New Impact Story'}</DialogTitle>
              <DialogDescription>
                {editingStory ? 'Update impact story' : 'Share a new success story'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Story title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="story">Story *</Label>
                <Textarea
                  id="story"
                  value={formData.story}
                  onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                  placeholder="Tell the impact story..."
                  rows={8}
                />
              </div>
              {editingStory && (
                <div className="flex items-center space-x-2">
                  <Switch
                    id="published"
                    checked={formData.published}
                    onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                  />
                  <Label htmlFor="published">Published (visible on website)</Label>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="image">Story Image</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFormData({ ...formData, imageFile: e.target.files?.[0] || null })}
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleSubmit}
                  disabled={addStoryMutation.isPending || updateStoryMutation.isPending}
                  className="bg-gradient-to-r from-accent to-accent/95"
                >
                  {(addStoryMutation.isPending || updateStoryMutation.isPending) ? 'Saving...' : 'Save Story'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2">
          {[1, 2].map((i) => (
            <Card key={i} className="border-border/50">
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-32 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : stories && stories.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {stories.map((story) => (
            <Card key={story.id} className="border-border/50 bg-card/80 backdrop-blur-sm hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{story.title}</CardTitle>
                    <div className="flex items-center gap-2">
                      {story.published ? (
                        <span className="flex items-center gap-1 text-xs text-primary">
                          <Eye className="h-3 w-3" />
                          Published
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <EyeOff className="h-3 w-3" />
                          Draft
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-4">{story.story}</p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(story)}
                    className="flex-1"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setStoryToDelete(story.id);
                      setDeleteDialogOpen(true);
                    }}
                    className="flex-1 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/40"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Heart className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">No impact stories yet</p>
            <Button onClick={() => setIsDialogOpen(true)} className="bg-gradient-to-r from-accent to-accent/95">
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Story
            </Button>
          </CardContent>
        </Card>
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the impact story.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
