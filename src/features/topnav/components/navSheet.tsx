import { SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useAuth } from "@/features/firebaseAuth/hooks/useAuth";
import { FaGithub, FaQuestion } from "react-icons/fa6";
import {
    HiOutlineArrowRightEndOnRectangle,
    HiOutlineGift,
    HiOutlineSquare2Stack,
    HiOutlineSquares2X2,
    HiOutlineSquaresPlus,
    HiOutlineUser,
} from "react-icons/hi2";
import { NavSheetLink } from "./navSheetLink";

export const NavSheet = () => {
    const { currentUser } = useAuth();

    return (
        <>
            <SheetHeader className="text-start">
                <SheetTitle>Menu</SheetTitle>
            </SheetHeader>

            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                    <span className="text-muted-foreground">Account</span>
                    {!currentUser || currentUser.isAnonymous ? (
                        <NavSheetLink
                            href="/login"
                            icon={<HiOutlineArrowRightEndOnRectangle className="size-7" />}
                            label="Login"
                        />
                    ) : (
                        <NavSheetLink
                            href="/account"
                            icon={<HiOutlineUser className="size-7" />}
                            label="Profile"
                        />
                    )}
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-muted-foreground">Home</span>
                    <NavSheetLink
                        href="/"
                        icon={<HiOutlineSquare2Stack className="size-7" />}
                        label="My Games"
                    />
                    <NavSheetLink
                        href="/scores"
                        icon={<HiOutlineGift className="size-7" />}
                        label="My Scores"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-muted-foreground">Games</span>
                    <NavSheetLink
                        href="/games/create"
                        icon={<HiOutlineSquaresPlus className="size-7" />}
                        label="Create"
                    />
                    <NavSheetLink
                        href="/games"
                        icon={<HiOutlineSquares2X2 className="size-7" />}
                        label="All Games"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-muted-foreground">About</span>
                    <NavSheetLink
                        href="/about"
                        icon={<FaQuestion className="size-7" />}
                        label="About Rankle"
                    />
                    <a
                        className="flex items-center gap-2"
                        href="https://github.com/br-Chan/Rankle"
                        rel="noopener"
                        target="_blank"
                    >
                        <FaGithub className="size-7" />
                        <div className="text-lg font-medium">GitHub</div>
                    </a>
                </div>
            </div>

            <SheetFooter>
                <span className="text-center text-sm text-muted-foreground">Made by br-Chan</span>
            </SheetFooter>
        </>
    );
};
