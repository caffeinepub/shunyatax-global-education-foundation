import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Program, TeamMember, ImpactStory, ContactForm, Donation, Event } from '../backend';

export function useQueries() {
  const { actor, isFetching } = useActor();
  const queryClient = useQueryClient();

  // Programs
  const useGetAllPrograms = () => {
    return useQuery<Program[]>({
      queryKey: ['programs'],
      queryFn: async () => {
        try {
          if (!actor) {
            console.warn('Actor not available for getAllPrograms');
            return [];
          }
          const result = await actor.getAllPrograms();
          return Array.isArray(result) ? result : [];
        } catch (error) {
          console.error('Error fetching programs:', error);
          return [];
        }
      },
      enabled: !!actor && !isFetching,
      retry: 2,
      retryDelay: 1000,
      staleTime: 30000,
    });
  };

  const useGetProgramsByCategory = (category: string) => {
    return useQuery<Program[]>({
      queryKey: ['programs', category],
      queryFn: async () => {
        try {
          if (!actor || !category) {
            console.warn('Actor or category not available');
            return [];
          }
          const result = await actor.getProgramsByCategory(category);
          return Array.isArray(result) ? result : [];
        } catch (error) {
          console.error('Error fetching programs by category:', error);
          return [];
        }
      },
      enabled: !!actor && !isFetching && !!category,
      retry: 2,
      retryDelay: 1000,
      staleTime: 30000,
    });
  };

  // Team Members
  const useGetAllTeamMembers = () => {
    return useQuery<TeamMember[]>({
      queryKey: ['teamMembers'],
      queryFn: async () => {
        try {
          if (!actor) {
            console.warn('Actor not available for getAllTeamMembers');
            return [];
          }
          const result = await actor.getAllTeamMembers();
          return Array.isArray(result) ? result : [];
        } catch (error) {
          console.error('Error fetching team members:', error);
          return [];
        }
      },
      enabled: !!actor && !isFetching,
      retry: 2,
      retryDelay: 1000,
      staleTime: 30000,
    });
  };

  // Impact Stories
  const useGetAllImpactStories = () => {
    return useQuery<ImpactStory[]>({
      queryKey: ['impactStories'],
      queryFn: async () => {
        try {
          if (!actor) {
            console.warn('Actor not available for getAllImpactStories');
            return [];
          }
          const result = await actor.getAllImpactStories();
          return Array.isArray(result) ? result : [];
        } catch (error) {
          console.error('Error fetching impact stories:', error);
          return [];
        }
      },
      enabled: !!actor && !isFetching,
      retry: 2,
      retryDelay: 1000,
      staleTime: 30000,
    });
  };

  // Events
  const useGetAllEvents = () => {
    return useQuery<Event[]>({
      queryKey: ['events'],
      queryFn: async () => {
        try {
          if (!actor) {
            console.warn('Actor not available for getAllEvents');
            return [];
          }
          const result = await actor.getAllEvents();
          return Array.isArray(result) ? result : [];
        } catch (error) {
          console.error('Error fetching events:', error);
          return [];
        }
      },
      enabled: !!actor && !isFetching,
      retry: 2,
      retryDelay: 1000,
      staleTime: 30000,
    });
  };

  const useGetUpcomingEvents = () => {
    return useQuery<Event[]>({
      queryKey: ['events', 'upcoming'],
      queryFn: async () => {
        try {
          if (!actor) {
            console.warn('Actor not available for getUpcomingEvents');
            return [];
          }
          const result = await actor.getUpcomingEvents();
          return Array.isArray(result) ? result : [];
        } catch (error) {
          console.error('Error fetching upcoming events:', error);
          return [];
        }
      },
      enabled: !!actor && !isFetching,
      retry: 2,
      retryDelay: 1000,
      staleTime: 30000,
    });
  };

  const useGetPastEvents = () => {
    return useQuery<Event[]>({
      queryKey: ['events', 'past'],
      queryFn: async () => {
        try {
          if (!actor) {
            console.warn('Actor not available for getPastEvents');
            return [];
          }
          const result = await actor.getPastEvents();
          return Array.isArray(result) ? result : [];
        } catch (error) {
          console.error('Error fetching past events:', error);
          return [];
        }
      },
      enabled: !!actor && !isFetching,
      retry: 2,
      retryDelay: 1000,
      staleTime: 30000,
    });
  };

  // Contact Form
  const useSubmitContactForm = () => {
    return useMutation({
      mutationFn: async ({ name, email, message }: { name: string; email: string; message: string }) => {
        try {
          if (!actor) throw new Error('Actor not initialized');
          if (!name || !email || !message) {
            throw new Error('All fields are required');
          }
          const result = await actor.submitContactForm(name, email, message);
          return result;
        } catch (error) {
          console.error('Error submitting contact form:', error);
          throw error;
        }
      },
      onSuccess: () => {
        try {
          queryClient.invalidateQueries({ queryKey: ['contactForms'] });
        } catch (error) {
          console.error('Error invalidating contact forms cache:', error);
        }
      },
      retry: 1,
    });
  };

  // Donations
  const useAddDonation = () => {
    return useMutation({
      mutationFn: async ({ name, amount, message }: { name: string; amount: number; message: string }) => {
        try {
          if (!actor) throw new Error('Actor not initialized');
          if (!name || amount <= 0) {
            throw new Error('Invalid donation data');
          }
          const result = await actor.addDonation(name, amount, message || '');
          return result;
        } catch (error) {
          console.error('Error adding donation:', error);
          throw error;
        }
      },
      onSuccess: () => {
        try {
          queryClient.invalidateQueries({ queryKey: ['donations'] });
        } catch (error) {
          console.error('Error invalidating donations cache:', error);
        }
      },
      retry: 1,
    });
  };

  return {
    useGetAllPrograms,
    useGetProgramsByCategory,
    useGetAllTeamMembers,
    useGetAllImpactStories,
    useGetAllEvents,
    useGetUpcomingEvents,
    useGetPastEvents,
    useSubmitContactForm,
    useAddDonation,
  };
}
