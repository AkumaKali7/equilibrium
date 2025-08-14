import { Balance } from '../balance.js';
import { Particles } from '../particles.js';

export class ExamplePuzzle {
    constructor() {
        this.playerX = 100;
        this.playerY = 100;
        this.items = [
            { type: 'light_rune', x: 300, y: 200 },
            { type: 'shadow_crystal', x: 500, y: 400 }
        ];
        this.balance = new Balance();
        this.particles = new Particles();
        this.warningTimer = 0;
    }

    update(delta, input) {
        const speed = 200;
        if (input.isPressed('ArrowUp')) this.playerY -= speed * delta;
        if (input.isPressed('ArrowDown')) this.playerY += speed * delta;
        if (input.isPressed('ArrowLeft')) this.playerX -= speed * delta;
        if (input.isPressed('ArrowRight')) this.playerX += speed * delta;

        // Collision check
        for (let i = this.items.length - 1; i >= 0; i--) {
            const item = this.items[i];
            if (Math.abs(this.playerX - item.x) < 40 && Math.abs(this.playerY - item.y) < 40) {
                if (item.type === 'light_rune') {
                    this.balance.shift(20);
                    this.particles.spawn(item.x + 32, item.y + 32, '#ffff66');
                }
                if (item.type === 'shadow_crystal') {
                    this.balance.shift(-20);
                    this.particles.spawn(item.x + 32, item.y + 32, '#9933ff');
                }
                this.items.splice(i, 1);
            }
        }

        // Warning check
        if (Math.abs(this.balance.value) >= 70) {
            this.warningTimer += delta * 4; // blinking
        } else {
            this.warningTimer = 0;
        }

        this.particles.update(delta);
    }

    draw(renderer) {
        renderer.drawImage('player', this.playerX, this.playerY);

        for (const item of this.items) {
            renderer.drawImage(item.type, item.x, item.y);
        }

        this.particles.draw(renderer);
        this.balance.draw(renderer);

        renderer.drawText('Collect runes to change balance', 20, 60);

        // Draw warning if imbalance
        if (Math.abs(this.balance.value) >= 70 && Math.floor(this.warningTimer) % 2 === 0) {
            renderer.drawText('⚠ IMBALANCE ⚠', renderer.ctx.canvas.width / 2 - 60, 80, 'red');
        }
    }
}
