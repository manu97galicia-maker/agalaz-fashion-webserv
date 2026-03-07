'use client';

import { useState, useEffect, useCallback } from 'react';
import { fetchSubscriptionStatus, type SubscriptionStatus } from './subscription';

export function useSubscription() {
  const [status, setStatus] = useState<SubscriptionStatus>({
    isPro: false,
    plan: null,
    creditsRemaining: 0,
    creditsResetAt: null,
    periodEnd: null,
    referralCode: null,
  });
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const s = await fetchSubscriptionStatus();
    setStatus(s);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { ...status, loading, refresh };
}
