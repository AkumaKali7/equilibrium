export class Balance {
    constructor() {
        this.value = 0; // 0 is perfect balance, -100 full shadow, +100 full light
    }

    shift(amount) {
        this.value = Math.max(-100, Math.min(100, this.value + amount));
    }

    draw(renderer) {
        const ctx = renderer.ctx;
        const barWidth = 200;
        const barHeight = 20;
        const x = (ctx.canvas.width - barWidth) / 2;
        const y = 20;

        // Background bar
        ctx.fillStyle = '#555';
        ctx.fillRect(x, y, barWidth, barHeight);

        // Fill based on balance
        const fillX = x + barWidth / 2;
        if (this.value > 0) {
            ctx.fillStyle = '#ffff66'; // light side
            ctx.fillRect(fillX, y, (this.value / 100) * (barWidth / 2), barHeight);
        } else if (this.value < 0) {
            ctx.fillStyle = '#6633ff'; // shadow side
            ctx.fillRect(fillX + (this.value / 100) * (barWidth / 2), y, -(this.value / 100) * (barWidth / 2), barHeight);
        }

        // Outline
        ctx.strokeStyle = '#fff';
        ctx.strokeRect(x, y, barWidth, barHeight);
    }
}
