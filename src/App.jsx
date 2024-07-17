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
  const scores = [];
  const [rank, setRank] = useState("R");

  const handleInputClick = (valueIndex, value) => {
    console.log(valueIndex + ": " + value);
  }

  function createWordleStatModule(themeColor) {
    const index = 0;
    inputModulesArray[0] = [
      <InputModule
        key={index}
        valueIndex={index}
        queryText="Guesses made:"
        buttonLabels={[1, 2, 3, 4, 5, 6, "X"]}
        buttonValues={[6, 5, 4, 3, 2, 1, 0]} // change these values
        onInputClick={handleInputClick}
        themeColor={themeColor}
      />,
    ];
    return <StatModule gameName="Wordle" inputModules={inputModulesArray[0]} themeColor={themeColor} />
  }

  function createConnectionsStatModule(themeColor) {
    const index = 1;
    inputModulesArray[1] = [
      <InputModule
        key={index}
        valueIndex={index}
        queryText="Groups made / Mistakes remaining"
        buttonLabels={["4/4", "4/3", "4/2", "4/1", "2/X", "1/X", "0/X"]}
        buttonValues={[85, 80, 70, 60, 30, 15, 5]}
        onInputClick={handleInputClick}
        themeColor={themeColor}
      />,
    ];
    return <StatModule gameName="Connections" inputModules={inputModulesArray[1]} themeColor={themeColor} />
  }

  function createSymbleStatModule(themeColor) {
    const index = 2;
    inputModulesArray[2] = [
      <InputModule
        key={index}
        valueIndex={index}
        queryText="Guesses made:"
        buttonLabels={[1, 2, 3, 4, 5, 6, 7, 8, "X"]}
        buttonValues={[8, 7, 6, 5, 4, 3, 2, 1, 0]} // change these values
        onInputClick={handleInputClick}
        themeColor={themeColor}
      />,
    ];
    return <StatModule gameName="Symble" inputModules={inputModulesArray[2]} themeColor={themeColor} />
  }

  function createStrandsStatModule(themeColor) {
    const index = 3;
    inputModulesArray[3] = [
      <InputModule
        key={index}
        valueIndex={index}
        queryText="Hints used:"
        buttonLabels={[0, 1, 2, 3, 4, 5, 6, 7]}
        buttonValues={[7, 6, 5, 4, 3, 2, 1, 0]} // change these values
        onInputClick={handleInputClick}
        themeColor={themeColor}
      />,
    ];
    return <StatModule gameName="Strands" inputModules={inputModulesArray[3]} themeColor={themeColor} />
  }

  function createSpotleStatModule(themeColor) {
    const index = 4;
    inputModulesArray[4] = [
      <InputModule
        key={index}
        valueIndex={index}
        queryText="Guesses made:"
        buttonLabels={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "X"]}
        buttonValues={[10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]} // change these values
        onInputClick={handleInputClick}
        themeColor={themeColor}
      />,
    ];
    return <StatModule gameName="Spotle" inputModules={inputModulesArray[4]} themeColor={themeColor} />
  }

  const statModules = [
    createWordleStatModule("#67a561"),
    createConnectionsStatModule("#bc70c4"),
    createSymbleStatModule("#f11415"),
    createStrandsStatModule("#a5beba"),
    createSpotleStatModule("#8370de"),
    // <StatModule gameName="Dordle"  themeColor="#fccc04" />,
  ];

  function handleRankClick() {
    setRank("[Coming soon]");
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
