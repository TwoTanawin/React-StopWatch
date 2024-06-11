import React, {useState, useEffect, useRef, useCallback} from "react"

function StopWatch(){
    const [isRunning, setIsRunning] = useState(false)
    const [elapsedTime, setElapsedTime] = useState(0)

    const intervalIDRef = useRef(null)
    const startTimeRef = useRef(0)

    useEffect(() => {
        if(isRunning){
            intervalIDRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current)
            }, 10)
        }
        return()=>{
            clearInterval(intervalIDRef.current)
        }
    },[isRunning])

    function start(){
        setIsRunning(true)
        startTimeRef.current = Date.now() - elapsedTime;

    }

    function stop(){
        setIsRunning(false)
    }

    function reset(){
        setElapsedTime(0)
        setIsRunning(false)
    }

    function formatTime(){
        let hours = Math.floor(elapsedTime / (1000 * 60 * 60))
        let minue = Math.floor(elapsedTime / (1000 * 60) % 60)
        let sec = Math.floor(elapsedTime / (1000 % 60)) 
        let millisec = Math.floor(elapsedTime / (1000 / 10))

        hours = String(hours).padStart(2, "0")
        minue = String(minue).padStart(2, "0")
        sec = String(sec).padStart(2, "0")
        millisec = String(millisec).padStart(2, "0")

        return `${minue}:${sec}:${millisec}`
    }

    return(
    <div className="stopwatch">
        <div className="display">{formatTime()}</div>
        <div className="control">
            <button className="start-button" onClick={start}>START</button>
            <button className="stop-button" onClick={stop}>STOP</button>
            <button className="reset-button" onClick={reset}>RESET</button>
        </div>
    </div>
    );
}

export default StopWatch