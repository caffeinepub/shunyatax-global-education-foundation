import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { Principal } from '@icp-sdk/core/principal';

export function useAdminRoleManagement() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  const associateEmail = useMutation({
    mutationFn: async (data: { email: string; principal: Principal }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.associateEmailWithPrincipal(data.email, data.principal);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminRole'] });
    },
  });

  const grantAdminByEmail = useMutation({
    mutationFn: async (data: { email: string; emailPrincipal: Principal }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.grantAdminRoleByEmail(data.email, data.emailPrincipal);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminRole'] });
    },
  });

  return {
    associateEmail,
    grantAdminByEmail,
  };
}
