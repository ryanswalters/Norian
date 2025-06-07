import { useAuth } from 'wasp/client/auth';

export default function useSubscription() {
  const { data: user } = useAuth();
  return {
    isSubscribed: user?.isSubscribed ?? false,
    demoMode: user?.demoMode ?? false,
  };
}
