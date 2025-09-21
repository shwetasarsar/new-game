export const createInitialBall = ()=>({
    x: 400,
    y: 450,
    radius: 20,
    speedX: 6,
    speedY: -6
});

export const createInitialPaddle =()=>({
    x: 250,
    y: 500,
    width: 300,
    height: 20,
    speed: 0
})



export const bricksContainer ={
    row: 6,
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
    const colorObj = [
        {color: 'red', score: 30},
        {color: 'orange', score: 20},
        {color: 'green', score: 10}
    ]
    const bricksPerCol = 2;
    

    for (let row = 0; row < box.row; row++) {
        const colorIndex = Math.floor(row / bricksPerCol);
        for (let col = 0; col < box.col; col++) {
            bricks.push({
                x: col * (box.width + box.padding) + box.offsetLeft,
                y: row * (box.height + box.padding) + box.offsetTop,
                width: box.width,
                height: box.height,
                isDestroyed: false,
                color: colorObj[colorIndex].color,
                score: colorObj[colorIndex].score
            });
        }
    }

    return bricks;
}