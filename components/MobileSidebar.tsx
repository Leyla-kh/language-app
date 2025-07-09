import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Sidebar } from "./Sidebar";

export const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-white" />
      </SheetTrigger>
      <SheetContent side="left">
        <SheetTitle className="text-muted-foreground m-5 text-center">
          Menu
        </SheetTitle>
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};
