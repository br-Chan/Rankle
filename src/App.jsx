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

function createWordleStatModule() {
  return <StatModule gameName="Wordle" themeColor="#67a561" />
}

function App() {
  const inputModules = [
    <ButtonModule queryText="Query text" numOfButtons={6} descending={true} />,
    <ButtonModule queryText="Select guesses made" numOfButtons="5" />
  ];

  const statModules = [
    createWordleStatModule(),
    <StatModule gameName="Connections" themeColor="#bc70c4" />,
    <StatModule gameName="Symble" inputModules={inputModules} themeColor="#f11415" />,
    <StatModule gameName="Spotle" inputModules={inputModules} themeColor="#8370de" />,
    <StatModule gameName="Dordle" inputModules={inputModules} themeColor="#fccc04" />,
    <StatModule gameName="Dordle" inputModules={inputModules} themeColor="#f31064" />,
    <StatModule gameName="Dordle" inputModules={inputModules} themeColor="#46013f" />,
    <StatModule gameName="Bandle" inputModules={inputModules} themeColor="#f9deb2" />,
    <StatModule gameName="Dordle" inputModules={inputModules} />,
    <StatModule gameName="Dordle" inputModules={inputModules} />
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
