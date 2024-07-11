export function StatModule({ gameName, numOfButtons }) {
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
  
    return (
      <div className="statModule">
        <h2>{gameName}</h2>
        <label for="wordlestat">Select guesses made<br /></label>
        <div className="statModuleButtonContainer">
          {buttons}
        </div>
      </div>
    );
  }