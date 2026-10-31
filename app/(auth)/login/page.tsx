import AuthLayout from "@/components/auth/auth-layout";
import LoginForm from "@/components/auth/login-form";

export const metadata = {
  title: "Sign In | Hands of Hope",
  description: "Sign in to your Hands of Hope account.",
};

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}