import React, {
  unstable_Profiler as Profiler,
  useEffect,
  useState
} from "react"
import "./App.css"

import {
  unstable_trace as trace,
  unstable_wrap as wrap
} from "scheduler/tracing"

function Happy() {
  return "ᕕ( ᐛ )ᕗ"
}
function Neutral() {
  return "¯_(ツ)_/¯"
}
function Sad() {
  return "¯_(☯෴☯)_/¯"
}
function Dead() {
  return "(✖╭╮✖)"
}

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
        {len < 5 ? (
          <Happy />
        ) : len < 10 ? (
          <Neutral />
        ) : len < 15 ? (
          <Sad />
        ) : (
          <Dead />
        )}
      </span>
    </div>
  )
}

const alphabet = Array.from("abcdefghijklmnopqrstuvwxyz").reduce(
  (l, r) => ({ ...l, [r]: r }),
  {}
)
const worker = new Worker("reactionTime.worker.js", { type: "module" })
worker.onmessage = ({ data }) => {
  // console.log(`Time delay was: ${data}`)
}

const TIMER_WINDOW = 10000

let isStopped = false
setTimeout(() => {
  isStopped = true
}, TIMER_WINDOW)

const perfCallback = (
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime,
  interactions
) => {
  console.log({ actualDuration, baseDuration, interactions })
}

function App() {
  const [state, setState] = useState({ itMatters: false, ...alphabet })
  return (
    <div className="App">
      <header className="App-header">Unnecessary re-renders</header>
      <Profiler id="Form" onRender={perfCallback}>
        <Form state={state} setState={setState} />
      </Profiler>
    </div>
  )
}

const useToggle = state =>
  useEffect(() => {
    if (!isStopped) {
      setTimeout(
        // trace(
        // `toggle${performance.now()}`,
        // performance.now(),
        () => {
          worker.postMessage("start")
          document.getElementById(`toggle${+state.itMatters}`).click()
        },
        200
        // )
      )
    }
  }, [state])

const useTyping = (_, setState) =>
  useEffect(() => {
    const inputs = document.getElementsByClassName("input-letter")
    Array.from(inputs).forEach((el, idx) => {
      const delay = (1 + idx) * 50
      const isTyping = setInterval(() => {
        const l = el.id
        // trace(`${l}${performance.now()}`, performance.now(), () => {
        setState(_state => ({
          ..._state,
          [l]:
            _state[l].length < 12
              ? _state[l] + _state[l].slice(0, 1)
              : _state[l].slice(0, 1)
        }))
        // el.value = n
        // el.dispatchEvent(new Event("change", { bubbles: true }))
        // })
      }, delay)
      setTimeout(() => {
        clearInterval(isTyping)
      }, TIMER_WINDOW)
    })
  }, [])

function Form({ state, setState }) {
  useToggle(state)
  useTyping(state, setState)
  const { itMatters } = state
  const toggle = () => {
    setState({ ...state, itMatters: !itMatters })
    worker.postMessage("stop")
  }
  const changeLetter = l => e => setState({ ...state, [l]: e.target.value })
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
        <LetterInput
          key={l}
          l={l}
          i={i}
          value={state[l]}
          onChange={changeLetter(l)}
        />
      ))}
    </form>
  )
}

export default App
