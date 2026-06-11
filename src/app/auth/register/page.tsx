import AuthSidePanel from "@/components/auth/AuthSidePanel";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black">
      <div className="grid min-h-screen lg:grid-cols-2">
        <AuthSidePanel />
        <RegisterForm />
      </div>
    </main>
  );
}
