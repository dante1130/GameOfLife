import GameOfLife from './gameoflife.js';

$(() => {
    const canvas = $("#canvas");
    const ctx = canvas[0].getContext("2d");

    const width = canvas.width = window.innerWidth;
    const height = canvas.height = window.innerHeight;

    const game = new GameOfLife(width, height);

    let fps = 5;
    let interval = 1000 / fps;
    let prevTime = 0;

    game.init();

    ctx.fillStyle = "#DDDDDD";

    ctx.scale(4, 4);

    const draw = () => {
        let currTime = Date.now();

        let delta = currTime - prevTime;

        if (delta > interval) {
            prevTime = currTime - (delta % interval);

            ctx.clearRect(0, 0, width, height);

            game.update();

            $("#generation").text(game.generation);

            for (let x = 0; x < game.width; ++x) {
                for (let y = 0; y < game.height; ++y) {
                    if (game.cells[x][y].isAlive) {
                        ctx.beginPath();
                        ctx.rect(x, y, 1, 1);
                        ctx.fill();
                        ctx.closePath();
                    }
                }
            }
        }
        
        window.requestAnimationFrame(draw);
    }

    window.requestAnimationFrame(draw);
});
