export const FREE_CREDITS = 2;
export const PLAN_CREDITS = 7;
export const CREDITS_RESET_DAYS = 7;
export const REFERRAL_BONUS_WEEKLY = 3;
export const REFERRAL_BONUS_YEARLY = 20;

export interface SubscriptionStatus {
  isPro: boolean;
  plan: 'weekly' | 'yearly' | null;
  creditsRemaining: number;
  creditsResetAt: string | null;
  periodEnd: string | null;
  referralCode: string | null;
}

export async function fetchSubscriptionStatus(): Promise<SubscriptionStatus> {
  try {
    const res = await fetch('/api/subscription');
    if (!res.ok) return defaultStatus();
    return res.json();
  } catch {
    return defaultStatus();
  }
}

function defaultStatus(): SubscriptionStatus {
  return { isPro: false, plan: null, creditsRemaining: 0, creditsResetAt: null, periodEnd: null, referralCode: null };
}

export function canRender(status: SubscriptionStatus): boolean {
  return status.creditsRemaining > 0;
}
