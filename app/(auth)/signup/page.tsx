
import  AuthLayout  from "@/components/auth/auth-layout";
import SignupForm from "@/components/auth/signup-form";

export const metadata = {
  title: "Create Account | Hands of Hope",
  description:
    "Create your Hands of Hope account to discover resources, request assistance, and support your community.",
};

export default function SignupPage() {
  return (
    <AuthLayout>
      <SignupForm />
    </AuthLayout>
  );
}
