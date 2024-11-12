import { ReactNode, useState } from "react";

export const ThemedHoverComponent = ({
    themeColor,
    children,
    className,
}: {
    themeColor: string;
    children: ReactNode;
    className?: string;
}) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);

    return (
        <div
            className={`transition-all ${className}`}
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
