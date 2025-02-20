import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { Separator } from "./ui/separator";

interface HeaderProps {
  title: string;
  actionPath?: string;
}

export default function Header({ title, actionPath }: HeaderProps) {
  return (
    <>
      <div className="flex items-start justify-between">
        <h2 className="text-2xl">{title}</h2>
        {actionPath && (
          <Link href={actionPath} className={cn(buttonVariants(), "text-xs md:text-sm")}>
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        )}
      </div>
      <Separator />
    </>
  );
}
