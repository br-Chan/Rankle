import { useState } from "react";

import { ButtonModule } from "./ButtonModule";

export function StatModule({ gameName, themeColor }) {

    // Array to contain all input modules in the stat module for this game.
    const inputModules = [
        <ButtonModule queryText="Query text" numOfButtons={6} descending={true} />,
        <ButtonModule queryText="Select guesses made" numOfButtons="5" />
    ];

    const [_inputModules, setInputModules] = useState(null);

    // Set the translucent colour for the background.
    let translucentColor = themeColor + "25";

    // Set the styles for the border and background colours.
    const statModuleStyle = {
        borderColor: themeColor,
        backgroundColor: translucentColor,
    }

    return (
        <div className="statModule" style={statModuleStyle}>
            <h2>{gameName}</h2>
            {inputModules}
        </div>
    );
}