let canvas;
let world;
let kb;
let gameIsPaused = false;
let assertIsLoaded = false;
const intervalIDs = [];
const allAudios = [];


function disableInGameBtns() {
    pauseImg.src = "img/10_controls/continue.png";
}

function enableInGameBtns() {
    pauseImg.src = "img/10_controls/pause.png";
}

function soundOff(){
    soundImgs.forEach(soundImg => {
        soundImg.src = "img/10_controls/sound-off.png";
    });
    muteAllAudios();
}


function soundOn() {
    if(audioUnlocked) {
        unMuteAllAudios();
        soundImgs.forEach(soundImg => {
            soundImg.src = "img/10_controls/sound-on.png";
        });
    }
}

function pauseGame(){
    if(!gameIsPaused) {
        gameIsPaused = true;
        disableInGameBtns();
        // soundOff();
    } else {
        gameIsPaused = false;
        enableInGameBtns();
        // soundOn();
    } 
}


function stopGame(isWon) {
    intervalIDs.forEach(clearInterval);
    document.getElementById("canvas-overlay").style.display = "block";

    if (!isWon) {
        ASSERTS["audios"][GAME_LOST_PATH].play();
        showScreen(lostEndScreen);
    } else {
        ASSERTS["audios"][GAME_WON_PATH].play();
        showScreen(wonEndScreen);
    }

    setTimeout3000(() => {
        document.getElementById("canvas-overlay").style.display = "none";
        showScreen(startScreen);
    });
}


function quitGame() {
    gameIsPaused = true;
    showScreen(confirmScreen);
}


function resumeGame(){
    lastShowedScreen = null;
    gameIsPaused = false;
    confirmScreen.classList.add("d-none");
}


function startLoading() {
    if (assertIsLoaded) {
        startScreen.classList.add("d-none");
        startGame();
    } else {
        assertIsLoaded = true;
        showScreen(loadingScreen);
        loadAssets((images, audios) => {
            ASSERTS["images"] = images;
            ASSERTS["audios"] = audios;
            loadingScreen.classList.add("d-none");
            startGame();
        });
    }
}


function startGame() { 
    gameIsStarted = true;
    

    ASSERTS["audios"][AUDIO_BG_MUSIC].loop = true;
    ASSERTS["audios"][AUDIO_BG_MUSIC].currenTime = 0;
    ASSERTS["audios"][AUDIO_BG_MUSIC].play();
    
    initGameElements();
    initLevel();
    initCanvasAndKeyBoard();
}


function initGameElements() {
    enemies = [];
    endBoss = null;
    clouds = [];
    backgrounds = [];
    coins = [];
    groundBottles = [];

    addEnemies();
    createEndBoss();
    addClouds();
    addBgs();
    addCoins();
    addGroundBottles();
    addKeydownEventListener();
    addMobielButtonEventListener() ;
    addKeyUpEventListener();
}


function initLevel(){
    LEVEL1 = new Level(
        enemies,
        endBoss,
        clouds,
        backgrounds,
        coins,
        groundBottles
    );
}

function initCanvasAndKeyBoard() {
    canvas = document.getElementById("canvas");

    kb = new Keyboard();
    world = new World(canvas, kb);
}

function addMobielButtonEventListener(){
    document.querySelectorAll(".mobile-control-btn").forEach((btn)=>{
        btn.addEventListener("touchstart", ()=>{
            if(btn.id == "mobile-left") {
                kb.LEFT = true;
            } else if(btn.id == "mobile-right") {
                kb.RIGHT = true;
            } else if(btn.id == "mobile-jump") {
                kb.SPACE = true;
            } else if (btn.id == "mobile-throw") {
                kb.D = true;
                world.characterShoot();
            }
            
        })

        btn.addEventListener("touchend", ()=>{
            if(btn.id == "mobile-left") {
                kb.LEFT = false;
            } else if(btn.id == "mobile-right") {
                kb.RIGHT = false;
            } else if(btn.id == "mobile-jump") {
                kb.SPACE = false;
            } else if (btn.id == "mobile-throw") {
                kb.D = false;
                if (world) {
                    world.character.isShooting = false;
                }
            }
        })
    })
}


function addKeydownEventListener (){
    addEventListener("keydown", (event) => {
        if(kb) {
            switch (event.code) {
                case ARROW_LEFT:
                    kb.LEFT = true;
                    break;
                case ARROW_RIGHT:
                    kb.RIGHT = true;
                    break;
                case SHOT:
                    kb.D = true;
                    if (world) {
                        world.character.isShooting = false;
                    }
                    break;
                case ARROW_DOWN:
                    kb.DOWN = true;
                    break;
                case ARROW_UP:
                    kb.SPACE = true;
                    break;
                default:
                    break;
            } 
        }
    })
}


function addKeyUpEventListener (){
    addEventListener("keyup", (event) => {
        if(kb) {
            switch (event.code) {
                case ARROW_LEFT:
                    kb.LEFT = false;
                    break;
                case ARROW_RIGHT:
                    kb.RIGHT = false;
                    break;
                case SHOT:
                    kb.D = false;
                    if (world) {
                        world.character.isShooting = false;
                    }
                    break;
                case ARROW_DOWN:
                    kb.DOWN = false;
                    break;
                case ARROW_UP:
                    kb.SPACE = false;
                    break;
                default:
                    break;
            
            } 
        }
    })
}




