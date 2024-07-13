import rankleLogo from '/rankleLogo.svg'
import './App.css'
import { StatModule } from './StatModule'
import { ButtonModule } from './ButtonModule'

function createWordleStatModule() {
  return <StatModule gameName="Wordle" themeColor="#67a561" />
}

function App() {

  const statModules = [
    createWordleStatModule(),
    <StatModule gameName="Connections" themeColor="#bc70c4" />,
    <StatModule gameName="Symble" themeColor="#f11415" />,
    <StatModule gameName="Spotle" themeColor="#8370de" />,
    <StatModule gameName="Dordle" themeColor="#fccc04" />,
    <StatModule gameName="Dordle" themeColor="#f31064" />,
    <StatModule gameName="Dordle" themeColor="#46013f" />,
    <StatModule gameName="Bandle" themeColor="#f9deb2" />,
    <StatModule gameName="Dordle" />,
    <StatModule gameName="Dordle" />
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
