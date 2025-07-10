import { EmptyState } from '@/components/empty-state';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { WellnessLogCard } from '@/components/wellness-log-card';
import { logsApi } from '@/lib/api/wellness-logs/logs.api';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Filter, Loader2, Plus, Search } from 'lucide-react';
import { useState } from 'react';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: logs, isLoading } = useQuery({
    queryKey: ['logs'],
    queryFn: () => logsApi.getLogs(),
  });

  const filteredLogs =
    logs?.data?.filter(log => log.activityNotes.toLowerCase().includes(searchQuery.toLowerCase())) ?? [];

  return (
    <>
      {isLoading ? (
        <div className="flex h-full items-center justify-center">
          <Loader2 className="h-4 w-4 animate-spin" />
        </div>
      ) : (
        <>
          <div className="mb-6 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
              <Input
                placeholder="Search your wellness logs..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="text-foreground pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="text-muted-foreground">
                <Filter className="h-4 w-4" />
              </Button>
              <Link to="/create-log">
                <Button variant="wellness" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Log
                </Button>
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            {filteredLogs.length === 0 ? (
              searchQuery ? (
                <EmptyState
                  title="No logs found"
                  description={`No wellness logs match "${searchQuery}". Try adjusting your search.`}
                  icon={Search}
                  action={
                    <Button onClick={() => setSearchQuery('')} variant="outline">
                      Clear Search
                    </Button>
                  }
                />
              ) : (
                <EmptyState
                  title="Start your wellness journey"
                  description="Create your first wellness log to begin tracking your mood, sleep, and activities."
                  icon={Plus}
                  action={
                    <Link to="/create-log">
                      <Button variant="wellness">Create Your First Log</Button>
                    </Link>
                  }
                />
              )
            ) : (
              <div className="grid gap-4">
                {filteredLogs.map(log => (
                  <WellnessLogCard key={log.id} log={log} />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
