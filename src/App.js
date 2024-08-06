import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(false);
  const [opaque, setOpaque] = useState(0);

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
    setOpaque(0);
  }

  function stop() {
    setTimer(false);
    setOpaque(1);
  }


  function startAgain() {
    setTime(0);
    setTimer(true);
    setOpaque(0);
  }

  module.exports = {
    
    rules: {
      "no-unused-vars": process.env.CI ? "warn" : "error",
      "eqeqeq": process.env.CI ? "warn" : "error",
    }
  };

  return (
    <div className='App' onMouseLeave={() => stop()}>
      <h1>Focus</h1>
      <h2>How long can you keep your mouse on this page?</h2>

      {!timer && time != 0 &&(<div className='congrats'>
        <h3>Congratulations!</h3>
        You've kept your focus for:
      </div>)}

      <div className='numbers'>
        <span>{("0" + Math.floor((time / 600000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
        <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
      </div>
      
      <div className='buttons'>
        {!timer && time === 0 && (<button onClick={() => start()}>Start</button>)}
        {timer && <button onClick={() => stop()}>Stop</button>}
        {!timer && time > 0 && (<button onClick={() => startAgain()}>Restart</button>)}
      </div>

      
    </div>
  );
}

export default App;
