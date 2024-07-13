import { ButtonModule } from "./ButtonModule";

export function StatModule({ gameName, numOfButtons, themeColor }) {

    const buttons = [];
    const inputModules = [
        <ButtonModule queryText="Query text" numOfButtons={6} descending={true} />,
        <ButtonModule queryText="Select guesses made" numOfButtons="5" />
    ];

    function handleClick(index) {

    }

    let buttonText = "";
    for (let index = numOfButtons; index > 0; index--) {
        if (index < 10) {
            buttonText = "0" + (index);
        } else {
            buttonText = index;
        }

        buttons.push(
            <button className="statModuleButton" key={index} value={index} onClick={() => handleClick(index)}>
                {buttonText}
            </button>
        );
    }

    buttons.push(
        <button className="statModuleButton" key="X" value="X" onClick={() => handleClick("X")}>
            X
        </button>
    )

    let translucentColor = "";
    translucentColor = themeColor + "25";

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