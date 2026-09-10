import AdminLoginForm from "@/components/AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <div className="mx-auto flex max-w-sm flex-col items-center gap-6 px-5 py-24">
      <h1 className="text-xl font-bold">관리자 로그인</h1>
      <AdminLoginForm />
    </div>
  );
}
