import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AccountSidebar } from "@/components/layout/account-sidebar";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="container mx-auto flex-1 px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[220px_1fr]">
          <aside className="hidden md:block">
            <AccountSidebar />
          </aside>
          <main>{children}</main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
