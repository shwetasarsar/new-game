export const createInitialBall = ()=>({
    x: 400,
    y: 450,
    radius: 20,
    speedX: 10,
    speedY: -10
});

export const createInitialPaddle =()=>({
    x: 250,
    y: 500,
    width: 300,
    height: 20,
    speed: 0
})



export const bricksContainer ={
    row: 4,
    col: 7,
    width: 100,
    height: 50,
    padding: 10,
    offsetLeft: 30,
    offsetTop: 30
}

export const createInitialBricks =()=>{
    const bricks = [];
    const box = bricksContainer;

    for (let row = 0; row < box.row; row++) {
        for (let col = 0; col < box.col; col++) {
            bricks.push({
                x: col * (box.width + box.padding) + box.offsetLeft,
                y: row * (box.height + box.padding) + box.offsetTop,
                width: box.width,
                height: box.height,
                isDestroyed: false
            });
        }
    }

    return bricks;
}