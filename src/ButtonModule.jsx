export function ButtonModule({ queryText, numOfButtons, descending }) {
    const buttons = [];

    function handleClick(index) {

    }

    // Clear the button text string.
    let buttonText = "";

    // Create each button with ascending or descending numbers.
    for (let index = 0; index < numOfButtons; ++index) {
        if (descending === true) {
            buttonText = numOfButtons - index;
        } else {
            buttonText = index + 1;
        }

        buttons.push(
            <button className="statModuleButton" key={index} value={index} onClick={() => handleClick(index)}>
                {buttonText}
            </button>
        );
    }

    // Create an "X" button to be selected if the player failed at this game.
    buttons.push(
        <button className="statModuleButton" key="X" value="X" onClick={() => handleClick("X")}>
            X
        </button>
    )

    return (
        <>
            <label>{queryText}<br /></label>
            <div className="statModuleButtonContainer">
                {buttons}
            </div>
        </>
    )
}