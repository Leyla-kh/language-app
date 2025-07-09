import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
      <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
        <Button size="lg" variant="ghost">
          <Image
            src="/images/germany.png"
            width={40}
            height={40}
            alt="germany Flag"
            className="mr-4 rounded-md"
          />
          Germany
        </Button>
        <Button size="lg" variant="ghost">
          <Image
            src="/images/france.png"
            width={40}
            height={40}
            alt="France Flag"
            className="mr-4 rounded-md"
          />
          French
        </Button>
        <Button size="lg" variant="ghost">
          <Image
            src="/images/united-kingdom.png"
            width={40}
            height={40}
            alt="united kingdom Flag"
            className="mr-4 rounded-md"
          />
          UK
        </Button>
      </div>
    </footer>
  );
};
