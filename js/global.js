
// asserts
const ASSERTS = {};
const AUDIOS = [];

const CANVAS_HEIGHT = 480;
const CANVAS_WIDTH = 720;



// KEYBOARD
const ARROW_LEFT = "KeyA";
const ARROW_RIGHT = "KeyD";
const ARROW_UP = "KeyW";
const ARROW_DOWN = "KeyS";
const SHOT = "KeyJ";

// GRAPHICS
const CHICKEN_NUM = 10;
const SMALL_CHICKEN_NUM = 10;
const CLOUD_NUM = 10;
const BACKGROUND_NUM = 6;
const COIN_NUM = 10;
const GROUNDBOTTLE_NUM = 15;

// LEVEL
let LEVEL1 = null;
const LEVEL_1_END_X = (BACKGROUND_NUM - 1) * 720 + 20;
const GAME_TIME = 60;


// Paths
const SALSA_BOTTLE_PATH = "img/6_salsa_bottle/salsa_bottle.png";
const COIN_PATH = "img/8_coin/coin_1.png";
const BUTTON_AUDIO_PATH = "audio/button-hover.mp3";
const TYPING_AUDIO_PATH = "audio/typing.wav";
const GAME_LOST_PATH = "audio/game_lost.mp3";
const GAME_WON_PATH = "audio/game_won.mp3";
const AUDIO_BG_MUSIC = "audio/bg_music.wav";
let TYPING_AUTIO = new Audio(TYPING_AUDIO_PATH);
TYPING_AUTIO.muted = true;
AUDIOS.push(TYPING_AUTIO);



// Story
const STORYLINES = [
    "In a peaceful farming valley nestled between two volcanoes, chickens lived a quiet, clucking life.",
    "That is, until a freak meteor storm collided with the coop’s feeding silo, unleashing a strange cosmic energy that transformed one ordinary chicken into... El Pollo Loco – the Mad Chicken.",
    "Once a mild-mannered hen, El Pollo Loco was granted unnatural speed, strength, and an unrelenting thirst for power.",
    "Driven mad by the surge, she began building an army of mutated poultry, robotic egg drones, and pecking minions to conquer the valley — and then the world.",
    "You are a lone farmhand, the last defender of Cluckridge, armed with little more than your reflexes, a slingshot, and some very determined boots.",
    "Fight your way through crazed chicken hordes, dodge explosive eggs, and confront El Pollo Loco herself in her lair atop Mount Feathermore.",
    "The fate of the coop — and the world — depends on you."
  ];

  // Timer Color
  const TIMER_NOMRAL = "rgb(0, 0, 0)";
  const TIMER_WARNING = "rgb(248, 204, 70)";
  const TIMER_URGENT = "rgb(210, 81, 81)";
