// import Sidebar from "./components/Sidebar";

// export default function CRMLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="min-h-screen flex bg-[#FFF8F1]">
//       <aside className="w-64 bg-[#FDF6EE] border-r">
//         <Sidebar />
//       </aside>
//       <main className="flex-1 p-6">{children}</main>
//     </div>
//   );
// }

// import Sidebar from "./components/Sidebar";
// import "../globals.css";

// export default function CRMLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className="min-h-screen bg-[#FFF8F1]">
//         <div className="flex min-h-screen">
//           {/* Sidebar */}
//           <aside className="w-64 bg-[#FDF6EE] border-r">
//             <Sidebar />
//           </aside>

//           {/* CRM Content */}
//           <main className="flex-1 p-6 overflow-y-auto">
//             {children}
//           </main>
//         </div>
//       </body>
//     </html>
//   );
// }


"use client";

import { usePathname, useRouter } from "next/navigation";
import { Users, ShieldCheck, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from 'next/link';

const items = [
  { id: "users", label: "Users", icon: Users },
  { id: "kyc", label: "KYC Details", icon: ShieldCheck },
  { id: "offers", label: "Offers", icon: CreditCard },
];

export default function CRMLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  // handles /crm as default → users
  const active = pathname.split("/")[2] || "users";

  return (
    <div className="min-h-screen flex bg-[#FFF8F1]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#FDF6EE] border-r p-4">
        <div className="mb-8">
        <Link href="/" className="flex items-center space-x-2">
             <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="text-primary-foreground font-bold text-lg">V</span>
             </div>
             <span className="text-xl font-bold tracking-tight text-foreground">Vittam</span>
          </Link>
          </div>

        <div className="space-y-2">
          {items.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => router.push(`/crm/${id}`)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition",
                active === id
                  ? "bg-teal-600 text-white shadow"
                  : "hover:bg-teal-100 text-teal-700"
              )}
            >
              <Icon className="h-5 w-5" />
              {label}
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
