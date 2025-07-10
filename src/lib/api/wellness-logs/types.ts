export type Mood = 'happy' | 'stressed' | 'tired' | 'focused';

export interface Log {
  id: string;
  date: string;
  mood: Mood;
  sleepDuration: number;
  activityNotes: string;
  createdAt: string;
}
