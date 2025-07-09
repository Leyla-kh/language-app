"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { usePathname } from "next/navigation";

type ItemProps = {
  iconSrc: string;
  label: string;
  href: string;
};

export const SidebarItem = ({ iconSrc, label, href }: ItemProps) => {
  const pathName = usePathname();
  const active = pathName === href;

  return (
    <Button
      variant={active ? "sidebarOutline" : "sidebar"}
      className="justify-start h-[52px]"
      asChild
    >
      <Link href={href}>
        <Image
          src={iconSrc}
          width={32}
          height={32}
          alt={label}
          className="mr-5"
        />
        {label}
      </Link>
    </Button>
  );
};
