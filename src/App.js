import React, { useEffect, useState } from "react"
import "./App.css"

const alphabet = Array.from("abcdefghijklmnopqrstuvwxyz").reduce(
  (l, r) => ({ ...l, [r]: r }),
  {}
)
const worker = new Worker("reactionTime.worker.js", { type: "module" })
worker.onmessage = ({ data }) => {
  console.log(`Time delay was: ${data}`)
}

function App() {
  const [state, setState] = useState({ itMatters: false, ...alphabet })
  return (
    <div className="App">
      <header className="App-header">Unnecessary re-renders</header>
      <Form state={state} setState={setState} />
    </div>
  )
}

function Form({ state, setState }) {
  useEffect(() => {
    setTimeout(() => {
      worker.postMessage("start")
      document.getElementById(`toggle${+state.itMatters}`).click()
    }, 50)
  }, [state])
  const { itMatters } = state
  const toggle = () => {
    setState({ ...state, itMatters: !itMatters })
    worker.postMessage("stop")
  }
  const changeLetter = l => ({ target: value }) =>
    setState({ ...state, [l]: value })
  return (
    <form name="f">
      <h2>Does unnecessary re-rendering matter?</h2>
      <div>
        <input
          type="radio"
          name="t"
          value={!itMatters}
          id="toggle0"
          onChange={toggle}
        />
        Nope
      </div>
      <div>
        <input
          type="radio"
          name="t"
          value={itMatters}
          id="toggle1"
          onChange={toggle}
        />
        Of course!
      </div>
      {Object.keys(alphabet).map((l, i) => (
        <div key={l}>
          {`Letter ${i + 1}: `}
          <input value={state[l]} onChange={changeLetter(l)} />
        </div>
      ))}
    </form>
  )
}

export default App
