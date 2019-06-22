let startTime, stopTime

function startTimer() {
  startTime = new Date().getTime()
}

function stopTimer() {
  stopTime = new Date().getTime()
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
