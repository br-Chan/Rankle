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
            <button className="statModuleButton" key={index} value={index} onSquareClick={() => handleClick(index)}>
                {buttonText}
            </button>
        );
    }

    buttons.push(
        <button className="statModuleButton" key="X" value="X" onSquareClick={() => handleClick("X")}>
            X
        </button>
    )

    const statModuleStyle = {
        borderColor: themeColor,
        backgroundColor: themeColor,
    }

    return (
        <div className="statModule" style={statModuleStyle}>
            <h2>{gameName}</h2>
            <label for="wordlestat">Select guesses made<br /></label>
            <div className="statModuleButtonContainer">
                {buttons}
            </div>
        </div>
    );
}