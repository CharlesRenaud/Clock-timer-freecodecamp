import './App.scss';
import react, {useState, useEffect} from 'react'

const App = () => {

  const [breakLength, setBreakLength] = useState(5)
  const [sessionLength, setSessionLength] = useState(25)
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [temps, setTemps] = useState(1500)
  const [tooglePlay, setTooglePlay] = useState(false)
  const [start, setStart] = useState(false)

  const [breakerStart, setBreakerStart] = useState(false)
  const [toogleBreaker, setToogleBreaker] = useState(false)
  const [breakerTemps, setBreakerTemps] = useState(300)
  const [isBreaked, setIsBreaked] = useState(false)



  let props = {
    breakLength : breakLength,
    sessionLength: sessionLength,
    time: time,
    temps: temps,
    tooglePlay: tooglePlay,
    start :start,
    breakerStart: breakerStart,
    toogleBreaker: toogleBreaker,
    breakerTemps: breakerTemps,
    isBreaked:isBreaked,
    setIsBreaked: setIsBreaked,
    setBreakerStart: setBreakerStart,
    setToogleBreaker : setToogleBreaker,
    setBreakerTemps: setBreakerTemps,
    setStart: setStart,
    setTooglePlay: setTooglePlay,
    setTemps: setTemps,
    setTime: setTime,
    setBreakLength: setBreakLength,
    setSessionLength: setSessionLength,
  }

  return (
    <div className="App">
      <div className="container">
        <Break {...props} />
        <Session {...props}/>
      </div>
      <div className="container">
        {!isBreaked 
        ? 
        <Timer {...props} /> 
        : 
        <Breaker {...props} />}
      </div>

      

    </div>
  );
}

export default App;

const Breaker = (props) => {
 
  console.log((props.breakLength))

  const refresh = () => {
    props.setBreakLength(5)
    props.setSessionLength(25)
    props.setTemps(1500)
    props.setBreakerTemps(300)
    props.setBreakerStart(false)
    props.setToogleBreaker(false)
    props.setTooglePlay(false)
    props.setStart(false)
    props.setIsBreaked(false)

  }


  const tooglings = () => {
    if(props.toogleBreaker === true){
      props.setToogleBreaker(false)
      console.log("hello")
    }else{
      props.setToogleBreaker(true)
      props.setBreakerStart(true)
    }
  }
  
  var a = Math.floor(props.breakerTemps/60); //minutes
  var b = props.breakerTemps%60; //seconds
    if(b === 0){
      b = "00"
    }else if(b < 10){
      b = "0"+b
    }
    if(a ===0){
      a = "00"
    }
    else if(a < 10){
      a = "0"+a
    }

    useEffect(() => {
      let interval = null;
      if(props.toogleBreaker){
       interval = setInterval(() => {
         if(props.breakerTemps > 0){
          props.setBreakerTemps(prev => prev -1)
         }
         else{
           props.setToogleBreaker(false)
           props.setIsBreaked(false)
           props.setBreakerTemps(props.breakLength * 60)
          }
        }, 10);
      }else if (!props.toogleBreaker && props.breakerTemps !== 0) {
        clearInterval(interval);
      }
      return () => clearInterval(interval);
    },[props.toogleBreaker, props.breakerTemps] );

  return(
    <div className="section timer">
      <div className="timer-box">
        <h1  id="timer-label">Break</h1>
        <div id="time-left">{a}:{b}</div>
      </div>
      <div className="actions">
        <div onClick={()=>tooglings()} id="start_stop">{props.toogleBreaker ? "Pause" : "Play"}</div>
        <div onClick={()=>refresh()} id="reset">Refresh</div>
      </div>
    </div>
  )

}



const Timer = (props) => {
console.log(props.tooglePlay)
  useEffect(() => {
    if(!props.tooglePlay && !props.start){
    props.setTemps(props.sessionLength * 60)
    }
  })
  
  const refresh = () => {
    props.setBreakLength(5)
    props.setSessionLength(25)
    props.setTemps(1500)
    props.setBreakerTemps(300)
    props.setBreakerStart(false)
    props.setToogleBreaker(false)
    props.setTooglePlay(false)
    props.setStart(false)
    props.setIsBreaked(false)
  }


  const toogling = () => {
    if(props.tooglePlay === true){
      props.setTooglePlay(false)

    }else{
      props.setTooglePlay(true)
      props.setStart(true)
    }
  }
 

  var a = Math.floor(props.temps/60); //minutes
  var b = props.temps%60; //seconds
    if(b === 0){
      b = "00"
    }else if(b < 10){
      b = "0"+b
    }
    if(a ===0){
      a = "00"
    }
    else if(a < 10){
      a = "0"+a
    }

    useEffect(() => {
      let interval = null;
      if(props.tooglePlay){
       interval = setInterval(() => {
         if(props.temps > 0){
          props.setTemps(prev => prev -1)
         }
         else{
           props.setIsBreaked(true)
           props.setToogleBreaker(true)
           props.setTemps(props.sessionLength * 60)
           props.setBreakerTemps(props.breakLength * 60)
          }
        }, 10);
      }else if (!props.tooglePlay && props.temps !== 0) {
        clearInterval(interval);
      }
      return () => clearInterval(interval);
    },[props.tooglePlay, props.temps] );

  return(
    <div className="section timer">
      <div className="timer-box">
        <h1  id="timer-label">Timer</h1>
        <div id="time-left">{a}:{b}</div>
      </div>
      <div className="actions">
        <div onClick={()=>toogling()} id="start_stop">{props.tooglePlay ? "Pause" : "Play"}</div>
        <div onClick={()=>refresh()} id="reset">Refresh</div>
      </div>
    </div>
  )
}


const Session = (props) => {

  const sessionIncrement = () => {
    if(props.sessionLength < 60){
      props.setSessionLength(props.sessionLength +1)

    }
  }
  const sessionDecrement = () => {
    if(props.sessionLength > 1){
      props.setSessionLength(props.sessionLength -1)
    }
  }



  return(
    <div className="section">
      <button id="session-decrement" onClick={()=>sessionDecrement()}>Session Decrement </button>
      <div id="session-label">Session Length : <span id="session-length">{props.sessionLength}</span></div>
      <button id="session-increment" onClick={()=>sessionIncrement()}>Session Increment </button>
    </div>
  )
}

const Break = (props) => {

  const breakIncrement = () => {
    if(props.breakLength < 60){
      props.setBreakLength(props.breakLength +1)
    }
  }
  const breakDecrement = () => {
    if(props.breakLength > 1){
      props.setBreakLength(props.breakLength -1)
    }
  }

  return(
    <div  className="section">
      <button id="break-decrement" onClick={()=>breakDecrement()}>Break Decrement </button>
      <div id="break-label">Break Length : <span id="break-length">{props.breakLength}</span></div>
      <button id="break-increment" onClick={()=>breakIncrement()}>Break Increment </button>
    </div>
  )
}
