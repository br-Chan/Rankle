import { SheetClose } from "@/components/ui/sheet";
import Link from "next/link";
import { FC } from "react";

export interface NavSheetLinkProps {
    href: string;
    icon?: React.ReactElement;
    label: string;
    description?: string;
}

export const NavSheetLink: FC<NavSheetLinkProps> = ({ href, icon, label, description }) => {
    return (
        <SheetClose asChild>
            <Link className="flex items-center gap-2" href={href}>
                {!!icon && icon}
                <div className="text-lg font-medium">{label}</div>
                {!!description && <div className="text-muted-foreground">- {description}</div>}
            </Link>
        </SheetClose>
    );
};
