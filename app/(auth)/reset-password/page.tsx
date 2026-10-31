import AuthLayout from "@/components/auth/auth-layout";
import ResetPasswordForm from "@/components/auth/reset-password-form";

export const metadata = {
  title: "Reset Password | Hands of Hope",
  description: "Create a new password for your Hands of Hope account.",
};

export default function ResetPasswordPage() {
  return (
    <AuthLayout>
      <ResetPasswordForm />
    </AuthLayout>
  );
}