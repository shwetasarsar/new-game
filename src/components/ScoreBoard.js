import React, {useContext} from 'react';
import UserContext from '../utils/UserContext';

const ScoreBoard = () => {
 const {score, lives} = useContext(UserContext)
  return (
    <div data-testid="score-board" className='my-2 flex justify-around py-4 border-1 rounded-md shadow-md sm:text-xl md:text-2xl text-black'>
      <p data-testid="score" >Score: {score}</p>
      <p data-testid="lives" >Lives: {lives}</p>
    </div>
  )
}

export default ScoreBoard;