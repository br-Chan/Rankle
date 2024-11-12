import { ReactNode, useState } from "react";

export const ThemedHoverComponent = ({
    children,
    themeColor,
}: // handleClick,
{
    children: ReactNode;
    themeColor: string;
    // handleClick: () => void;
}) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);

    return (
        <div
            className="rounded-md transition-all"
            style={{
                backgroundColor: isHovered ? `${themeColor}` : "transparent",
                color: isHovered ? "white" : "black",
                // transition: "background-color 0.3s",
            }}
            onMouseEnter={() => {
                setIsHovered(true);
            }}
            onMouseLeave={() => {
                setIsHovered(false);
            }}
        >
            {children}
        </div>

    );
};
