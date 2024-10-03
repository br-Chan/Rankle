/**
 * A tooltip that is to be used in conjunction with a peer component that appears when the user
 * hovers over the peer component for a certain amount of time. displaying the text passed as a
 * prop.
 *
 * @param props Component props
 * @returns the tooltip
 */
export const HoverTooltip = ({ tooltipText }: { tooltipText: string }) => {
    return (
        <div className="absolute left-1/2 transform -translate-x-1/2 w-max invisible opacity-0 peer-hover:visible peer-hover:opacity-100 peer-hover:delay-300 bg-slate-700 text-sm text-white whitespace-pre-line rounded py-1 px-1 z-10 mt-1 mb-1">
            {tooltipText}
        </div>
    );
};
