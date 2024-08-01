import React, { useState } from "react";
import { EnableButton } from "./EnableButton";
import { EnableSwitch } from "./EnableSwitch";

export function StatModule({ enabledIndex, gameName, inputModules, onEnableClick, themeColor }) {
    const [borderColor, setBorderColor] = useState(themeColor);
    const [backgroundColor, setBackgroundColor] = useState(borderColor + "25");
    const [enabled, setEnabled] = useState(true);

    // Set the translucent colour for the background.
    let translucentBorderColor = borderColor + "25";

    // Set the styles for the border and background colours.
    const statModuleStyle = {
        borderColor: borderColor,
        backgroundColor: backgroundColor,
    }

    const handleEnableClick = (enabled) => {
        if (enabled) {
            setBorderColor(themeColor);
            setBackgroundColor(themeColor + "25");
        } else {
            setBorderColor("lightgrey");
            setBackgroundColor("white");
        }
        setEnabled(enabled)
        onEnableClick(enabledIndex, enabled)
    }

    return (
        <div className="statModule" style={statModuleStyle}>
            {/* <EnableButton onEnableClick={(enabled) => onEnableClick(enabledIndex, enabled)} backgroundColor={themeColor} /> */}
            <EnableSwitch
                switchId={enabledIndex}
                onEnableClick={ handleEnableClick }
                backgroundColor={themeColor}
            />
            <h2>{gameName}</h2>
            {React.Children.map(inputModules, (inputModule) =>
                React.cloneElement(inputModule, { isEnabled: enabled })
            )}
        </div>
    );
}