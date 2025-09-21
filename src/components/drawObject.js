
export const drawBall =(ctx, ball)=>{
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
    ctx.fillStyle = "red"
    ctx.fill()
    ctx.closePath();
}

export const drawPaddle =(ctx, paddle)=>{
    ctx.fillStyle="white"
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height)

}


export const drawBricks = (ctx, bricks)=>{   
    bricks.forEach(brick => {
        if(!brick.isDestroyed){
            ctx.fillStyle=brick.color
            ctx.fillRect(brick.x, brick.y, brick.width, brick.height)
        }
    });

}