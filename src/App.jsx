import { useState } from 'react'
import rankleLogo from '/rankleLogo.svg'
import './App.css'

function StatModule({ gameName, numOfButtons }) {
  const buttons = [];

  function handleClick(index) {
    
  }

  let buttonText = "";
  for (let index = 0; index < numOfButtons; index++) {
    if (index + 1 < 10) {
      buttonText = "0" + (index + 1);
    } else {
      buttonText = index + 1;
    }

    buttons.push(
      <button className="statModuleButton" key={index} value={index + 1} onSquareClick={() => handleClick(index)}>
        {buttonText}
      </button>
    );
  }

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

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={rankleLogo} className="logo" alt="Rankle logo" />
        </a>
      </div>
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
        <StatModule gameName="Wordle" numOfButtons="6" />
        <StatModule gameName="Connections" numOfButtons="4" />
        <StatModule gameName="Symble" numOfButtons="8" />
        <StatModule gameName="Spotle" numOfButtons="10" />
        <StatModule gameName="Dordle" numOfButtons="7" />
      </div>
      <p className="tip">
        Click on the Rankle logo to generate your Rank
      </p>
    </>
  )
}

export default App