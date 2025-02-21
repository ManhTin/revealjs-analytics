import { cn } from "@/lib/utils";
import { type LucideProps, Plus } from "lucide-react";
import Link from "next/link";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import { buttonVariants } from "./ui/button";
import { Separator } from "./ui/separator";

interface HeaderProps {
  title: string;
  action?: {
    path: string;
    label: string;
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  };
}

export default function Header({ title, action }: HeaderProps) {
  return (
    <>
      <div className="flex items-start justify-between">
        <h2 className="text-2xl">{title}</h2>
        {action && (
          <Link href={action.path} className={cn(buttonVariants(), "text-xs md:text-sm")}>
            <action.icon className="h-4 w-4" /> {action.label}
          </Link>
        )}
      </div>
      <Separator />
    </>
  );
}
