

let enemies = [];
for (let index = 0; index <=  CHICKEN_NUM; index++) {
    enemies.push(new Chicken());
}
enemies.push(new Endboss());


let clouds = [];
for (let index = 0; index <= CLOUD_NUM; index++) {
    clouds.push(new Cloud());
}


let backgrounds = [];
for (let index = 0; index <= BACKGROUND_NUM; index++) {
    let imgNumber = (index + 1) % 2 + 1;
    let x = 719 * (index - 1);
    backgrounds.push(new BackgroundObject(`img/5_background/layers/air.png`, x));
    backgrounds.push(new BackgroundObject(`img/5_background/layers/3_third_layer/${imgNumber}.png`, x));
    backgrounds.push(new BackgroundObject(`img/5_background/layers/2_second_layer/${imgNumber}.png`, x))
    backgrounds.push(new BackgroundObject(`img/5_background/layers/1_first_layer/${imgNumber}.png`, x));
}

let coins = [];
for (let index = 0; index < COIN_NUM; index++) {
    coins.push(new Coin());
}

let groundBottles = [];
for (let index = 0; index < GROUNDBOTTLE_NUM; index++) {
    groundBottles.push(new GroundBottle());
}


const level1 = new Level(
    enemies,
    clouds,
    backgrounds,
    coins,
    groundBottles
);

