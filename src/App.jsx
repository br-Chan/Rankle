import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function StatModule({ gameName }) {
  const buttons = [];
  for (let index = 0; index < 3; index++) {
    buttons.push(
      <button key={index} value={ index + 1 } onSquareClick={() => handleClick(index)}>
        {index + 1}
      </button>
    );
  }


  return (
    <>
      <h2>{gameName}</h2>
      <label for="wordlestat">Enter guesses made: </label>
      {buttons}
    </>
  );
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
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
        <StatModule gameName="Symble" /></div>
      <p className="tip">
        Click on the Rankle logo to generate your Rank
      </p>
    </>
  )
}

export default App
