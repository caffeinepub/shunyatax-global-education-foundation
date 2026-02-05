import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Image as ImageIcon, BookOpen } from 'lucide-react';
import { useAdminQueries } from '@/hooks/useAdminQueries';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import { ExternalBlob } from '@/backend';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

export default function AdminPrograms() {
  const { useGetAllPrograms, useAddProgram, useUpdateProgram, useDeleteProgram } = useAdminQueries();
  const { data: programs, isLoading } = useGetAllPrograms();
  const addProgramMutation = useAddProgram();
  const updateProgramMutation = useUpdateProgram();
  const deleteProgramMutation = useDeleteProgram();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [programToDelete, setProgramToDelete] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    objectives: '',
    outcomes: '',
    imageFile: null as File | null,
  });

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: '',
      objectives: '',
      outcomes: '',
      imageFile: null,
    });
    setEditingProgram(null);
  };

  const handleEdit = (program: any) => {
    setEditingProgram(program);
    setFormData({
      title: program.title,
      description: program.description,
      category: program.category,
      objectives: program.objectives.join('\n'),
      outcomes: program.outcomes.join('\n'),
      imageFile: null,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.description || !formData.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const objectives = formData.objectives.split('\n').filter(o => o.trim());
      const outcomes = formData.outcomes.split('\n').filter(o => o.trim());
      
      let imageBlob: ExternalBlob | null = null;
      if (formData.imageFile) {
        const arrayBuffer = await formData.imageFile.arrayBuffer();
        imageBlob = ExternalBlob.fromBytes(new Uint8Array(arrayBuffer));
      }

      if (editingProgram) {
        await updateProgramMutation.mutateAsync({
          id: editingProgram.id,
          title: formData.title,
          description: formData.description,
          category: formData.category,
          objectives,
          outcomes,
          image: imageBlob || editingProgram.image || null,
        });
        toast.success('Program updated successfully');
      } else {
        await addProgramMutation.mutateAsync({
          title: formData.title,
          description: formData.description,
          category: formData.category,
          objectives,
          outcomes,
          image: imageBlob,
        });
        toast.success('Program added successfully');
      }

      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast.error('Failed to save program');
    }
  };

  const handleDelete = async () => {
    if (!programToDelete) return;

    try {
      await deleteProgramMutation.mutateAsync(programToDelete);
      toast.success('Program deleted successfully');
      setDeleteDialogOpen(false);
      setProgramToDelete(null);
    } catch (error) {
      toast.error('Failed to delete program');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Programs Management</h1>
          <p className="text-muted-foreground">Manage educational programs and initiatives</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-accent to-accent/95 hover:from-accent/90 hover:to-accent shadow-accent-glow">
              <Plus className="h-4 w-4 mr-2" />
              Add Program
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProgram ? 'Edit Program' : 'Add New Program'}</DialogTitle>
              <DialogDescription>
                {editingProgram ? 'Update program information' : 'Create a new educational program'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Program title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g., Primary Education, Literacy"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Program description"
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="objectives">Objectives (one per line)</Label>
                <Textarea
                  id="objectives"
                  value={formData.objectives}
                  onChange={(e) => setFormData({ ...formData, objectives: e.target.value })}
                  placeholder="Enter objectives, one per line"
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="outcomes">Outcomes (one per line)</Label>
                <Textarea
                  id="outcomes"
                  value={formData.outcomes}
                  onChange={(e) => setFormData({ ...formData, outcomes: e.target.value })}
                  placeholder="Enter outcomes, one per line"
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Program Image</Label>
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
                  disabled={addProgramMutation.isPending || updateProgramMutation.isPending}
                  className="bg-gradient-to-r from-accent to-accent/95"
                >
                  {(addProgramMutation.isPending || updateProgramMutation.isPending) ? 'Saving...' : 'Save Program'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="border-border/50">
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : programs && programs.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => (
            <Card key={program.id} className="border-border/50 bg-card/80 backdrop-blur-sm hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1">{program.title}</CardTitle>
                    <CardDescription className="text-xs">{program.category}</CardDescription>
                  </div>
                  {program.image && (
                    <div className="ml-2 flex-shrink-0">
                      <ImageIcon className="h-5 w-5 text-primary" />
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-3">{program.description}</p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(program)}
                    className="flex-1"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setProgramToDelete(program.id);
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
            <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">No programs yet</p>
            <Button onClick={() => setIsDialogOpen(true)} className="bg-gradient-to-r from-accent to-accent/95">
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Program
            </Button>
          </CardContent>
        </Card>
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the program.
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
