export function ButtonModule({ queryText, numOfButtons, descending }) {
    const buttons = [];

    // Clear the button text string.
    let buttonText = "";

    // Create each button with ascending or descending numbers.
    for (let index = 0; index < numOfButtons + 1; ++index) {
        if (index === numOfButtons) {
            buttonText = "X";
        } else if (descending === true) {
            buttonText = numOfButtons - index;
        } else {
            buttonText = index + 1;
        }

        buttons.push(
            <button className="statModuleButton" key={index} onClick={() => handleClick(index)}>
                {buttonText}
            </button>
        );
    }

    return (
        <>
            <label>{queryText}<br /></label>
            <div className="statModuleButtonContainer">
                {buttons}
            </div>
        </>
    )
}