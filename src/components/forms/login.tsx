import { FieldInfo } from '@/components/field-info';
import { Button } from '@/components/ui/button';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authApi } from '@/lib/api/auth/auth.api';
import { loginSchema } from '@/lib/schemas/auth.schema';
import { loginSuccess } from '@/store/auth/auth.slice';
import { useForm } from '@tanstack/react-form';
import { useNavigate } from '@tanstack/react-router';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

interface LoginFormProps {
  redirect: string;
}

export function LoginForm({ redirect }: LoginFormProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onChange: loginSchema,
    },
    onSubmit: async ({ value }) => {
      const response = await authApi.login(value.email, value.password);
      dispatch(loginSuccess(response.data!));

      await new Promise(resolve => setTimeout(resolve, 100));

      await navigate({ to: redirect });
      if (response.success) {
        return null;
      } else {
        toast.error('Login failed', {
          position: 'bottom-right',
        });
      }
    },
  });

  console.log(form.state.errors);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <CardHeader>
        <CardTitle className="text-center text-2xl">Login</CardTitle>
        <CardDescription>Enter your details below to login</CardDescription>
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
                {isSubmitting ? '...' : 'Login'}
              </Button>
            )}
          />
        </div>
      </CardContent>
    </form>
  );
}
