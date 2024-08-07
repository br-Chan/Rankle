import { useState } from 'react';
import './App.css'
import { StatModule } from './StatModule'
import { ButtonModule } from './ButtonModule'
import { InputModule } from './InputModule';

function addButtonModule(index, queryText, numOfButtons, descending) {
  // have an array of arrays of input modules (or a map?). Each array of input modules is then
  // passed as a prop to the input module components.
  setInputModules(
    [
      ...inputModules,
      <ButtonModule queryText={queryText} numOfButtons={numOfButtons} descending={descending} />
    ]
  );
}

function App() {
  const inputModulesArray = [];
  const [enabledScores] = useState(Array(5).fill(true)); // true if score is enabled, false otherwise.
  const [scores] = useState(Array(5).fill(0)); // value of each score.
  // TODO: use length of scores to set unique keys to the input modules
  const [rank, setRank] = useState("R");

  const handleEnableClick = (enabledIndex, enabled) => {
    enabledScores[enabledIndex] = enabled;
    console.log(enabledScores);
  };

  const handleInputClick = (valueIndex, value) => {
    console.log(valueIndex + ": " + value);
    scores[valueIndex] = value;
  }

  const handleRankClick = () => {
    let numberOfEnabledScores = 0; // to divide the sum of enabled scores.

    // Calculate the sum of score values that are enabled.
    let sum = 0;
    let currentValue = 0;
    for (let index = 0; index < scores.length; ++index) {
      if (enabledScores[index]) {
        ++numberOfEnabledScores;

        currentValue = scores[index];
        sum += currentValue;
        console.log(currentValue + " +");
      }
    }
    console.log("= " + sum);

    // Calculate the average score value.
    const avg = sum / numberOfEnabledScores;
    console.log("Average: " + avg);

    let rank = "R";
    if (avg >= 91) rank = "S";
    else if (avg >= 84) rank = "A+";
    else if (avg >= 77) rank = "A";
    else if (avg >= 70) rank = "A-";
    else if (avg >= 63) rank = "B+";
    else if (avg >= 56) rank = "B";
    else if (avg >= 49) rank = "B-";
    else if (avg >= 42) rank = "C+";
    else if (avg >= 35) rank = "C";
    else if (avg >= 28) rank = "C-";
    else if (avg >= 21) rank = "D+";
    else if (avg >= 14) rank = "D";
    else if (avg >= 7) rank = "D-";
    else if (avg >= 0) rank = "F";

    // Update the rank.
    setRank(rank + " (" + Math.floor(avg) + ")");
  }

  const statModules = [
    createWordleStatModule("#67a561"),
    createConnectionsStatModule("#bc70c4"),
    createSymbleStatModule("#f11415"),
    createStrandsStatModule("#a5beba"),
    createSpotleStatModule("#8370de"),
    createBandleStatModule("#fcdcb4"),
    console.log(enabledScores)
    // <StatModule gameName="Dordle"  themeColor="#fccc04" />,
  ];

  function createWordleStatModule(themeColor) {
    const index = 0;
    inputModulesArray[0] = [
      <InputModule
        key={index}
        valueIndex={index}
        queryText="Guesses made:"
        buttonLabels={[1, 2, 3, 4, 5, 6, "X"]}
        buttonValues={[100, 90, 80, 60, 40, 20, 0]} // change these values
        onInputClick={handleInputClick}
        themeColor={themeColor}
        isEnabled={enabledScores[index]}
      />,
    ];
    return <StatModule
      enabledIndex={index}
      gameName="Wordle"
      inputModules={inputModulesArray[0]}
      onEnableClick={handleEnableClick}
      themeColor={themeColor}
    />
  }

  function createConnectionsStatModule(themeColor) {
    const index = 1;
    inputModulesArray[1] = [
      <InputModule
        key={index}
        valueIndex={index}
        queryText="Groups made | Mistakes remaining"
        buttonLabels={["4|4", "4|3", "4|2", "4|1", "2|X", "1|X", "0|X"]}
        buttonValues={[85, 80, 70, 60, 30, 15, 5]}
        onInputClick={handleInputClick}
        themeColor={themeColor}
        isEnabled={enabledScores[index]}
      />,
    ];
    return <StatModule
      enabledIndex={index}
      gameName="Connections"
      inputModules={inputModulesArray[1]}
      onEnableClick={handleEnableClick}
      themeColor={themeColor}
    />
  }

  function createSymbleStatModule(themeColor) {
    const index = 2;
    inputModulesArray[2] = [
      <InputModule
        key={index}
        valueIndex={index}
        queryText="Guesses made:"
        buttonLabels={[1, 2, 3, 4, 5, 6, 7, 8, "X"]}
        buttonValues={[100, 95, 90, 80, 70, 60, 40, 30, 5]} // change these values
        onInputClick={handleInputClick}
        themeColor={themeColor}
        isEnabled={enabledScores[index]}
      />,
    ];
    return <StatModule
      enabledIndex={index}
      gameName="Symble"
      inputModules={inputModulesArray[2]}
      onEnableClick={handleEnableClick}
      themeColor={themeColor}
    />
  }

  function createStrandsStatModule(themeColor) {
    const index = 3;
    inputModulesArray[3] = [
      <InputModule
        key={index}
        valueIndex={index}
        queryText="Hints used:"
        buttonLabels={[0, 1, 2, 3, 4, 5, 6, 7]}
        buttonValues={[80, 75, 70, 60, 40, 30, 20, 5]} // change these values
        onInputClick={handleInputClick}
        themeColor={themeColor}
        isEnabled={enabledScores[index]}
      />,
    ];
    return <StatModule
      enabledIndex={index}
      gameName="Strands"
      inputModules={inputModulesArray[3]}
      onEnableClick={handleEnableClick}
      themeColor={themeColor}
    />
  }

  function createSpotleStatModule(themeColor) {
    const index = 4;
    inputModulesArray[4] = [
      <InputModule
        key={index}
        valueIndex={index}
        queryText="Guesses made:"
        buttonLabels={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "X"]}
        buttonValues={[100, 95, 90, 80, 75, 65, 55, 45, 30, 10, 0]} // change these values
        onInputClick={handleInputClick}
        themeColor={themeColor}
        isEnabled={enabledScores[index]}
      />,
    ];
    return <StatModule
      enabledIndex={index}
      gameName="Spotle"
      inputModules={inputModulesArray[4]}
      onEnableClick={handleEnableClick}
      themeColor={themeColor}
    />
  }

  function createBandleStatModule(themeColor) {
    const index = 5;
    inputModulesArray[5] = [
      <InputModule
        key={index}
        valueIndex={index}
        queryText="Guesses made:"
        buttonLabels={[1, 2, 3, 4, 5, 6, "X"]}
        buttonValues={[100, 90, 80, 60, 40, 20, 0]} // change these values
        onInputClick={handleInputClick}
        themeColor={themeColor}
      />,
    ];
    return <StatModule
      enabledIndex={index}
      gameName="Bandle"
      inputModules={inputModulesArray[5]}
      onEnableClick={handleEnableClick}
      themeColor={themeColor}
    />
  }

  return (
    <>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={rankleLogo} className="logo" alt="Rankle logo" />
        </a>
      </div> */}

      <h1>RANKLE</h1>
      <button style={{ marginBottom: '10px' }} onClick={handleRankClick}>
        Click to regenerate Rank: {rank}
      </button>

      <div className="statModuleContainer">
        {statModules}
      </div>
    </>
  )
}

export default App
