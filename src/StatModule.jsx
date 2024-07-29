import { useState } from "react";
import { EnableButton } from "./EnableButton";
import { EnableSwitch } from "./EnableSwitch";

export function StatModule({ enabledIndex, gameName, inputModules, onEnableClick, themeColor }) {
    // Set the translucent colour for the background.
    let translucentThemeColor = themeColor + "25";

    // Set the styles for the border and background colours.
    const statModuleStyle = {
        borderColor: themeColor,
        backgroundColor: translucentThemeColor,
    }

    const [value, setValue] = useState(false);

    return (
        <div className="statModule" style={statModuleStyle}>
            <EnableButton onEnableClick={(enabled) => onEnableClick(enabledIndex, enabled)} backgroundColor={themeColor} />
            <EnableSwitch
                switchId={enabledIndex}
                onEnableClick={(enabled) => onEnableClick(enabledIndex, enabled)}
                backgroundColor={themeColor}
            />
            <h2>{gameName}</h2>
            {inputModules}
        </div>
    );
}