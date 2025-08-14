import { Balance } from '../balance.js';
import { Particles } from '../particles.js';

class AnimatedRune {
    constructor(type, x, y) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.baseY = y; // for floating effect
        this.time = Math.random() * 2 * Math.PI; // staggered start
        this.radius = 20;
        this.color = type === 'light_rune' ? '#ffff66' : '#9933ff';
    }

    update(delta) {
        this.time += delta * 2; // speed of float/pulse
        this.y = this.baseY + Math.sin(this.time) * 5; // vertical float
    }

    draw(ctx) {
        const r = this.radius + Math.sin(this.time * 5) * 5; // pulsing radius
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x + 32, this.y + 32, r, 0, Math.PI * 2);
        ctx.fill();
    }
}

export class ExamplePuzzle {
    constructor() {
        this.playerX = 100;
        this.playerY = 100;
        this.items = [];
        this.balance = new Balance();
        this.particles = new Particles();
        this.warningTimer = 0;

        this.spawnTimer = 0;
        this.spawnInterval = 2;
        this.maxItems = 5;
    }

    spawnRune() {
        if (this.items.length >= this.maxItems) return;
        const type = Math.random() > 0.5 ? 'light_rune' : 'shadow_crystal';
        const x = Math.random() * (800 - 64);
        const y = Math.random() * (600 - 64);
        this.items.push(new AnimatedRune(type, x, y));
    }

    update(delta, input) {
        const speed = 200;
        if (input.isPressed('ArrowUp')) this.playerY -= speed * delta;
        if (input.isPressed('ArrowDown')) this.playerY += speed * delta;
        if (input.isPressed('ArrowLeft')) this.playerX -= speed * delta;
        if (input.isPressed('ArrowRight')) this.playerX += speed * delta;

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
            } else {
                item.update(delta);
            }
        }

        this.spawnTimer += delta;
        if (this.spawnTimer >= this.spawnInterval) {
            this.spawnRune();
            this.spawnTimer = 0;
        }

        if (Math.abs(this.balance.value) >= 70) {
            this.warningTimer += delta * 4;
        } else {
            this.warningTimer = 0;
        }

        this.particles.update(delta);
    }

    draw(renderer) {
        renderer.drawImage('player', this.playerX, this.playerY);

        const ctx = renderer.ctx;
        for (const item of this.items) {
            item.draw(ctx);
        }

        this.particles.draw(renderer);
        this.balance.draw(renderer);

        renderer.drawText('Collect runes to change balance', 20, 60);

        if (Math.abs(this.balance.value) >= 70 && Math.floor(this.warningTimer) % 2 === 0) {
            renderer.drawText('⚠ IMBALANCE ⚠', renderer.ctx.canvas.width / 2 - 60, 80, 'red');
        }
    }
}
