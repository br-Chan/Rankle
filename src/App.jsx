import { useState } from 'react'
import rankleLogo from '/rankleLogo.svg'
import './App.css'
import { StatModule } from './StatModule'

function App() {
  const [count, setCount] = useState(0);

  const statModules = [
    <StatModule gameName="Wordle" numOfButtons="6" />,
    <StatModule gameName="Connections" numOfButtons="4" />,
    <StatModule gameName="Symble" numOfButtons="8" />,
    <StatModule gameName="Spotle" numOfButtons="10" />,
    <StatModule gameName="Dordle" numOfButtons="7" />,
    <StatModule gameName="Dordle" numOfButtons="15" />,
    <StatModule gameName="Dordle" numOfButtons="6" />,
    <StatModule gameName="Dordle" numOfButtons="5" />,
    <StatModule gameName="Dordle" numOfButtons="4" />,
    <StatModule gameName="Dordle" numOfButtons="3" />
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
