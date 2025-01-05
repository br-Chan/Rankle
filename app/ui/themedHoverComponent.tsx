import { ReactNode, useState } from "react";

export const ThemedHoverComponent = ({
    className,
    unhoveredBackgroundColor,
    hoveredBackgroundColor,
    unhoveredTextColor,
    hoveredTextColor,
    children,
}: {
    className?: string;
    unhoveredBackgroundColor?: string;
    hoveredBackgroundColor: string;
    unhoveredTextColor?: string;
    hoveredTextColor?: string;
    children: ReactNode;
}) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);

    // If optional props are not passed, change to default values.
    unhoveredBackgroundColor = unhoveredBackgroundColor
        ? unhoveredBackgroundColor
        : "transparent";
    unhoveredTextColor = unhoveredTextColor ? unhoveredTextColor : "black";
    hoveredTextColor = hoveredTextColor ? hoveredTextColor : "white";

    return (
        <div
            className={`hover:transition-all ${className}`}
            style={{
                backgroundColor: isHovered
                    ? hoveredBackgroundColor
                    : unhoveredBackgroundColor,
                color: isHovered ? hoveredTextColor : unhoveredTextColor,
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
