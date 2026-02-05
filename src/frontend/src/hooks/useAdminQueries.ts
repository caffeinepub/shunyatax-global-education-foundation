import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Program, TeamMember, ImpactStory, ContactForm, Donation, Event, ExternalBlob } from '../backend';

export function useAdminQueries() {
  const { actor, isFetching } = useActor();
  const queryClient = useQueryClient();

  // Programs
  const useGetAllPrograms = () => {
    return useQuery<Program[]>({
      queryKey: ['admin-programs'],
      queryFn: async () => {
        try {
          if (!actor) return [];
          const result = await actor.getAllPrograms();
          return result || [];
        } catch (error) {
          console.error('Error fetching admin programs:', error);
          return [];
        }
      },
      enabled: !!actor && !isFetching,
      retry: 2,
      retryDelay: 1000,
    });
  };

  const useAddProgram = () => {
    return useMutation({
      mutationFn: async (data: {
        title: string;
        description: string;
        category: string;
        objectives: string[];
        outcomes: string[];
        image: ExternalBlob | null;
      }) => {
        try {
          if (!actor) throw new Error('Actor not initialized');
          if (!data.title || !data.description || !data.category) {
            throw new Error('Required fields missing');
          }
          const result = await actor.addProgram(
            data.title,
            data.description,
            data.category,
            data.objectives || [],
            data.outcomes || [],
            data.image
          );
          return result;
        } catch (error) {
          console.error('Error adding program:', error);
          throw error;
        }
      },
      onSuccess: () => {
        try {
          queryClient.invalidateQueries({ queryKey: ['admin-programs'] });
          queryClient.invalidateQueries({ queryKey: ['programs'] });
        } catch (error) {
          console.error('Error invalidating programs cache:', error);
        }
      },
      retry: 1,
    });
  };

  const useUpdateProgram = () => {
    return useMutation({
      mutationFn: async (data: {
        id: string;
        title: string;
        description: string;
        category: string;
        objectives: string[];
        outcomes: string[];
        image: ExternalBlob | null;
      }) => {
        try {
          if (!actor) throw new Error('Actor not initialized');
          if (!data.id || !data.title || !data.description || !data.category) {
            throw new Error('Required fields missing');
          }
          const result = await actor.updateProgram(
            data.id,
            data.title,
            data.description,
            data.category,
            data.objectives || [],
            data.outcomes || [],
            data.image
          );
          return result;
        } catch (error) {
          console.error('Error updating program:', error);
          throw error;
        }
      },
      onSuccess: () => {
        try {
          queryClient.invalidateQueries({ queryKey: ['admin-programs'] });
          queryClient.invalidateQueries({ queryKey: ['programs'] });
        } catch (error) {
          console.error('Error invalidating programs cache:', error);
        }
      },
      retry: 1,
    });
  };

  const useDeleteProgram = () => {
    return useMutation({
      mutationFn: async (id: string) => {
        try {
          if (!actor) throw new Error('Actor not initialized');
          if (!id) throw new Error('Program ID required');
          const result = await actor.deleteProgram(id);
          return result;
        } catch (error) {
          console.error('Error deleting program:', error);
          throw error;
        }
      },
      onSuccess: () => {
        try {
          queryClient.invalidateQueries({ queryKey: ['admin-programs'] });
          queryClient.invalidateQueries({ queryKey: ['programs'] });
        } catch (error) {
          console.error('Error invalidating programs cache:', error);
        }
      },
      retry: 1,
    });
  };

  // Team Members
  const useGetAllTeamMembers = () => {
    return useQuery<TeamMember[]>({
      queryKey: ['admin-team'],
      queryFn: async () => {
        try {
          if (!actor) return [];
          const result = await actor.getAllTeamMembers();
          return result || [];
        } catch (error) {
          console.error('Error fetching admin team members:', error);
          return [];
        }
      },
      enabled: !!actor && !isFetching,
      retry: 2,
      retryDelay: 1000,
    });
  };

  const useAddTeamMember = () => {
    return useMutation({
      mutationFn: async (data: {
        name: string;
        role: string;
        bio: string;
        photo: ExternalBlob | null;
        displayOrder: bigint;
      }) => {
        try {
          if (!actor) throw new Error('Actor not initialized');
          if (!data.name || !data.role) {
            throw new Error('Name and role are required');
          }
          const result = await actor.addTeamMember(
            data.name,
            data.role,
            data.bio || '',
            data.photo,
            data.displayOrder || BigInt(0)
          );
          return result;
        } catch (error) {
          console.error('Error adding team member:', error);
          throw error;
        }
      },
      onSuccess: () => {
        try {
          queryClient.invalidateQueries({ queryKey: ['admin-team'] });
          queryClient.invalidateQueries({ queryKey: ['teamMembers'] });
        } catch (error) {
          console.error('Error invalidating team cache:', error);
        }
      },
      retry: 1,
    });
  };

  const useUpdateTeamMember = () => {
    return useMutation({
      mutationFn: async (data: {
        id: string;
        name: string;
        role: string;
        bio: string;
        photo: ExternalBlob | null;
        displayOrder: bigint;
        visible: boolean;
      }) => {
        try {
          if (!actor) throw new Error('Actor not initialized');
          if (!data.id || !data.name || !data.role) {
            throw new Error('Required fields missing');
          }
          const result = await actor.updateTeamMember(
            data.id,
            data.name,
            data.role,
            data.bio || '',
            data.photo,
            data.displayOrder || BigInt(0),
            data.visible !== false
          );
          return result;
        } catch (error) {
          console.error('Error updating team member:', error);
          throw error;
        }
      },
      onSuccess: () => {
        try {
          queryClient.invalidateQueries({ queryKey: ['admin-team'] });
          queryClient.invalidateQueries({ queryKey: ['teamMembers'] });
        } catch (error) {
          console.error('Error invalidating team cache:', error);
        }
      },
      retry: 1,
    });
  };

  const useDeleteTeamMember = () => {
    return useMutation({
      mutationFn: async (id: string) => {
        try {
          if (!actor) throw new Error('Actor not initialized');
          if (!id) throw new Error('Team member ID required');
          const result = await actor.deleteTeamMember(id);
          return result;
        } catch (error) {
          console.error('Error deleting team member:', error);
          throw error;
        }
      },
      onSuccess: () => {
        try {
          queryClient.invalidateQueries({ queryKey: ['admin-team'] });
          queryClient.invalidateQueries({ queryKey: ['teamMembers'] });
        } catch (error) {
          console.error('Error invalidating team cache:', error);
        }
      },
      retry: 1,
    });
  };

  // Impact Stories
  const useGetAllImpactStories = () => {
    return useQuery<ImpactStory[]>({
      queryKey: ['admin-impact-stories'],
      queryFn: async () => {
        try {
          if (!actor) return [];
          const result = await actor.getAllImpactStories();
          return result || [];
        } catch (error) {
          console.error('Error fetching admin impact stories:', error);
          return [];
        }
      },
      enabled: !!actor && !isFetching,
      retry: 2,
      retryDelay: 1000,
    });
  };

  const useAddImpactStory = () => {
    return useMutation({
      mutationFn: async (data: { title: string; story: string; image: ExternalBlob | null }) => {
        try {
          if (!actor) throw new Error('Actor not initialized');
          if (!data.title || !data.story) {
            throw new Error('Title and story are required');
          }
          const result = await actor.addImpactStory(data.title, data.story, data.image);
          return result;
        } catch (error) {
          console.error('Error adding impact story:', error);
          throw error;
        }
      },
      onSuccess: () => {
        try {
          queryClient.invalidateQueries({ queryKey: ['admin-impact-stories'] });
          queryClient.invalidateQueries({ queryKey: ['impactStories'] });
        } catch (error) {
          console.error('Error invalidating impact stories cache:', error);
        }
      },
      retry: 1,
    });
  };

  const useUpdateImpactStory = () => {
    return useMutation({
      mutationFn: async (data: {
        id: string;
        title: string;
        story: string;
        image: ExternalBlob | null;
        published: boolean;
      }) => {
        try {
          if (!actor) throw new Error('Actor not initialized');
          if (!data.id || !data.title || !data.story) {
            throw new Error('Required fields missing');
          }
          const result = await actor.updateImpactStory(
            data.id,
            data.title,
            data.story,
            data.image,
            data.published !== false
          );
          return result;
        } catch (error) {
          console.error('Error updating impact story:', error);
          throw error;
        }
      },
      onSuccess: () => {
        try {
          queryClient.invalidateQueries({ queryKey: ['admin-impact-stories'] });
          queryClient.invalidateQueries({ queryKey: ['impactStories'] });
        } catch (error) {
          console.error('Error invalidating impact stories cache:', error);
        }
      },
      retry: 1,
    });
  };

  const useDeleteImpactStory = () => {
    return useMutation({
      mutationFn: async (id: string) => {
        try {
          if (!actor) throw new Error('Actor not initialized');
          if (!id) throw new Error('Impact story ID required');
          const result = await actor.deleteImpactStory(id);
          return result;
        } catch (error) {
          console.error('Error deleting impact story:', error);
          throw error;
        }
      },
      onSuccess: () => {
        try {
          queryClient.invalidateQueries({ queryKey: ['admin-impact-stories'] });
          queryClient.invalidateQueries({ queryKey: ['impactStories'] });
        } catch (error) {
          console.error('Error invalidating impact stories cache:', error);
        }
      },
      retry: 1,
    });
  };

  // Events
  const useGetAllEvents = () => {
    return useQuery<Event[]>({
      queryKey: ['admin-events'],
      queryFn: async () => {
        try {
          if (!actor) return [];
          const result = await actor.getAllEvents();
          return result || [];
        } catch (error) {
          console.error('Error fetching admin events:', error);
          return [];
        }
      },
      enabled: !!actor && !isFetching,
      retry: 2,
      retryDelay: 1000,
    });
  };

  const useAddEvent = () => {
    return useMutation({
      mutationFn: async (data: {
        title: string;
        date: bigint;
        location: string;
        description: string;
        status: string;
        image: ExternalBlob | null;
        venue: string;
      }) => {
        try {
          if (!actor) throw new Error('Actor not initialized');
          if (!data.title || !data.date || !data.location || !data.description) {
            throw new Error('Required fields missing');
          }
          const result = await actor.addEvent(
            data.title,
            data.date,
            data.location,
            data.description,
            data.status || 'upcoming',
            data.image,
            data.venue || ''
          );
          return result;
        } catch (error) {
          console.error('Error adding event:', error);
          throw error;
        }
      },
      onSuccess: () => {
        try {
          queryClient.invalidateQueries({ queryKey: ['admin-events'] });
          queryClient.invalidateQueries({ queryKey: ['events'] });
        } catch (error) {
          console.error('Error invalidating events cache:', error);
        }
      },
      retry: 1,
    });
  };

  const useUpdateEvent = () => {
    return useMutation({
      mutationFn: async (data: {
        id: string;
        title: string;
        date: bigint;
        location: string;
        description: string;
        status: string;
        image: ExternalBlob | null;
        venue: string;
      }) => {
        try {
          if (!actor) throw new Error('Actor not initialized');
          if (!data.id || !data.title || !data.date || !data.location || !data.description) {
            throw new Error('Required fields missing');
          }
          const result = await actor.updateEvent(
            data.id,
            data.title,
            data.date,
            data.location,
            data.description,
            data.status || 'upcoming',
            data.image,
            data.venue || ''
          );
          return result;
        } catch (error) {
          console.error('Error updating event:', error);
          throw error;
        }
      },
      onSuccess: () => {
        try {
          queryClient.invalidateQueries({ queryKey: ['admin-events'] });
          queryClient.invalidateQueries({ queryKey: ['events'] });
        } catch (error) {
          console.error('Error invalidating events cache:', error);
        }
      },
      retry: 1,
    });
  };

  const useDeleteEvent = () => {
    return useMutation({
      mutationFn: async (id: string) => {
        try {
          if (!actor) throw new Error('Actor not initialized');
          if (!id) throw new Error('Event ID required');
          const result = await actor.deleteEvent(id);
          return result;
        } catch (error) {
          console.error('Error deleting event:', error);
          throw error;
        }
      },
      onSuccess: () => {
        try {
          queryClient.invalidateQueries({ queryKey: ['admin-events'] });
          queryClient.invalidateQueries({ queryKey: ['events'] });
        } catch (error) {
          console.error('Error invalidating events cache:', error);
        }
      },
      retry: 1,
    });
  };

  // Dashboard Stats
  const useGetDashboardStats = () => {
    return useQuery({
      queryKey: ['admin-dashboard-stats'],
      queryFn: async () => {
        try {
          if (!actor) return null;
          const result = await actor.getDashboardStats();
          return result || null;
        } catch (error) {
          console.error('Error fetching dashboard stats:', error);
          return null;
        }
      },
      enabled: !!actor && !isFetching,
      retry: 2,
      retryDelay: 1000,
    });
  };

  // Contact Forms
  const useGetAllContactForms = () => {
    return useQuery<ContactForm[]>({
      queryKey: ['admin-contacts'],
      queryFn: async () => {
        try {
          if (!actor) return [];
          const result = await actor.getAllContactForms();
          return result || [];
        } catch (error) {
          console.error('Error fetching admin contact forms:', error);
          return [];
        }
      },
      enabled: !!actor && !isFetching,
      retry: 2,
      retryDelay: 1000,
    });
  };

  const useMarkContactForm = () => {
    return useMutation({
      mutationFn: async (data: { id: string; read: boolean }) => {
        try {
          if (!actor) throw new Error('Actor not initialized');
          if (!data.id) throw new Error('Contact form ID required');
          const result = await actor.markContactFormAsRead(data.id, data.read);
          return result;
        } catch (error) {
          console.error('Error marking contact form:', error);
          throw error;
        }
      },
      onSuccess: () => {
        try {
          queryClient.invalidateQueries({ queryKey: ['admin-contacts'] });
        } catch (error) {
          console.error('Error invalidating contacts cache:', error);
        }
      },
      retry: 1,
    });
  };

  const useDeleteContactForm = () => {
    return useMutation({
      mutationFn: async (id: string) => {
        try {
          if (!actor) throw new Error('Actor not initialized');
          if (!id) throw new Error('Contact form ID required');
          const result = await actor.deleteContactForm(id);
          return result;
        } catch (error) {
          console.error('Error deleting contact form:', error);
          throw error;
        }
      },
      onSuccess: () => {
        try {
          queryClient.invalidateQueries({ queryKey: ['admin-contacts'] });
        } catch (error) {
          console.error('Error invalidating contacts cache:', error);
        }
      },
      retry: 1,
    });
  };

  // Donations
  const useGetAllDonations = () => {
    return useQuery<Donation[]>({
      queryKey: ['admin-donations'],
      queryFn: async () => {
        try {
          if (!actor) return [];
          const result = await actor.getAllDonations();
          return result || [];
        } catch (error) {
          console.error('Error fetching admin donations:', error);
          return [];
        }
      },
      enabled: !!actor && !isFetching,
      retry: 2,
      retryDelay: 1000,
    });
  };

  return {
    useGetAllPrograms,
    useAddProgram,
    useUpdateProgram,
    useDeleteProgram,
    useGetAllTeamMembers,
    useAddTeamMember,
    useUpdateTeamMember,
    useDeleteTeamMember,
    useGetAllImpactStories,
    useAddImpactStory,
    useUpdateImpactStory,
    useDeleteImpactStory,
    useGetAllEvents,
    useAddEvent,
    useUpdateEvent,
    useDeleteEvent,
    useGetDashboardStats,
    useGetAllContactForms,
    useMarkContactForm,
    useDeleteContactForm,
    useGetAllDonations,
  };
}
