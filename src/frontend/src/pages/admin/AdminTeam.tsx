import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, User } from 'lucide-react';
import { useAdminQueries } from '@/hooks/useAdminQueries';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import { ExternalBlob } from '@/backend';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Switch } from '@/components/ui/switch';

export default function AdminTeam() {
  const { useGetAllTeamMembers, useAddTeamMember, useUpdateTeamMember, useDeleteTeamMember } = useAdminQueries();
  const { data: teamMembers, isLoading } = useGetAllTeamMembers();
  const addTeamMemberMutation = useAddTeamMember();
  const updateTeamMemberMutation = useUpdateTeamMember();
  const deleteTeamMemberMutation = useDeleteTeamMember();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    bio: '',
    displayOrder: 0,
    visible: true,
    photoFile: null as File | null,
  });

  const resetForm = () => {
    setFormData({
      name: '',
      role: '',
      bio: '',
      displayOrder: 0,
      visible: true,
      photoFile: null,
    });
    setEditingMember(null);
  };

  const handleEdit = (member: any) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      role: member.role,
      bio: member.bio,
      displayOrder: Number(member.displayOrder),
      visible: member.visible,
      photoFile: null,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.role) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      let photoBlob: ExternalBlob | null = null;
      if (formData.photoFile) {
        const arrayBuffer = await formData.photoFile.arrayBuffer();
        photoBlob = ExternalBlob.fromBytes(new Uint8Array(arrayBuffer));
      }

      if (editingMember) {
        await updateTeamMemberMutation.mutateAsync({
          id: editingMember.id,
          name: formData.name,
          role: formData.role,
          bio: formData.bio,
          displayOrder: BigInt(formData.displayOrder),
          visible: formData.visible,
          photo: photoBlob || editingMember.photo || null,
        });
        toast.success('Team member updated successfully');
      } else {
        await addTeamMemberMutation.mutateAsync({
          name: formData.name,
          role: formData.role,
          bio: formData.bio,
          displayOrder: BigInt(formData.displayOrder),
          photo: photoBlob,
        });
        toast.success('Team member added successfully');
      }

      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast.error('Failed to save team member');
    }
  };

  const handleDelete = async () => {
    if (!memberToDelete) return;

    try {
      await deleteTeamMemberMutation.mutateAsync(memberToDelete);
      toast.success('Team member deleted successfully');
      setDeleteDialogOpen(false);
      setMemberToDelete(null);
    } catch (error) {
      toast.error('Failed to delete team member');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Team Management</h1>
          <p className="text-muted-foreground">Manage team members and their information</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-accent to-accent/95 hover:from-accent/90 hover:to-accent shadow-accent-glow">
              <Plus className="h-4 w-4 mr-2" />
              Add Team Member
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingMember ? 'Edit Team Member' : 'Add New Team Member'}</DialogTitle>
              <DialogDescription>
                {editingMember ? 'Update team member information' : 'Add a new team member'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role *</Label>
                <Input
                  id="role"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="e.g., Executive Director, Program Manager"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Brief biography"
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="displayOrder">Display Order</Label>
                <Input
                  id="displayOrder"
                  type="number"
                  value={formData.displayOrder}
                  onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })}
                  placeholder="0"
                />
              </div>
              {editingMember && (
                <div className="flex items-center space-x-2">
                  <Switch
                    id="visible"
                    checked={formData.visible}
                    onCheckedChange={(checked) => setFormData({ ...formData, visible: checked })}
                  />
                  <Label htmlFor="visible">Visible on website</Label>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="photo">Photo</Label>
                <Input
                  id="photo"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFormData({ ...formData, photoFile: e.target.files?.[0] || null })}
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleSubmit}
                  disabled={addTeamMemberMutation.isPending || updateTeamMemberMutation.isPending}
                  className="bg-gradient-to-r from-accent to-accent/95"
                >
                  {(addTeamMemberMutation.isPending || updateTeamMemberMutation.isPending) ? 'Saving...' : 'Save Member'}
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
      ) : teamMembers && teamMembers.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <Card key={member.id} className="border-border/50 bg-card/80 backdrop-blur-sm hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1">{member.name}</CardTitle>
                    <CardDescription className="text-xs">{member.role}</CardDescription>
                  </div>
                  {member.photo ? (
                    <div className="ml-2 flex-shrink-0">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                  ) : null}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-3">{member.bio}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>Order: {Number(member.displayOrder)}</span>
                  <span>•</span>
                  <span className={member.visible ? 'text-primary' : 'text-destructive'}>
                    {member.visible ? 'Visible' : 'Hidden'}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(member)}
                    className="flex-1"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setMemberToDelete(member.id);
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
            <User className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">No team members yet</p>
            <Button onClick={() => setIsDialogOpen(true)} className="bg-gradient-to-r from-accent to-accent/95">
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Team Member
            </Button>
          </CardContent>
        </Card>
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the team member.
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
