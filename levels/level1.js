

let enemies = [];
let endBoss = null;
let clouds = [];
let backgrounds = [];
let coins = [];
let groundBottles = [];

function addEnemies(){
    for (let index = 1; index <=  CHICKEN_NUM; index++) {
        enemies.push(new Chicken());
    }
    for (let index = 1; index <=  SMALL_CHICKEN_NUM; index++) {
        enemies.push(new SmallChicken());
    }
}

function createEndBoss () {
    endBoss = new EndBoss();
}


function addClouds() {
    for (let index = 1; index <= CLOUD_NUM; index++) {
        clouds.push(new Cloud());
    }    
}


function addBgs() {
    for (let index = 0; index <= BACKGROUND_NUM; index++) {
        let imgNumber = (index + 1) % 2 + 1;
        let x = 719 * (index - 1);
        backgrounds.push(new BackgroundObject(`img/5_background/layers/air.png`, x));
        backgrounds.push(new BackgroundObject(`img/5_background/layers/3_third_layer/${imgNumber}.png`, x));
        backgrounds.push(new BackgroundObject(`img/5_background/layers/2_second_layer/${imgNumber}.png`, x))
        backgrounds.push(new BackgroundObject(`img/5_background/layers/1_first_layer/${imgNumber}.png`, x));
    }
}


function addCoins() {
    for (let index = 1; index < COIN_NUM; index++) {
        coins.push(new Coin());
    }
}



function addGroundBottles() {
    for (let index = 1; index < GROUNDBOTTLE_NUM; index++) {
        groundBottles.push(new GroundBottle());
    }
}




