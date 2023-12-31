import React, { useState, useEffect, useRef } from 'react';
import './Timer.css';
import { Header } from '../Components/Header';
import soundStart  from '../Assets/sound-start.mp3';
import soundfinish from '../Assets/soundfinish.mp3';
import music from '../Assets/music.mp3';
import useSound from 'use-sound';
import { Footer } from '../Components/Footer';
import red from '../Assets/hard.png';
import orange from '../Assets/medium.png';
import green from '../Assets/easy.png';
import start from '../Assets/start.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons';


export const Timer = () => {
    const [counter, setCounter] = useState(1800);
    const [isActive, setIsActive] = useState(false);
    const [countdown, setCountdown] = useState(null);
    const [play] = useSound(soundStart);
    const [playMusic, { pause, stop }] = useSound(music, { loop: true });
    const [playFinish] = useSound(soundfinish);

    const audioRef = useRef(null);
  
    useEffect(() => {
      let timer;
      if (isActive && counter > 0) {
        timer = setTimeout(() => setCounter(counter - 1), 1000);
      } else if (counter === 0) {
        playFinish();
        stop()
      }
      return () => clearTimeout(timer);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [counter, isActive]);

    useEffect(() => {
      let countdownTimer;
      if (countdown > 0) {
        countdownTimer = setTimeout(() => setCountdown(countdown - 1), 1200);
      } else if (countdown === 0) {
        playMusic();
        setIsActive(true);
        setCountdown(null);
      }
      return () => clearTimeout(countdownTimer);
      //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [countdown]);
  
    const handleStart = () => {
      if (!isActive && countdown === null) {
        setCountdown(4);
        play();
      }
    };

    const handlePauseResume = () => {
      setIsActive(!isActive);
      if (isActive) {
        pause();
      } else {
        playMusic();
      }
    };
  
    const handleReset = () => {
      setIsActive(false);
      setCounter(1800);
      setCountdown(null);
      stop()
    };

    const minutes = Math.floor(counter / 60);
    const seconds = counter % 60;
    return (
      <div className="chrono">
        <Header />
        <div className='countdown'>
        <p>Countdown :</p>
        {!isActive && countdown === null && counter === 1800 && <p style={{fontSize: '1rem'}}>PUT ON <FontAwesomeIcon icon={faVolumeHigh} className="blinking-icon" /></p>}
          {countdown !== null && (
          <div style={{ display: 'flex', justifyContent: 'center' }}> 
            {countdown > 1 && <img src={red} className={countdown === 4 ? 'circle active' : 'circle'} alt="red" style={{ width: '30vw'}} />}
            {countdown > 1 && <img src={orange} className={countdown === 3 ? 'circle active' : 'circle'} alt="orange" style={{ width: '30vw'}} />}
            {countdown > 1 && <img src={green} className={countdown === 2 ? 'circle active' : 'circle'} alt="green" style={{ width: '30vw'}}/>}
            {countdown === 1 ?<img src={start} alt="start" style={{ width: '40vw'}}/> : <div className='circle blue'></div>}
            <audio ref={audioRef} src={soundStart} />
          </div>
        )}
        <p className='count-timer'>{countdown !== null ? '' : `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</p>
    
        </div>
        <div className='buttons'>
            {!isActive && countdown === null && counter === 1800 && (
                <button onClick={handleStart} className='start'>START TIMER</button>
            )}
            {isActive && (
                <button onClick={handlePauseResume} className='pause'>PAUSE</button>
            )}
            {!isActive && counter < 1800 && (
                <button onClick={handlePauseResume} className='play'>PLAY</button>
            )}
            <button onClick={handleReset} className='restart'>RESTART</button>
        </div>
        <Footer />
      </div>
    );
            }