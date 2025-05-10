
const fullScreenDiv = document.getElementById("fullscreen");
const canvas_script = document.getElementById("canvas");
const fullScreenImg = document.getElementById("full-screen-img");
const legalNoticeBtn = document.getElementById("legal-notice-btn");
let lastShowedScreen =  document.getElementById("start-screen");;

let fullScreenIsOn = false;
let gameIsStarted = false;


function checkOrientation() {
    if (window.matchMedia("(orientation: landscape)").matches) {
        if (window.innerHeight < 480) {
            newHeight = window.innerHeight;
            document.getElementById("canvas").style.height = `${newHeight}px`;
        }
    } else {
        document.getElementById("canvas").style.height = '100%';
    }
}


function isSmallScreen() {
    return window.innerWidth < 700; 
}


window.addEventListener("resize", ()=>{
    if (window.matchMedia("(orientation: landscape)").matches) {
        checkIfGameStarted();
    } else {
        if (window.innerHeight > window.innerWidth && isSmallScreen()) {
            showScreen(rotateScreen);
        } else {
            checkIfGameStarted();
        }
    }
    
}); 


function checkIfGameStarted(){
    if (gameIsStarted) {
        rotateScreen.classList.add("d-none");
        if(lastShowedScreen.id == "confirm-screen" || lastShowedScreen.id == "won-end-screen" || lastShowedScreen.id== "lost-end-screen") {
            showScreen(lastShowedScreen);
        }
    } else {
        showScreen(lastShowedScreen);
    }
}


function toggleFullScreen() {
    if(!fullScreenIsOn) {
        fullScreenIsOn = true;
        fullScreenImg.src = "img/10_controls/fullscreen-off.png";
        legalNoticeBtn.classList.add("d-none");
        enterfullScreen();
    } else {
        closeFullscreen();
        afterUserExistFullScreen();
    }
}




function enterfullScreen() {

    lastShowedScreen = startScreen;
    if (fullScreenDiv.requestFullscreen) {
        fullScreenDiv.requestFullscreen();

    } else if (fullScreenDiv.webkitRequestFullscreen) { /* Safari */
        fullScreenDiv.requestFullscreen();
    } else if (fullScreenDiv.msRequestFullscreen) { /* IE11 */
        fullScreenDiv.msRequestFullscreen();
    }

}


window.addEventListener("fullscreenchange", () => {
    console.log("Fullscreen change detected");
    if (!document.fullscreenElement) {
        afterUserExistFullScreen();
    }
});


/* Close fullscreen */
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
}


function afterUserExistFullScreen(){
    fullScreenIsOn = false;
    fullScreenImg.src = "img/10_controls/fullscreen_on.png";
    legalNoticeBtn.classList.remove("d-none");
}
