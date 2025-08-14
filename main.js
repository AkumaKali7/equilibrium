import { Game } from './src/game.js';

window.onload = () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    const game = new Game(ctx);
    game.start();
};
