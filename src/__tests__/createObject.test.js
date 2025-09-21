import { createInitialBall, createInitialBricks, createInitialPaddle, bricksContainer } from "../components/createObject";

describe('create initial object', ()=>{

it('should return initial ball state correctly', ()=>{
    const ball = createInitialBall();

    expect(ball).toEqual({
        x: 400,
        y: 450,
        radius: 20,
        speedX: 6,
        speedY: -6
    });
})

it('should return initial paddle state correctly', ()=>{
    const paddle = createInitialPaddle();

    expect(paddle).toEqual({
        x: 250,
        y: 500,
        width: 300,
        height: 20,
        speed: 0
    })
})

it('should return initial bricks state correctly', ()=>{
    const box = bricksContainer;
    const bricks = createInitialBricks();
    const totalBricks = box.row * box.col;
    const firstBrick = bricks[0];

    expect(box).toEqual({
        row: 6,
        col: 7,
        width: 100,
        height: 50,
        padding: 10,
        offsetLeft: 30,
        offsetTop: 30
    })
    expect(bricks.length).toBe(totalBricks);
    expect(firstBrick).toEqual({
        x: box.offsetLeft,
        y: box.offsetTop,
        width: box.width,
        height: box.height,
        isDestroyed: false,
        color: 'red',
        score: 30
    })
})

})