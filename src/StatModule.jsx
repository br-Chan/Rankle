import { EnableButton } from "./EnableButton";

export function StatModule({ gameName, inputModules, themeColor }) {
    // Set the translucent colour for the background.
    let translucentThemeColor = themeColor + "25";

    // Set the styles for the border and background colours.
    const statModuleStyle = {
        borderColor: themeColor,
        backgroundColor: translucentThemeColor,
    }

    return (
        <div className="statModule" style={statModuleStyle}>
            <EnableButton enabled={true}/>
            <h2>{gameName}</h2>
            {inputModules}
        </div>
    );
}