import rankleLogo from '/rankleLogo.svg'
import './App.css'
import { StatModule } from './StatModule'
import { ButtonModule } from './ButtonModule'

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

  function createWordleStatModule(themeColor) {
    inputModulesArray[0] = [
      <ButtonModule queryText="Guesses made:" numOfButtons={6} themeColor={themeColor} />,
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

  return (
    <>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={rankleLogo} className="logo" alt="Rankle logo" />
        </a>
      </div> */}

      <h1>RANKLE</h1>

      {/* <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div> */}
      <div className="statModuleContainer">
        {statModules}
      </div>
      <p className="tip">
        Click on the Rankle logo to generate your Rank
      </p>
    </>
  )
}

export default App
