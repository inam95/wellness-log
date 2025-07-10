import { SignUpForm } from '@/components/forms/sign-up';
import { Card } from '@/components/ui/card';
import { createFileRoute } from '@tanstack/react-router';
import { fallback, zodValidator } from '@tanstack/zod-adapter';
import { z } from 'zod';

const signUpSearchSchema = z.object({
  redirect: fallback(z.string(), '/').default('/'),
});

export const Route = createFileRoute('/sign-up')({
  component: RouteComponent,
  validateSearch: zodValidator(signUpSearchSchema),
});

function RouteComponent() {
  const { redirect } = Route.useSearch();

  return (
    <div className="w-full">
      <Card className="border-border/25 mx-auto mt-12 max-w-sm">
        <SignUpForm redirect={redirect} />
      </Card>
    </div>
  );
}
