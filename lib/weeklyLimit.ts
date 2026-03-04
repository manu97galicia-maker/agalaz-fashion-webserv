const STORAGE_KEY = 'agalaz-weekly-renders';
export const WEEKLY_RENDER_LIMIT = 10;

interface WeeklyRenderData {
  weekId: string;
  count: number;
}

function getCurrentWeekId(): string {
  const now = new Date();
  const jan1 = new Date(now.getFullYear(), 0, 1);
  const dayOfYear = Math.ceil((now.getTime() - jan1.getTime()) / 86400000);
  const weekNumber = Math.ceil((dayOfYear + jan1.getDay()) / 7);
  return `${now.getFullYear()}-W${String(weekNumber).padStart(2, '0')}`;
}

function getData(): WeeklyRenderData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { weekId: getCurrentWeekId(), count: 0 };
    const parsed: WeeklyRenderData = JSON.parse(raw);
    if (parsed.weekId !== getCurrentWeekId()) {
      return { weekId: getCurrentWeekId(), count: 0 };
    }
    return parsed;
  } catch {
    return { weekId: getCurrentWeekId(), count: 0 };
  }
}

function saveData(data: WeeklyRenderData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // silently fail if localStorage unavailable
  }
}

export function getWeeklyRenderCount(): number {
  return getData().count;
}

export function getRemainingRenders(): number {
  return Math.max(0, WEEKLY_RENDER_LIMIT - getData().count);
}

export function incrementRenderCount(): number {
  const data = getData();
  data.count += 1;
  saveData(data);
  return data.count;
}

export function hasReachedWeeklyLimit(): boolean {
  return getData().count >= WEEKLY_RENDER_LIMIT;
}
