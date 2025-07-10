import type { ReactNode } from 'react';

type AuthLayoutProps = {
  children: ReactNode;
  title: string;
  subtitle: string;
};

export const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="bg-gradient-subtle flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="bg-gradient-primary shadow-soft mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl">
            <span className="text-primary-foreground text-2xl font-bold">W</span>
          </div>
          <h1 className="text-foreground mb-2 text-3xl font-bold">{title}</h1>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>

        {/* Form Card */}
        <div className="bg-card shadow-card border-border rounded-2xl border p-8">{children}</div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-muted-foreground text-sm">Made with 💚 for your wellness journey</p>
        </div>
      </div>
    </div>
  );
};
