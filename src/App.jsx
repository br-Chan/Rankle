import { useState } from 'react'
import rankleLogo from '/rankleLogo.svg'
import './App.css'

function StatModule({ gameName,  }) {
  const buttons = [];
  for (let index = 0; index < 6; index++) {
    buttons.push(
      <button key={index} value={index + 1} onSquareClick={() => handleClick(index)}>
        {index + 1}
      </button>
    );
  }

  return (
    <div className="statModule">
      <h2>{gameName}</h2>
      <label for="wordlestat">Enter guesses made: </label>
      {buttons}
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
      <div>
        <StatModule gameName="Wordle" />
        <StatModule gameName="Connections" />
        <StatModule gameName="Symble" />
        <StatModule gameName="Spotle" />
      </div>
      <p className="tip">
        Click on the Rankle logo to generate your Rank
      </p>
    </>
  )
}

export default App
