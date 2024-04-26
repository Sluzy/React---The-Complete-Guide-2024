import { forwardRef, useImperativeHandle, useRef } from "react"
import { createPortal } from "react-dom";

const ResultModal = forwardRef(function ResultModal(
    { targetTime, remainingTime, onReset }, ref) {

    const dialog2 = useRef();

    const userLost = remainingTime <= 8;
    const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog2.current.showModal();
            }
        };
    });

    return createPortal(
        <>
            <dialog ref={dialog2} className="result-modal" onClose={onReset}>
                {userLost && <h2>You lost</h2>}
                {!userLost && <h2>Your Score {score}</h2>}
                <p>The target time was <strong>{targetTime} seconds</strong></p>
                <p>You stopped the timer with <strong>{formattedRemainingTime}</strong></p>
                <form method="dialog">
                    <button>Close</button>
                </form>
            </dialog>
        </>,
        document.getElementById("modal")
    )
})

export default ResultModal;