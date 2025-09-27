import React, { useContext, useEffect, useRef, useState } from 'react'
import { drawBall, drawBricks, drawPaddle } from './drawObject';
import { createInitialBall, createInitialBricks, createInitialPaddle } from './createObject';
import ScoreBoard from './ScoreBoard';
import ButtonActions from './ButtonActions';
import UserContext from '../utils/UserContext';


const BricksBreakerGame = () => {
    const [isGameOver, setIsGameOver] = useState(false);
    const [isGameWon, setIsGameWon] = useState(false);
    const {score, lives, isPaused, setScore} = useContext(UserContext);

    const canvasRef = useRef(null);
    let animationRef = useRef(null);
    const isPausedRef = useRef(isPaused);
    const isGameoverRef = useRef(isGameOver);

    const ballRef = useRef(createInitialBall());
    const paddleRef = useRef(createInitialPaddle());
    const bricksRef = useRef(createInitialBricks());


    const draw =(ctx)=>{
        drawBall(ctx, ballRef.current);
        drawPaddle(ctx, paddleRef.current);
        drawBricks(ctx, bricksRef.current);
    }

    const keyDownHandler =(e)=>{
        if(e.key === "ArrowLeft") paddleRef.current.speed = -10;
        if(e.key === "ArrowRight") paddleRef.current.speed = 10;
    }

    const keyUpHandler =(e)=>{
        if(e.key === "ArrowLeft" || e.key === "ArrowRight") paddleRef.current.speed = 0;
    }

    const mouseMoveHandler =(e)=>{
        const paddle = paddleRef.current;
        const canvas = canvasRef.current;

        const mouseX = e.clientX;
        const rect = canvas.getBoundingClientRect();

        paddle.x = mouseX - rect.left - paddle.width / 2;

        if(paddle.x < 0) paddle.x = 0
        if(paddle.x + paddle.width > canvas.width) paddle.x = canvas.width - paddle.width;
    }

    const update =()=>{
        const ball = ballRef.current;
        const paddle = paddleRef.current;
        const canvas = canvasRef.current;

        if(ball.y - ball.radius > canvas.height){
            setIsGameOver(true);
            return ; 
        }

        //move ball
        ball.x += ball.speedX;
        ball.y += ball.speedY;

        //ball hits paddle
        if(ball.x > paddle.x &&
            ball.x < paddle.x + paddle.width &&
            ball.y + ball.radius > paddle.y &&
            ball.y - ball.radius < paddle.y + paddle.height
        ){
            ball.speedY = -ball.speedY;
            const hitpoint = ball.x - (paddle.x + paddle.width/2)
            ball.speedX = hitpoint * 0.15;
        }

        //move paddle
        paddle.x += paddle.speed;
        if(paddle.x < 0) paddle.x=0;
        if((paddle.x + paddle.width) > canvas.width) paddle.x = canvas.width - paddle.width;

        //ball bounce back
        if((ball.x + ball.radius) > canvas.width || (ball.x - ball.radius) < 0) ball.speedX = -ball.speedX;
        if(ball.y - ball.radius < 0 ) ball.speedY = -ball.speedY
    }

    const collision =()=>{
        const ball = ballRef.current;
        const bricks = bricksRef.current;

        bricks.forEach((brick)=>{
            if (brick.isDestroyed) return;
            if(ball.x + ball.radius  > brick.x &&
                ball.x - ball.radius < brick.x+ brick.width &&
                ball.y + ball.radius > brick.y &&
                ball.y - ball.radius < brick.y + brick.height
            ){
                brick.isDestroyed = true;
                ball.speedY = -ball.speedY;
                setScore(prev => prev + brick.score);
            }
        })

        const allBricksDestroyed = bricks.every(brick => brick.isDestroyed);
        if (allBricksDestroyed) {
            setIsGameWon(true);
            cancelAnimationFrame(animationRef.current); // Stop game loop
        }
    }

    const startGame =()=>{
        const canvas = canvasRef.current;
        canvas.width = 800;
        canvas.height = 600;
        const ctx = canvas.getContext('2d');

        const gameLoop =()=>{
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            if(!isPausedRef.current){
                draw(ctx);
                update();
                collision();
            }
            else{
                draw(ctx);
            }
            if(!isGameoverRef.current){
                animationRef.current = requestAnimationFrame(gameLoop);
            }
        }

        animationRef.current = requestAnimationFrame(gameLoop);
    }

    useEffect(()=>{
        const canvas = canvasRef.current;
        canvas.width = 800;
        canvas.height = 600;
        const ctx = canvas.getContext('2d');
        draw(ctx);

        document.addEventListener('keydown', keyDownHandler);
        document.addEventListener('keyup', keyUpHandler);
        document.addEventListener('mousemove', mouseMoveHandler);

        return ()=> {
            cancelAnimationFrame(animationRef.current)
            document.removeEventListener('keydown', keyDownHandler);
            document.removeEventListener('keyup', keyUpHandler);
            document.removeEventListener('mousemove', mouseMoveHandler);
        }
        
    }, []);

    useEffect(()=>{
        isGameoverRef.current = isGameOver;
        if(isGameOver){
            cancelAnimationFrame(animationRef.current)
        }
    }, [isGameOver])

    useEffect(()=>{
        isPausedRef.current = isPaused;
    }, [isPaused])

    const resetGame=()=>{
        cancelAnimationFrame(animationRef.current)
        ballRef.current = createInitialBall()
        paddleRef.current = createInitialPaddle()
        bricksRef.current = createInitialBricks()

        // Reset states
        setIsGameOver(false);
        isPausedRef.current = false;

        // Start loop again
        startGame();

    }

    return (
        <div data-testid="bricks-game" className='w-6/12 mx-auto box-border'>
            <ScoreBoard />
            {isGameWon && <h1 className='text-blue-500 text-center font-bold text-lg mt-4'>You win the game with Score: {score} </h1>}
            {(lives <= 0 && isGameOver) && <h1 className='text-red-500 text-center font-bold text-lg mt-4'>You have lost the game with a score of: {score} </h1>}
            <canvas data-testid="canvas" ref={canvasRef} className='bg-black mt-4 w-[100%] block'/>
            <ButtonActions reStart={resetGame} />
        </div>
    )
}

export default BricksBreakerGame;