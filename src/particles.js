export class Particles {
    constructor() {
        this.particles = [];
    }

    spawn(x, y, color) {
        for (let i = 0; i < 10; i++) {
            this.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 100,
                vy: (Math.random() - 0.5) * 100,
                life: 0.5,
                color: color
            });
        }
    }

    update(delta) {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.life -= delta;
            p.x += p.vx * delta;
            p.y += p.vy * delta;
            if (p.life <= 0) this.particles.splice(i, 1);
        }
    }

    draw(renderer) {
        const ctx = renderer.ctx;
        for (const p of this.particles) {
            ctx.globalAlpha = Math.max(p.life, 0);
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1;
    }
}
