import { LoginForm } from '@/components/forms/login';
import { Card } from '@/components/ui/card';
import { createFileRoute } from '@tanstack/react-router';
import { fallback, zodValidator } from '@tanstack/zod-adapter';
import { z } from 'zod';

const loginSearchSchema = z.object({
  redirect: fallback(z.string(), '/').default('/'),
});

export const Route = createFileRoute('/login')({
  component: RouteComponent,
  validateSearch: zodValidator(loginSearchSchema),
});

function RouteComponent() {
  const { redirect } = Route.useSearch();

  return (
    <div className="w-full">
      <Card className="border-border/25 mx-auto mt-12 max-w-sm">
        <LoginForm redirect={redirect} />
      </Card>
    </div>
  );
}
