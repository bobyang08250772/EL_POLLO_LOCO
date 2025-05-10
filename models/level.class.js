class Level {
    enemies;
    endBoss;
    clouds;
    backgroundObjects;
    coins;
    groundBottles;
    level_end_x = 2900;

    constructor(enemies, endBoss, clouds, backgroundObjects, coins, groundBottles) {
        this.enemies = enemies;
        this.endBoss = endBoss;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.groundBottles = groundBottles;
    }
}