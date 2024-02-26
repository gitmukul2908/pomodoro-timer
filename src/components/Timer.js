import React, { useContext, useEffect, useState, useRef } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Playbutton from './Playbutton';
import Pausebutton from './Pausebutton';
import Settings from './Settings';
import SettingsContext from '../contexts/SettingsContext';

    

const Timer = () => {

    const red = '#f54e4e';
    const green = '#4aec8c';


    const context = useContext(SettingsContext)

    const [isPaused, setIsPaused] = useState(true)
    const [mode, setMode] = useState('work') //work/break/null
    const [secondsLeft, setSecondsLeft] = useState(0)

    const isPausedRef = useRef(isPaused);
    const secondsLeftRef = useRef(secondsLeft);
    const modeRef = useRef(mode)

    const switchMode = () => {
        const nextMode = modeRef.current === 'work' ? 'break' : 'work';
        setMode(nextMode);
        modeRef.current = nextMode

        const nextSeconds = (nextMode === 'work' ? context.workMinutes : context.breakMinutes) * 60
        setSecondsLeft(nextSeconds)
        secondsLeftRef.current = nextSeconds
    }

    const tick = () => {
        secondsLeftRef.current--;
        setSecondsLeft(secondsLeftRef.current)
    }

    const initTimer = () => {
        secondsLeftRef.current = context.workMinutes * 60
        setSecondsLeft(secondsLeftRef.current);
    }

    useEffect(() => {
        // initialize the timer with work minutes
        initTimer()

        const timer = setInterval(() => {
            // if it is paused
            if (isPausedRef.current) return;

            // if time completed switch mode
            if (secondsLeftRef.current === 0) return switchMode();

            // decreament seconds by 1
            tick();


        }, 1000);

        return () => clearInterval(timer);

    }, [context])


    const totalSeconds = mode === 'work' ? context.workMinutes * 60 : context.breakMinutes * 60;
    const percentage = Math.round(secondsLeft / totalSeconds * 100)

    const minutes = Math.floor(secondsLeft / 60);
    let seconds = secondsLeft % 60;
    if (seconds < 10) {
        seconds = '0' + seconds
    }


    return (
        <div>
            <CircularProgressbar value={percentage}
                text={minutes + ':' + seconds}
                styles={buildStyles({
                    textColor: "#fff",
                    pathColor:mode === 'work' ? red : green,
                    trailColor: 'rgba(255, 255, 255, .2)'
                })} />
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                {isPausedRef.current ? <Playbutton onClick={() => {setIsPaused(false); isPausedRef.current = false;}} /> : <Pausebutton onClick={() => {setIsPaused(true); isPausedRef.current = true;}}/>}
            </div>
            <div style={{ marginTop: '20px' }}>
                <Settings />
            </div>
        </div>
    )
}

export default Timer
