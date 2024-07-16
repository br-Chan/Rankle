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
  const [rank, setRank] = useState("R");

  const handleInputClick = (value) => {
    console.log(value);
  }

  function createWordleStatModule(themeColor) {
    inputModulesArray[0] = [
      <ButtonModule queryText="Guesses made:" numOfButtons={6} themeColor={themeColor} />,
      <InputModule
        queryText="I am input module"
        buttonLabels={["1", "2"]}
        buttonValues={[6, 5]}
        onInputClick={handleInputClick}
        themeColor={themeColor}
      />,
    ];
    return <StatModule gameName="Wordle" inputModules={inputModulesArray[0]} themeColor={themeColor} />
  }

  function createConnectionsStatModule(themeColor) {
    inputModulesArray[1] = [
      <ButtonModule queryText="Mistakes remaining:" numOfButtons={4} descending={true} themeColor={themeColor} />,
      <ButtonModule queryText="Connections found:" numOfButtons={4} themeColor={themeColor} />,
    ];
    return <StatModule gameName="Connections" inputModules={inputModulesArray[1]} themeColor={themeColor} />
  }

  function createSymbleStatModule(themeColor) {
    inputModulesArray[2] = [
      <ButtonModule queryText="Guesses made:" numOfButtons={8} themeColor={themeColor} />,
    ];
    return <StatModule gameName="Symble" inputModules={inputModulesArray[2]} themeColor={themeColor} />
  }

  function createStrandsStatModule(themeColor) {
    inputModulesArray[3] = [
      <ButtonModule queryText="Hints used:" numOfButtons={7} themeColor={themeColor} />,
    ];
    return <StatModule gameName="Strands" inputModules={inputModulesArray[3]} themeColor={themeColor} />
  }

  function createSpotleStatModule(themeColor) {
    inputModulesArray[4] = [
      <ButtonModule queryText="Guesses made:" numOfButtons={10} themeColor={themeColor} />,
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
