export class Renderer {
    constructor(ctx) {
        this.ctx = ctx;
        this.assets = {};

        // Preload placeholder assets
        this.loadImage('player', './assets/images/player.png');
        this.loadImage('light_rune', './assets/images/light_rune.png');
        this.loadImage('shadow_crystal', './assets/images/shadow_crystal.png');
    }

    loadImage(name, src) {
        const img = new Image();
        img.src = src;
        this.assets[name] = img;
    }

    clear() {
        this.ctx.fillStyle = '#222';
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    drawImage(name, x, y) {
        if (this.assets[name]) {
            this.ctx.drawImage(this.assets[name], x, y);
        }
    }

    drawText(text, x, y, color = 'white') {
        this.ctx.fillStyle = color;
        this.ctx.font = '20px Arial';
        this.ctx.fillText(text, x, y);
    }
}
