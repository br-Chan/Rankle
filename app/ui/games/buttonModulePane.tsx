"use client";

import { ButtonModuleData } from "../buttonModule";
import { HoverTooltip } from "../hoverTooltip";

/**
 * Button module pane that displays the query and set of buttons of the button module, with each
 * button displaying the label and corresponding score.
 *
 * @param props Component props
 * @returns Button module pane
 */
export const ButtonModulePane = ({
    data,
    themeColor,
}: {
    data: ButtonModuleData;
    themeColor: string;
}) => {
    const buttons = [];

    // Create each button pane displaying the label and the score.
    for (let index = 0; index < data.buttonLabels.length; ++index) {
        const label = data.buttonLabels[index];
        const score = data.buttonScores[index];
        buttons.push(
            <div className="relative" key={index}>
                <div
                    className="peer rounded-lg border-black text-sm"
                    key={index}
                >
                    {/* Button label */}
                    <div className="w-full rounded-t-md bg-white font-semibold text-black">
                        {label}
                    </div>

                    {/* Button score */}
                    <div
                        className="w-full rounded-b-md border-t-2 bg-white text-gray-700"
                        style={{
                            borderColor: `${themeColor}`,
                        }}
                    >
                        {score}
                    </div>
                </div>
                <HoverTooltip
                    tooltipText={`Label: ${label}\nScore: ${score}`}
                />
            </div>
        );
    }

    return (
        <div
            className="mt-2 rounded-md p-2"
            style={{ backgroundColor: `${themeColor}25` }}
        >
            <div>{data.queryText}</div>
            <div className="grid grid-cols-3 gap-1">{buttons}</div>
        </div>
    );
};
