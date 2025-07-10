import { FieldInfo } from '@/components/field-info';
import { Button } from '@/components/ui/button';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authApi } from '@/lib/api/auth/auth.api';
import { signUpSchema } from '@/lib/schemas/auth.schema';
import { loginSuccess } from '@/store/auth/auth.slice';
import { useForm } from '@tanstack/react-form';
import { useNavigate } from '@tanstack/react-router';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

interface SignUpFormProps {
  redirect: string;
}

export function SignUpForm({ redirect }: SignUpFormProps) {
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
      dispatch(loginSuccess(response.data!));

      await new Promise(resolve => setTimeout(resolve, 100));

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
  );
}
