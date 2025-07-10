import { AuthLayout } from '@/components/auth-layout';
import { FieldInfo } from '@/components/field-info';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authApi } from '@/lib/api/auth/auth.api';
import { signUpSchema } from '@/lib/schemas/auth.schema';
import { authSuccess } from '@/store/auth/auth.slice';
import { useForm } from '@tanstack/react-form';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { fallback, zodValidator } from '@tanstack/zod-adapter';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
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

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const form = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validators: {
      onChange: signUpSchema,
    },
    onSubmit: async ({ value }) => {
      const response = await authApi.signup(value.email, value.password, value.confirmPassword);
      dispatch(authSuccess(response.data!));
      await navigate({ to: redirect });
      if (response.success) {
        return null;
      } else {
        toast.error('Signup failed', {
          position: 'bottom-right',
        });
      }
    },
  });

  return (
    <AuthLayout title="Join Wellness" subtitle="Start tracking your wellness journey today">
      <form
        onSubmit={e => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-6"
      >
        <div className="space-y-2">
          <form.Field
            name="fullName"
            children={field => (
              <div className="grid gap-2">
                <Label htmlFor={field.name} className="text-foreground">
                  Full Name
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={e => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </div>
            )}
          />
        </div>
        <div className="space-y-2">
          <form.Field
            name="email"
            children={field => (
              <div className="grid gap-2">
                <Label htmlFor={field.name} className="text-foreground">
                  Username
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={e => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </div>
            )}
          />
        </div>
        <div className="space-y-2">
          <form.Field
            name="password"
            children={field => (
              <div className="grid gap-2">
                <Label htmlFor={field.name} className="text-foreground">
                  Password
                </Label>
                <Input
                  type="password"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={e => field.handleChange(e.target.value)}
                  className="text-foreground"
                />
                <FieldInfo field={field} />
              </div>
            )}
          />
        </div>
        <div className="space-y-2">
          <form.Field
            name="confirmPassword"
            children={field => (
              <div className="grid gap-2">
                <Label htmlFor={field.name} className="text-foreground">
                  Confirm Password
                </Label>
                <Input
                  type="password"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={e => field.handleChange(e.target.value)}
                  className="text-foreground"
                />
                <FieldInfo field={field} />
              </div>
            )}
          />
        </div>
        <form.Subscribe
          selector={state => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button type="submit" disabled={!canSubmit} className="w-full">
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Sign Up'}
            </Button>
          )}
        />
        <div className="space-y-2">
          <div className="text-center">
            <p className="text-muted-foreground text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:text-primary-glow font-medium transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
}
