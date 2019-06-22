import React, {
  unstable_Profiler as Profiler,
  useEffect,
  useState
} from "react"
import "./App.css"

const alphabet = Array.from("abcdefghijklmnopqrstuvwxyz").reduce(
  (l, r) => ({ ...l, [r]: r }),
  {}
)
const worker = new Worker("reactionTime.worker.js", { type: "module" })
worker.onmessage = ({ data }) => {
  console.log(`Time delay was: ${data}`)
}

const perfCallback = (
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime,
  interactions
) => {
  // console.log({ actualDuration, baseDuration, interactions })
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
    setTimeout(() => {
      worker.postMessage("start")
      document.getElementById(`toggle${+state.itMatters}`).click()
    }, 200)
  }, [state])

const useTyping = (_, setState) =>
  useEffect(() => {
    const inputs = document.getElementsByClassName("input-letter")
    Array.from(inputs).forEach((el, idx) => {
      const delay = (1 + idx) * 50
      setInterval(() => {
        const l = el.id
        setState(_state => ({
          ..._state,
          [l]:
            _state[l].length < 12
              ? _state[l] + _state[l].slice(0, 1)
              : _state[l].slice(0, 1)
        }))
        // el.value = n
        // el.dispatchEvent(new Event("change", { bubbles: true }))
      }, delay)
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
        <div key={l}>
          {`Letter ${i + 1}: `}
          <input
            id={l}
            className="input-letter"
            value={state[l]}
            onChange={changeLetter(l)}
          />
        </div>
      ))}
    </form>
  )
}

export default App
