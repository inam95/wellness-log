import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { zodValidator, fallback } from '@tanstack/zod-adapter';
import { z } from 'zod';
import { useForm } from '@tanstack/react-form';
import { signUpSchema } from '@/lib/schemas/auth.schema';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { FieldInfo } from '@/components/field-info';
import { Button } from '@/components/ui/button';
import { authApi } from '@/lib/api/auth/auth.api';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '@/store/auth/auth.slice';

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
      email: '',
      password: '',
      confirmPassword: '',
    },
    validators: {
      onChange: signUpSchema,
    },
    onSubmit: async ({ value }) => {
      const response = await authApi.signup(value.email, value.password, value.confirmPassword);
      await navigate({ to: redirect });
      dispatch(loginSuccess(response.data!));
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
    <div className="w-full">
      <Card className="border-border/25 mx-auto mt-12 max-w-sm">
        <form
          onSubmit={e => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <CardHeader>
            <CardTitle className="text-center text-2xl">Signup</CardTitle>
            <CardDescription>Enter your details below to create an account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <form.Field
                name="email"
                children={field => (
                  <div className="grid gap-2">
                    <Label htmlFor={field.name}>Username</Label>
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
              <form.Field
                name="password"
                children={field => (
                  <div className="grid gap-2">
                    <Label htmlFor={field.name}>Password</Label>
                    <Input
                      type="password"
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
              <form.Field
                name="confirmPassword"
                children={field => (
                  <div className="grid gap-2">
                    <Label htmlFor={field.name}>Confirm Password</Label>
                    <Input
                      type="password"
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
              {/* <form.Subscribe
                selector={state => [state.errorMap]}
                children={([errorMap]) =>
                  errorMap.onSubmit ? <p className="text-destructive text-sm font-medium">{errorMap.onSubmit}</p> : null
                }
              /> */}

              <form.Subscribe
                selector={state => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <Button type="submit" disabled={!canSubmit} className="w-full">
                    {isSubmitting ? '...' : 'Signup'}
                  </Button>
                )}
              />
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}
