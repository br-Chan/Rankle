import { useState } from "react";

import { ButtonModule } from "./ButtonModule";

export function StatModule({ gameName, themeColor }) {

    // Array to contain all input modules in the stat module for this game.
    // const inputModules = [
    //     <ButtonModule queryText="Query text" numOfButtons={6} descending={true} />,
    //     <ButtonModule queryText="Select guesses made" numOfButtons="5" />
    // ];

    const [inputModules, setInputModules] = useState([]);

    // Set the translucent colour for the background.
    let translucentThemeColor = themeColor + "25";

    // Set the styles for the border and background colours.
    const statModuleStyle = {
        borderColor: themeColor,
        backgroundColor: translucentThemeColor,
    }

    function addInputModule(queryText, numOfButtons, descending) {
        setInputModules(
            [
                ...inputModules,
                <ButtonModule queryText={queryText} numOfButtons={numOfButtons} descending={descending} />
            ]
        );
    }

    return (
        <div className="statModule" style={statModuleStyle}>
            <h2>{gameName}</h2>
            {inputModules}
        </div>
    );
}