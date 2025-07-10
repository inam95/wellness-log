import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/create-log')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/create-log"!</div>;
}
