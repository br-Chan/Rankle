import { useState } from "react";

export const ThemedButton = ({
    themeColor,
    handleClick,
}: {
    themeColor: string;
    handleClick: () => void;
}) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);

    return (
        <button
            className="cursor-default bg-transparent flex items-center h-6 px-[2px] pb-2 m-1 rounded-md transition-colors hover:text-white hover:bg-red-500 hover:bg-opacity-100"
            // className="cursor-default flex items-center h-8 text-3xl px-2 pb-2 rounded-tr-xl transition-colors hover:text-white hover:bg-red-600"
            style={{
                backgroundColor: isHovered ? `${themeColor}` : "transparent",
            }}
            onMouseEnter={() => {setIsHovered(true)}}
            onMouseLeave={() => {setIsHovered(false)}}
            onClick={handleClick}
        >
            ×
        </button>
    );
};
