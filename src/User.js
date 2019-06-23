import { useEffect } from "react"

const TIMER_WINDOW = 30000
const TOGGLE_DELAY = 5000
const TYPING_DELAY = 20
export const MAX_LENGTH = 20

let isStopped = false
setTimeout(() => {
  isStopped = true
}, TIMER_WINDOW)
setTimeout(() => document.getElementById(`toggle0`).click())

export const useToggle = state =>
  useEffect(() => {
    if (!isStopped) {
      setTimeout(() => {
        document.getElementById(`toggle${+!state.itMatters}`).click()
      }, TOGGLE_DELAY)
    }
  }, [state])

export const useTyping = (_, setState) =>
  useEffect(() => {
    const inputs = document.getElementsByClassName("input-letter")
    Array.from(inputs).forEach((el, idx) => {
      const delay = (1 + idx) * TYPING_DELAY
      const isTyping = setInterval(() => {
        const l = el.id
        setState(_state => ({
          ..._state,
          [l]:
            _state[l].length < MAX_LENGTH
              ? _state[l] + _state[l].slice(0, 1)
              : _state[l].slice(0, 1)
        }))
      }, delay)
      setTimeout(() => {
        clearInterval(isTyping)
      }, TIMER_WINDOW)
    })
  }, [])
