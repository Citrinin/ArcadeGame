export default class Fruit {
    constructor(gameState) {
        this.width = 20;
        this.height = 20;
        this.game = gameState;
        this.generatePosition();
        this.sprite = this.generateSptite();
    }
    getNextSprite() {
        return this.sprite;
    }
    generatePosition() {
        do {
            this.position = {
                x: Math.abs(this.width - this.game.width * Math.random()),
                y: this.game.height / 2 * Math.random()
            };
        } while (this.getDistanceToHero() < 200);
    }
    getDistanceToHero() {
        let hero = this.game.hero;
        return Math.sqrt(Math.pow(hero.position.x - this.position.x, 2) + Math.pow(hero.position.y - this.position.y, 2));
    }
    generateSptite() {
        let sprites = document.querySelectorAll('.fruit-img');
        let fruitNumber = Math.round(Math.random() * (sprites.length - 1));
        return sprites[fruitNumber];
    }
}