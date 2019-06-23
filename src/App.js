import React, { useCallback, memo, useState } from "react"
import { Happy, Neutral, Sad, Dead } from "./Icon"
import { useToggle, useTyping, MAX_LENGTH } from "./User"
import "./App.css"

function LetterInput({ l, i, value, onChange }) {
  const len = value.length
  return (
    <div style={{ padding: "1em 0" }}>
      {`Letter ${i + 1}: `}
      <input
        style={{ width: "40%" }}
        id={l}
        className="input-letter"
        value={value}
        onChange={onChange}
      />
      <span style={{ float: "right", width: "50%" }}>
        {len < MAX_LENGTH / 4 ? (
          <Happy i={len} />
        ) : len < MAX_LENGTH / 2 ? (
          <Neutral i={len} />
        ) : len < (3 * MAX_LENGTH) / 4 ? (
          <Sad i={len} />
        ) : (
          <Dead i={len} />
        )}
      </span>
    </div>
  )
}

const MLetterInput = memo(
  LetterInput,
  ({ value: _old }, { value: _new }) => _old === _new
)

const alphabet = Array.from("abcdefghijklmnopqrstuvwxyz").reduce(
  (l, r) => ({ ...l, [r]: r }),
  {}
)

function App() {
  const [state, setState] = useState({ itMatters: true, ...alphabet })
  return (
    <div className="App">
      <header className="App-header">Unnecessary re-renders</header>
      <Form state={state} setState={setState} />
    </div>
  )
}

function Form({ state, setState }) {
  useToggle(state)
  useTyping(state, setState)

  const toggle = useCallback(() => {
    setState(state => ({ ...state, itMatters: !state.itMatters }))
  })

  const changeLetter = useCallback(l => e =>
    setState(state => ({ ...state, [l]: e.target.value }))
  )
  return (
    <form name="f">
      <div className="timer">{(performance.now() / 1000).toFixed(2)}</div>
      <h2>Does unnecessary re-rendering matter? </h2>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <label
            htmlFor="toggle0"
            style={{ float: "right", marginRight: "1em" }}
          >
            Nope
          </label>
          <input
            style={{ float: "right" }}
            type="radio"
            name="t"
            value={false}
            id="toggle0"
            onChange={toggle}
          />
        </div>
        <div style={{ flex: 1 }}>
          <input
            style={{ float: "left", marginLeft: "1em" }}
            type="radio"
            name="t"
            value={true}
            id="toggle1"
            onChange={toggle}
          />
          <label htmlFor="toggle1" style={{ float: "left" }}>
            Of course!
          </label>
        </div>
      </div>
      {Object.keys(alphabet).map((l, i) =>
        state.itMatters ? (
          <MLetterInput
            key={l}
            l={l}
            i={i}
            value={state[l]}
            onChange={changeLetter(l)}
          />
        ) : (
          <LetterInput
            key={l}
            l={l}
            i={i}
            value={state[l]}
            onChange={changeLetter(l)}
          />
        )
      )}
    </form>
  )
}

export default App
