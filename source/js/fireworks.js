(function () {
    var canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;top:0;left:0;z-index:99999999;pointer-events:none;';
    document.body.appendChild(canvas);
    var ctx = canvas.getContext('2d');
    var particles = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    function Particle(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 1.5 + 0.5; // 极细颗粒
        this.speedX = (Math.random() - 0.5) * 5;
        this.speedY = (Math.random() - 0.5) * 5;
        this.color = 'hsl(' + (Math.random() * 360) + ', 70%, 80%)'; // 高级淡色调
        this.alpha = 1;
        this.decay = Math.random() * 0.015 + 0.015; // 细腻的消失感
    }

    Particle.prototype.update = function () {
        this.x += this.speedX;
        this.y += this.speedY;
        this.speedY += 0.05; // 微重力
        this.alpha -= this.decay;
    };

    Particle.prototype.draw = function () {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    };

    function render() {
        // 关键：这里不完全清除画布，而是覆盖一层极薄的黑/透明，产生拖尾效果
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'lighter';

        for (var i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            if (particles[i].alpha <= 0) {
                particles.splice(i, 1);
                i--;
            }
        }
        requestAnimationFrame(render);
    }

    render();

    window.addEventListener('mousedown', function (e) {
        for (var i = 0; i < 30; i++) { // 增加粒子数量但减小体积
            particles.push(new Particle(e.clientX, e.clientY));
        }
    });
})();