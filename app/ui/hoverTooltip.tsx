import { useState } from "react";

export const HoverTooltip = ({ tooltipText }: { tooltipText: string }) => {
    return (
        <div className="absolute left-1/2 transform -translate-x-1/2 invisible opacity-0 peer-hover:visible peer-hover:opacity-100 peer-hover:delay-300 bg-slate-700 text-sm text-white whitespace-nowrap rounded py-1 px-0.5 z-10 mt-1 mb-1">
            {tooltipText}
        </div>
    );
};
