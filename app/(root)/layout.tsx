import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { getUserDetails } from "@/lib/actions/auth.action";

const Layout = async ({ children }: { children: ReactNode }) => {
  const user = await getUserDetails();
  if (!user) redirect("/start");

  return (
    <div className="root-layout">
      {/* <nav>
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="PrepBuddy Logo" width={38} height={32} />
          <h2 ><span className="text-primary-100">Prep</span><span className="text-orange-200">Buddy</span></h2>
        </Link>
      </nav> */}
      <nav className="flex justify-between items-center p-4 border-b border-border">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="MockMate Logo" width={38} height={32} />
          <h2><span className="text-primary-100">Prep</span><span className="text-orange-200">Buddy</span></h2>
        </Link>
        <Sidebar user={user} />
      </nav>
      

      {children}
    </div>
  );
};

export default Layout;