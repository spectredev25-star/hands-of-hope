import { ReactNode } from "react";
import Link from "next/link";
import { requireRole } from "@/libs/auth/authorize";
export default async function AdminLayout({children}:{children:ReactNode}) {
 await requireRole(["admin"]);
 return <div className="min-h-screen bg-slate-50 text-slate-900">
  <header className="border-b bg-white p-5"><nav className="mx-auto flex max-w-6xl flex-wrap items-center gap-5"><Link href="/admin" className="font-bold text-teal-800">Hands of Hope · Admin</Link><Link href="/admin">Review contributions</Link><Link href="/admin/requests">Beneficiary requests</Link><Link href="/">Home</Link></nav></header>
  <main className="mx-auto max-w-6xl p-6">{children}</main>
 </div>;
}
