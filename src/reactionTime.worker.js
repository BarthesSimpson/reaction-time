let startTime, stopTime

function startTimer() {
  startTime = performance.now()
}

function stopTimer() {
  stopTime = performance.now()
}

function postResult() {
  postMessage(parseInt(stopTime, 10) - parseInt(startTime, 10))
}

self.onmessage = ({ data }) => {
  if (data === "start") {
    startTimer()
    return
  }
  if (data == "stop") {
    stopTimer()
    postResult()
  }
}
