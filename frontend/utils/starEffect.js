class StarEffect {
    constructor(canvas, numStars = 200) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.stars = [];
        this.numStars = numStars;
        
        this.init();
        this.animate();
    }

    init() {
        for (let i = 0; i < this.numStars; i++) {
            // Décider si l'étoile sera sur le bord vertical ou horizontal
            const onVerticalEdge = Math.random() < 0.5;
            let x, y;

            if (onVerticalEdge) {
                // Placer l'étoile sur les bords gauche ou droit
                x = Math.random() < 0.5 ? 
                    Math.random() * 20 : // Bord gauche
                    this.canvas.width - Math.random() * 20; // Bord droit
                y = Math.random() * this.canvas.height;
            } else {
                // Placer l'étoile sur les bords haut ou bas
                x = Math.random() * this.canvas.width;
                y = Math.random() < 0.5 ? 
                    Math.random() * 20 : // Bord supérieur
                    this.canvas.height - Math.random() * 20; // Bord inférieur
            }

            // Ajouter une chance de 5% d'avoir une étoile ailleurs sur le canvas
            if (Math.random() < 0.05) {
                x = Math.random() * this.canvas.width;
                y = Math.random() * this.canvas.height;
            }

            this.stars.push({
                x,
                y,
                size: Math.random() * 3,
                opacity: Math.random() *2,
                speed: 0.01 + Math.random() * 0.02
            });
        }
    }

    drawStar(star) {
        this.ctx.beginPath();
        this.ctx.fillStyle = `rgba(236, 236, 240, ${star.opacity})`;
        this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        this.ctx.fill();
    }

    animate = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.stars.forEach(star => {
            star.opacity += star.speed;
            if (star.opacity > 1 || star.opacity < 0) star.speed = -star.speed;
            this.drawStar(star);
        });

        requestAnimationFrame(this.animate);
    }
}

export default StarEffect;
