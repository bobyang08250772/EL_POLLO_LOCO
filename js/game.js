let canvas;
let world;
let kb;
let intervalIDs = [];
let allloadedImgs =  [];

// var promiseArray = allloadedImgs.map(function(img){
//     var prom = new Promise(function(resolve,reject){
 
//         img.onload = function(){
//             resolve();
//         };
//     });
//     return prom;
//  });


function init() {
    canvas = document.getElementById("canvas");
    kb = new Keyboard();
    world = new World(canvas, kb);
}


function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIDs.push(id);

    return id;
}


function stopGame() {
    intervalIDs.forEach(clearInterval);
}


function startGame() {
    initLevel();
}


addEventListener("keydown", (event) => {
    console.log(event.code);
    
    switch (event.code) {
        case ARROW_LEFT:
            kb.LEFT = true;
            break;
        case ARROW_RIGHT:
            kb.RIGHT = true;
            break;
        case SHOT:
            kb.D = true;
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
})


addEventListener("keyup", (event) => {
    switch (event.code) {
        case ARROW_LEFT:
            kb.LEFT = false;
            break;
        case ARROW_RIGHT:
            kb.RIGHT = false;
            break;
        case SHOT:
            kb.D = false;
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
})

