import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

export const Promo = () => {
  return (
    <div className="border-2 rounded-xl p-4 space-y-4">
      <div className="space-y-2">
        <div className="flex items-center gap-x-2">
          <Image src="/images/heart-2.png" width={30} height={30} alt="Pro" />
          <h3 className="font-bold text-lg">Upgrade to Pro</h3>
        </div>
        <p className="text-muted-foreground">Get unlimited hearts and more!</p>
      </div>

      <Button asChild variant="super" size="lg" className="w-full">
        <Link href="/shop">Upgrade today</Link>
      </Button>
    </div>
  );
};
