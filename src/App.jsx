import { useState } from 'react'
import rankleLogo from '/rankleLogo.svg'
import './App.css'
import { StatModule } from './StatModule'
import { ButtonModule } from './ButtonModule'

function App() {

  const statModules = [
    <StatModule gameName="Wordle" numOfButtons="6" themeColor="#67a561" />,
    <StatModule gameName="Connections" numOfButtons="4" themeColor="#bc70c4" />,
    <StatModule gameName="Symble" numOfButtons="8" themeColor="#f11415" />,
    <StatModule gameName="Spotle" numOfButtons="10" themeColor="#8370de" />,
    <StatModule gameName="Dordle" numOfButtons="7" themeColor="#fccc04" />,
    <StatModule gameName="Dordle" numOfButtons="15" themeColor="#f31064" />,
    <StatModule gameName="Dordle" numOfButtons="6" themeColor="#46013f"/>,
    <StatModule gameName="Bandle" numOfButtons="6" themeColor="#f9deb2"/>,
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
