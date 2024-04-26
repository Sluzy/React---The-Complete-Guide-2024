import { useState, useRef } from "react"
import ResultMododal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {

    const [remainingTime, setTimeRemaining] = useState(targetTime * 1000)
    const timerIsActive = remainingTime > 0 && remainingTime < targetTime * 1000

    const timer = useRef();
    const dialog = useRef();

    const startHandler = () => {
        timer.current = setInterval(() => {
            setTimeRemaining(prevRemainingTime => prevRemainingTime - 10);
        }, 10)
    }

    if (remainingTime <= 0) {
        clearInterval(timer.current);
        dialog.current.open();
    }

    const stopHandler = () => {
        clearInterval(timer.current);
        dialog.current.open();
    }

    function handleReset() {
        setTimeRemaining(targetTime * 1000);
    }

    return (
        <>
            <ResultMododal
                ref={dialog}
                targetTime={targetTime}
                remainingTime={remainingTime}
                onReset={handleReset}
            />
            <section className="challenge">
                <h2>{title}</h2>
                <p className="challenge-time">
                    {targetTime} Secound{targetTime > 1 ? "s" : ""}
                </p>
                <p>
                    <button onClick={!timerIsActive ? startHandler : stopHandler}>
                        {timerIsActive ? "Stop" : "Start"} Challenge
                    </button>
                </p>
                <p className={timerIsActive ? "active" : undefined}>
                    {timerIsActive ? "Time is Running..." : "Timer Inactive"}
                </p>

            </section >
        </>

    )
}