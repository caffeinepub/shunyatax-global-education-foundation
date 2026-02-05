import { useState } from 'react';
import { useAdminQueries } from '@/hooks/useAdminQueries';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Plus, Edit, Trash2, Heart, Search } from 'lucide-react';
import { toast } from 'sonner';
import { ExternalBlob } from '@/backend';
import type { ImpactStory } from '@/backend';

export default function ControlImpact() {
  const { useGetAllImpactStories, useAddImpactStory, useUpdateImpactStory, useDeleteImpactStory } = useAdminQueries();
  const { data: stories, isLoading } = useGetAllImpactStories();
  const addStory = useAddImpactStory();
  const updateStory = useUpdateImpactStory();
  const deleteStory = useDeleteImpactStory();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState<ImpactStory | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    story: '',
    published: true,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      story: '',
      published: true,
    });
    setImageFile(null);
  };

  const handleAdd = async () => {
    if (!formData.title || !formData.story) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      let imageBlob: ExternalBlob | null = null;
      if (imageFile) {
        const arrayBuffer = await imageFile.arrayBuffer();
        imageBlob = ExternalBlob.fromBytes(new Uint8Array(arrayBuffer));
      }

      await addStory.mutateAsync({
        title: formData.title,
        story: formData.story,
        image: imageBlob,
      });

      toast.success('Impact story added successfully');
      setIsAddDialogOpen(false);
      resetForm();
    } catch (error) {
      toast.error('Failed to add impact story');
      console.error(error);
    }
  };

  const handleEdit = async () => {
    if (!selectedStory || !formData.title || !formData.story) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      let imageBlob: ExternalBlob | null = selectedStory.image || null;
      if (imageFile) {
        const arrayBuffer = await imageFile.arrayBuffer();
        imageBlob = ExternalBlob.fromBytes(new Uint8Array(arrayBuffer));
      }

      await updateStory.mutateAsync({
        id: selectedStory.id,
        title: formData.title,
        story: formData.story,
        image: imageBlob,
        published: formData.published,
      });

      toast.success('Impact story updated successfully');
      setIsEditDialogOpen(false);
      setSelectedStory(null);
      resetForm();
    } catch (error) {
      toast.error('Failed to update impact story');
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (!selectedStory) return;

    try {
      await deleteStory.mutateAsync(selectedStory.id);
      toast.success('Impact story deleted successfully');
      setIsDeleteDialogOpen(false);
      setSelectedStory(null);
    } catch (error) {
      toast.error('Failed to delete impact story');
      console.error(error);
    }
  };

  const openEditDialog = (story: ImpactStory) => {
    setSelectedStory(story);
    setFormData({
      title: story.title,
      story: story.story,
      published: story.published,
    });
    setIsEditDialogOpen(true);
  };

  const filteredStories = stories?.filter(story =>
    story.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Impact Stories Management</h1>
          <p className="text-muted-foreground mt-1">Manage success stories and testimonials</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-gradient-to-r from-primary to-accent hover:shadow-glow transition-all duration-300">
              <Plus className="h-4 w-4" />
              Add Story
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add Impact Story</DialogTitle>
              <DialogDescription>Share a success story or testimonial</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Story title"
                />
              </div>
              <div>
                <Label htmlFor="story">Story *</Label>
                <Textarea
                  id="story"
                  value={formData.story}
                  onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                  placeholder="Share the impact story..."
                  rows={6}
                />
              </div>
              <div>
                <Label htmlFor="image">Image</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => { setIsAddDialogOpen(false); resetForm(); }}>
                Cancel
              </Button>
              <Button onClick={handleAdd} disabled={addStory.isPending}>
                {addStory.isPending ? 'Adding...' : 'Add Story'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search stories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Stories Grid */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground mt-4">Loading stories...</p>
        </div>
      ) : filteredStories && filteredStories.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {filteredStories.map((story, index) => (
            <Card
              key={story.id}
              className="border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardHeader>
                {story.image && (
                  <div className="w-full h-48 rounded-lg overflow-hidden mb-4">
                    <img
                      src={story.image.getDirectURL()}
                      alt={story.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{story.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {story.published ? (
                        <span className="text-primary">Published</span>
                      ) : (
                        <span className="text-muted-foreground">Draft</span>
                      )}
                    </CardDescription>
                  </div>
                  <Heart className="h-5 w-5 text-accent" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-4">{story.story}</p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => openEditDialog(story)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:bg-destructive/10"
                    onClick={() => {
                      setSelectedStory(story);
                      setIsDeleteDialogOpen(true);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
          <CardContent className="text-center py-12">
            <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No impact stories found</p>
          </CardContent>
        </Card>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Impact Story</DialogTitle>
            <DialogDescription>Update story information</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-title">Title *</Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-story">Story *</Label>
              <Textarea
                id="edit-story"
                value={formData.story}
                onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                rows={6}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="edit-published">Published</Label>
              <Switch
                id="edit-published"
                checked={formData.published}
                onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
              />
            </div>
            <div>
              <Label htmlFor="edit-image">Image</Label>
              <Input
                id="edit-image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setIsEditDialogOpen(false); resetForm(); }}>
              Cancel
            </Button>
            <Button onClick={handleEdit} disabled={updateStory.isPending}>
              {updateStory.isPending ? 'Updating...' : 'Update Story'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Impact Story</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{selectedStory?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              {deleteStory.isPending ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
