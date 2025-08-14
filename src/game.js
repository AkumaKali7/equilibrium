import { Renderer } from './renderer.js';
import { Input } from './input.js';
import { ExamplePuzzle } from './puzzles/examplePuzzle.js';

export class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.renderer = new Renderer(ctx);
        this.input = new Input();
        this.lastTime = 0;
        this.puzzle = new ExamplePuzzle();
    }

    start() {
        requestAnimationFrame(this.loop.bind(this));
    }

    loop(timestamp) {
        const delta = (timestamp - this.lastTime) / 1000;
        this.lastTime = timestamp;

        // Update game logic here
        this.puzzle.update(delta, this.input);

        // Render
        this.renderer.clear();
        this.puzzle.draw(this.renderer);

        requestAnimationFrame(this.loop.bind(this));
    }
}
