import { useState, useEffect } from "react";

export default function ProgressBar({ TIMER }) {

    const [remainingTime, setRemainingTime] = useState(3000);

    useEffect(() => {
        const interval = setInterval(() => {
            console.log(TIMER);
            setRemainingTime(prevTime => prevTime - 10)
        }, 10);

        return () => {
            clearInterval(interval)
        }
    }, []);

    return (
        <>
            <progress value={remainingTime} max={TIMER} />
        </>
    )
}