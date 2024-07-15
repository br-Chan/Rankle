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

  function createWordleStatModule() {
    inputModulesArray[0] = [
      <ButtonModule queryText="Guesses made:" numOfButtons={6} />,
    ];
    return <StatModule gameName="Wordle" inputModules={inputModulesArray[0]} themeColor="#67a561" />
  }

  function createConnectionsStatModule() {
    inputModulesArray[1] = [
      <ButtonModule queryText="Mistakes remaining:" numOfButtons={4} descending={true} />,
      <ButtonModule queryText="Connections found:" numOfButtons={4} />,
    ];
    return <StatModule gameName="Connections" inputModules={inputModulesArray[1]} themeColor="#bc70c4" />
  }

  function createSymbleStatModule() {
    inputModulesArray[2] = [
      <ButtonModule queryText="Guesses made:" numOfButtons={8} />,
    ];
    return <StatModule gameName="Symble" inputModules={inputModulesArray[2]} themeColor="#f11415" />
  }

  function createStrandsStatModule() {
    inputModulesArray[3] = [
      <ButtonModule queryText="Hints used:" numOfButtons={7} />,
    ];
    return <StatModule gameName="Strands" inputModules={inputModulesArray[3]} themeColor="#a5beba" />
  }

  function createSpotleStatModule() {
    inputModulesArray[4] = [
      <ButtonModule queryText="Guesses made:" numOfButtons={10} />,
    ];
    return <StatModule gameName="Spotle" inputModules={inputModulesArray[4]} themeColor="#8370de" />
  }


  const statModules = [
    createWordleStatModule(),
    createConnectionsStatModule(),
    createSymbleStatModule(),
    createStrandsStatModule(),
    createSpotleStatModule(),
    // <StatModule gameName="Dordle"  themeColor="#fccc04" />,
  ];

  // statModules[0].addInputModule("Hello", "5", "false");

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
