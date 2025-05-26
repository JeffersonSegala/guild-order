import React, { useState, useRef, useEffect } from 'react';
import Window from '../Window/Window';

const LastLoreKeeper = () => {
  const INITIAL_TIME = 150;
  const MAX_TIME = 1020; // 17 minutos

  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);
  const alertedRef = useRef(false);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  useEffect(() => {
    if (timeLeft < 110 && !alertedRef.current) {
      playBeep();
      alertedRef.current = true;
    }
    if (timeLeft >= 110) {
      alertedRef.current = false;
    }
    if (timeLeft === 0) {
      setIsRunning(false);
    }
  }, [timeLeft]);

  const handleStart = () => {
    if (!isRunning && timeLeft > 0) {
      setIsRunning(true);
    }
  };

  const handleAdd40 = () => {
    setTimeLeft((prev) => Math.min(prev + 40, 150));
  };

  const handleAdd550 = () => {
    setTimeLeft((prev) => prev + 550);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(INITIAL_TIME);
    clearInterval(timerRef.current);
    alertedRef.current = false;
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const playBeep = () => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(880, audioCtx.currentTime);
    oscillator.connect(audioCtx.destination);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.4);
  };

  const getBarColor = () => {
    if (timeLeft > 150) return 'rgb(235 174 37)';
    if (timeLeft >= 110) return 'rgb(28 59 170)';
    return 'green';
  };

  const getBarWidth = () => {
    const percentage = (timeLeft / MAX_TIME) * 100;
    return `${Math.min(percentage, 100)}%`;
  };

  return (
    <Window title={'The Last Lore Keeper helper'} isOpen={false} >
      <p>
        * Tempo inicial: 2 min 30 seg (tempo máximo, matar os minibosses com mais de 110 segundos restantes resulta em "perda" de tempo)  <br/>
        * Kill de miniboss: + 40 seg <br/>
        * Last Lore Keeper: + 9 min 10 seg <br/>
      </p>
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>
        Tempo Restante: {formatTime(timeLeft)}
      </h1>

      <div style={{ position: 'relative', width: '100%', height: '24px', backgroundColor: '#ccc', borderRadius: '4px', overflow: 'hidden', marginTop: '10px' }}>
        <div
          style={{
            width: getBarWidth(),
            height: '100%',
            backgroundColor: getBarColor(),
            transition: 'width 0.5s'
          }}
        ></div>
        <span style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontWeight: 'bold'
        }}>
          {timeLeft}s
        </span>
      </div>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
        <button onClick={handleStart} disabled={isRunning || timeLeft === 0}>
          Iniciar
        </button>
        <button onClick={handleAdd40} disabled={!isRunning}>
          +40s
        </button>
        <button onClick={handleAdd550} disabled={!isRunning}>
          +550s
        </button>
        <button onClick={handleReset}>
          Resetar
        </button>
      </div>
    </div>
    </Window>
  )

}

export default LastLoreKeeper