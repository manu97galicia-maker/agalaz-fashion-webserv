export const FREE_RENDER_LIMIT = 1;

export interface SubscriptionStatus {
  isPro: boolean;
  plan: 'weekly' | 'yearly' | null;
  totalRenders: number;
  periodEnd: string | null;
}

export async function fetchSubscriptionStatus(): Promise<SubscriptionStatus> {
  try {
    const res = await fetch('/api/subscription');
    if (!res.ok) return { isPro: false, plan: null, totalRenders: 0, periodEnd: null };
    return res.json();
  } catch {
    return { isPro: false, plan: null, totalRenders: 0, periodEnd: null };
  }
}

export function canRender(status: SubscriptionStatus): boolean {
  if (status.isPro) return true;
  return status.totalRenders < FREE_RENDER_LIMIT;
}

export function getRemainingFreeRenders(status: SubscriptionStatus): number {
  if (status.isPro) return Infinity;
  return Math.max(0, FREE_RENDER_LIMIT - status.totalRenders);
}
