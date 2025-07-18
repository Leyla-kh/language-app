import { MobileSidebar } from "@/components/MobileSidebar";

export const MobileHeader = () => {
  return (
    <nav
      className="lg:hidden px-6 h-[50px] flex items-center
         bg-yellow-400 border-b fixed top-0 w-full z-50"
    >
      <MobileSidebar />
    </nav>
  );
};
