import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import type { UserRole } from '../backend';

export interface AdminAccessState {
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  role: UserRole | null;
  error: Error | null;
}

export function useAdminAccess(): AdminAccessState {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity, isInitializing } = useInternetIdentity();

  const isAuthenticated = !!identity && !identity.getPrincipal().isAnonymous();

  const { data: role, isLoading: roleLoading, error } = useQuery<UserRole>({
    queryKey: ['adminRole', identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserRole();
    },
    enabled: !!actor && !actorFetching && isAuthenticated,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const isAdmin = role === 'admin';
  const isLoading = isInitializing || actorFetching || (isAuthenticated && roleLoading);

  return {
    isLoading,
    isAuthenticated,
    isAdmin,
    role: role || null,
    error: error as Error | null,
  };
}
