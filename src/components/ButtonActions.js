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

    const {lives, setScore, setLives, setIsPaused} = useContext(UserContext)

    const pauseGame =()=>{
        setIsPaused(true);
    }
    const startGame =()=>{
        setIsPaused(false);
    }
    const resetGame =()=>{
        reStart();
        setIsPaused(false);
        setScore(0);
        setLives(3);
    }

    return (
        <div className='flex justify-around m-4'>
            <Button btnName="Pause" btnHandler={pauseGame}/>
            <Button btnName="Start" btnHandler={startGame} className={(lives <= 0) ? 'cursor-default pointer-events-none' : 'cursor-pointer pointer-events-auto'}/>
            <Button btnName="Restart" btnHandler={resetGame}/>
        </div>
    )
}

export default ButtonActions