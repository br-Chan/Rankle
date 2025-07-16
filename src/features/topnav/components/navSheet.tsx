import {
    SheetClose,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { useAuth } from "@/features/firebaseAuth/hooks/useAuth";
import Link from "next/link";
import { FaGithub, FaQuestion } from "react-icons/fa6";
import { HiOutlinePlus, HiOutlineSquares2X2 } from "react-icons/hi2";
import { NavSheetLink } from "./navSheetLink";

export const NavSheet = () => {
    const { currentUser } = useAuth();

    return (
        <>
            <SheetHeader className="text-start">
                <SheetTitle>Menu</SheetTitle>
            </SheetHeader>

            <div className="flex flex-col gap-8">
                TODO: account links
                <div className="flex flex-col gap-2">
                    <span>Home</span>
                    <NavSheetLink href="/" label="My Games" />
                    <NavSheetLink href="/scores" label="My Scores" />
                </div>
                <div className="flex flex-col gap-2">
                    <span>Games</span>
                    <NavSheetLink
                        href="/games/create"
                        icon={<HiOutlinePlus className="size-7" />}
                        description="Add a game module to Rankle."
                        label="Create"
                    />
                    <NavSheetLink
                        href="/games"
                        icon={<HiOutlineSquares2X2 className="size-7" />}
                        description="Browse all added games."
                        label="All Games"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <span>About</span>
                    <NavSheetLink
                        href="/about"
                        icon={<FaQuestion className="size-7" />}
                        description="What is this?"
                        label="About Rankle"
                    />
                    <a
                        className="flex items-center gap-2"
                        href="https://github.com/br-Chan/Rankle"
                        rel="noopener"
                        target="_blank"
                    >
                        <FaGithub className="size-7" />
                        <div className="text-xl font-medium">GitHub</div>
                        <div className="text-muted-foreground">
                            Take a look at Rankle&apos;s code.
                        </div>
                    </a>
                </div>
            </div>

            <SheetFooter>
                <span className="text-center text-sm text-muted-foreground">Made by br-Chan</span>
            </SheetFooter>
        </>
    );
};
