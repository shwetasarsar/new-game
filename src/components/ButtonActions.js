import React, { useContext } from 'react';
import UserContext from '../utils/UserContext';

const Button =({btnName, btnHandler, className})=>{
    return (
        <button className={`sm:text-sm md:text-[20px] border border-gray-400 rounded-lg w-[92px] py-2 hover:bg-gray-500 hover:text-white ${className} hover:shadow-lg`} 
        onClick={()=>btnHandler()}>
            {btnName}
        </button>
    )
}

const ButtonActions = ({reStart}) => {

    const {lives, isPaused, setScore, setLives, setIsPaused} = useContext(UserContext)

    const pauseGame =()=>{
        setIsPaused(prev => !prev);
    }
    const startGame =()=>{
        setIsPaused(false);
        setScore(0);
        setLives(prev => {
            let current = prev - 1;
            if(current <= 0){
                return 0;
            }
            else{
                return current;
            }
        })
        reStart();
    }
    const resetGame =()=>{
        setIsPaused(false);
        setScore(0);
        setLives(3);
        reStart();
    }

    return (
        <div className='flex justify-around m-4'>
            <Button btnName={isPaused ? "Resume": "Pause"} btnHandler={pauseGame} className={(lives <= 0) ? 'cursor-default pointer-events-none' : 'cursor-pointer pointer-events-auto'}/>
            <Button btnName="Start" btnHandler={startGame} className={(lives <= 0) ? 'cursor-default pointer-events-none' : 'cursor-pointer pointer-events-auto'}/>
            <Button btnName="Restart" btnHandler={resetGame}/>
        </div>
    )
}

export default ButtonActions