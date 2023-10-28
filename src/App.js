import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(false);

  useEffect(() => {
    let interval = null;

    if (timer) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!timer) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timer]);

  function start() {
    setTimer(true);
  }

  function stop() {
    setTimer(false);
  }


  function startAgain() {
    setTime(0);
    setTimer(true);
  }

  return (
    <div className='App' onMouseLeave={() => stop()}>
      <h1>Focus</h1>
      <h2>How long can you keep your mouse on this page?</h2>
      <div className='numbers'>
        <span>{("0" + Math.floor((time / 600000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
        <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
      </div>

      <div className='buttons'>
        {!timer && time === 0 && (
          <button onClick={() => start()}>Start</button>
        )}
        {timer && <button onClick={() => stop()}>Stop</button>}
        {!timer && time > 0 && (
          <button onClick={() => startAgain()}>Start</button>
        )}
      </div>
    </div>
  );
}

export default App;
