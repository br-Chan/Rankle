import { EnableButton } from "./EnableButton";

export function StatModule({ enabledIndex, gameName, inputModules, onEnableClick, themeColor }) {
    // Set the translucent colour for the background.
    let translucentThemeColor = themeColor + "25";

    // Set the styles for the border and background colours.
    const statModuleStyle = {
        borderColor: themeColor,
        backgroundColor: translucentThemeColor,
    }

    return (
        <div className="statModule" style={statModuleStyle}>
            <EnableButton onEnableClick={(enabled) => onEnableClick(enabledIndex, enabled)} backgroundColor={themeColor} />
            <h2>{gameName}</h2>
            {inputModules}
        </div>
    );
}