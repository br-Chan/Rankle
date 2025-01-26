import { useAuth } from "@/features/firebaseAuth/hooks/useAuth";
import Link from "next/link";
import { HiOutlineArrowRightEndOnRectangle, HiOutlineUser } from "react-icons/hi2";

const ListAccountButton = () => {
    const { currentUser } = useAuth();

    return !currentUser || currentUser.isAnonymous ? (
        <Link
            href="/login"
            className="flex w-full items-center justify-center transition-bg-border hover:bg-amber-500 hover:text-white dark:text-white dark:hover:bg-amber-300 dark:hover:text-black"
        >
            <HiOutlineArrowRightEndOnRectangle className="h-7 w-7" /> Login
        </Link>
    ) : (
        <Link
            href="/account"
            className="flex w-full items-center justify-center transition-bg-border hover:bg-amber-500 hover:text-white dark:text-white dark:hover:bg-amber-300 dark:hover:text-black"
        >
            <HiOutlineUser className="h-7 w-7" /> Account
        </Link>
    );
};

export default ListAccountButton;
