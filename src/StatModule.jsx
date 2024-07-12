export function StatModule({ gameName, numOfButtons, themeColor }) {

    const buttons = [];

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
            <label>Select guesses made<br /></label>
            <div className="statModuleButtonContainer">
                {buttons}
            </div>
        </div>
    );
}