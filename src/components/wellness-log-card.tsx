import { Clock, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Log } from '@/lib/api/wellness-logs/types';
import { MOOD_CONFIG } from '@/lib/utils';

interface WellnessLogCardProps {
  log: Log;
}

export const WellnessLogCard = ({ log }: WellnessLogCardProps) => {
  const moodConfig = MOOD_CONFIG[log.mood];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined,
      });
    }
  };

  const getSleepColor = (hours: number) => {
    if (hours >= 8) return 'bg-green-500';
    if (hours >= 6) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Card className="shadow-card border-border hover:shadow-soft transition-all duration-300 hover:scale-[1.02]">
      <CardContent className="p-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          {/* Left Section - Date & Mood */}
          <div className="flex items-center gap-4">
            <div className="text-muted-foreground flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="text-sm font-medium">{formatDate(log.createdAt)}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-2xl" role="img" aria-label={moodConfig.label}>
                {moodConfig.emoji}
              </span>
              <Badge variant="secondary" className={`${moodConfig.color} font-medium`}>
                {moodConfig.label}
              </Badge>
            </div>
          </div>

          {/* Right Section - Sleep */}
          <div className="flex items-center gap-2">
            <Clock className="text-muted-foreground h-4 w-4" />
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="bg-muted h-2 w-16 overflow-hidden rounded-full">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${getSleepColor(log.sleepDuration)}`}
                    style={{ width: `${(log.sleepDuration / 12) * 100}%` }}
                  />
                </div>
                <span className="text-foreground text-sm font-medium">{log.sleepDuration}h</span>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Notes */}
        {log.activityNotes && (
          <div className="border-border mt-4 border-t pt-4">
            <p className="text-foreground text-sm leading-relaxed">{log.activityNotes}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
