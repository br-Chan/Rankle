/**
 * A tooltip that is to be used in conjunction with a peer component that appears when the user
 * hovers over the peer component for a certain amount of time. displaying the text passed as a
 * prop.
 *
 * To use:
 * - add 'peer' to the class name of the component that you want the tooltip to be triggered by.
 * - add 'relative' to the class name of the parent component so that tooltip knows which component
 * to appear under.
 *
 * @param props Component props
 * @returns the tooltip
 */
export const HoverTooltip = ({
    tooltipText,
    delay = "300",
}: {
    tooltipText: string;
    delay?: string;
}) => {
    return (
        <div
            className={`peer-hover:delay-${delay} invisible absolute left-1/2 z-10 mb-1 mt-1 w-max -translate-x-1/2 transform whitespace-pre-line rounded bg-slate-800 px-1 py-1 text-sm text-white opacity-0 peer-hover:visible peer-hover:opacity-100`}
        >
            {tooltipText}
        </div>
    );
};
