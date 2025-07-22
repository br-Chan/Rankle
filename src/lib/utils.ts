import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getColorNameByHex = async (hexCode: string) => {
    try {
        const response = await fetch(
            `https://www.thecolorapi.com/id?hex=${hexCode.substring(1)}`
            // Removes the "#" from the hex code before concatenating with the URL
        );

        const data = await response.json();
        return data.name.value;
    } catch (error) {
        console.error("Error fetching color data:", error);
    }
};
