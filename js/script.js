

const loadingBtn = document.getElementById("loading-btn");
const gameTimerDiv = document.getElementById("game-timer");
let startScreen = document.getElementById("start-screen");
let soundImgs = document.querySelectorAll(".sound-img");
let pauseImg = document.getElementById("pause-img");
let pauseBtnInGame = document.getElementById("pause-btn-in-game");
let soundBtnInGame = document.getElementById("sound-btn-in-game");
let controlScreen = document.getElementById("control-screen");
let loadingScreen = document.getElementById("loading-screen");
let storyScreen = document.getElementById("story-screen");
let canvasScreen = document.getElementById("canvas-screen");
let rotateScreen = document.getElementById("rotate-screen");
let lostEndScreen = document.getElementById("lost-end-screen");
let wonEndScreen = document.getElementById("won-end-screen");
let confirmScreen = document.getElementById("confirm-screen");

let storyP = document.getElementById("story-p");
let skipBtn = document.getElementById("skip-btn");
let storyLineId = 0;
let charIndex = 0;
let typingIntervalId;
let isSkipping = false;
let lastAudio;
let audioUnlocked = false;
const mouseEnterHandlers = new Map(); 

function init() {
    
    addButtonHoverEventListener();
    if (window.innerHeight > window.innerWidth && isSmallScreen()) {
        showScreen(rotateScreen);
    } else {
        checkIfGameStarted();
    }
}


function showScreen(currentScreen) {
    document.querySelectorAll(".game-screen").forEach(screen => {
        screen.classList.add("d-none");
    });

    currentScreen.classList.remove("d-none");
    if (currentScreen.id !== "rotate-screen") {
        lastShowedScreen = currentScreen;
    }
}


function goToControlScreen(){
    showScreen(controlScreen);
}


function goToBgstoryScreen(){
    showScreen(storyScreen);

    storyLineId = 0;
    charIndex = 0;
    isSkipping = false;
    skipBtn.innerText = "Skip";
    skipBtn.onclick = skipTyping;

    startStoryTelling();
}


function skipTyping() {
    isSkipping = true;
    setTimeout(() => {
        isSkipping = false;
    }, 100);
}


function typeLine(line, onComplete) {
    charIndex = 0;
    storyP.textContent = '';

    typingIntervalId = setTypingInterval(line, onComplete);
}


function setTypingInterval(line, onComplete) {
    return setInterval(() => {
        if (isSkipping) {
            clearInterval(typingIntervalId);
            storyP.textContent = line;
            setTimeout(onComplete, 500);
            return;
        }
        storyP.textContent += line.charAt(charIndex);
        charIndex++;
        TYPING_AUTIO.play();
        if (charIndex >= line.length) {
            clearInterval(typingIntervalId);
            setTimeout(onComplete, 1000);
        }
    }, 40);
}


function startStoryTelling() {
    function showNextLine() {
        if (storyLineId >= STORYLINES.length) {
            skipBtn.innerText = "Start";
            skipBtn.onclick = startLoading;
            return;
        }
        const currentLine = STORYLINES[storyLineId];
        storyLineId++;
        typeLine(currentLine, showNextLine);
    }

    showNextLine();
}



function goBackToStartScreen() {
    gameIsStarted = false;
    gameIsPaused = false;
    stopBgMusic();
    intervalIDs.forEach(clearInterval);
    if(typingIntervalId) clearInterval(typingIntervalId);

    showScreen(startScreen);
}


function setLoadingBtnText(loadingPercentage, loadingText) {
    loadingBtn.innerText = `${loadingText} are loading ... ${loadingPercentage}%`;
}


function stopBgMusic() {
       

    ASSERTS["audios"][AUDIO_BG_MUSIC].pause();
    ASSERTS["audios"][AUDIO_BG_MUSIC].currenTime = 0;
       
}


function muteAllAudios() {
    AUDIOS.forEach(a => {
        a.muted = true;
    });
}


function unMuteAllAudios() {
    AUDIOS.forEach(a => {
        a.muted = false;
    });
}


function enableSound() {
    if (!audioUnlocked) {
        audioUnlocked = true;
        soundImgs.forEach(soundImg => {
            soundImg.src = "img/10_controls/sound-on.png";
        });
        unMuteAllAudios();
    } else {
        audioUnlocked = false;
        soundImgs.forEach(soundImg => {
            soundImg.src = "img/10_controls/sound-off.png";
        });
        muteAllAudios();
    }
}


function addButtonHoverEventListener() {
    const btns = document.querySelectorAll(".sound-btn");
    btns.forEach(btn => {
        addButtonMouseEnter(btn);
    });
}


function createMouseEnterHandler(btn) {
    return function mouseEnterHandler() {
        if (!audioUnlocked) return;
        if (lastAudio) {
            lastAudio.pause();
        }
        createButtionClickAudio();
    };
}


function addButtonMouseEnter(btn) {
    const handler = createMouseEnterHandler(btn);
    mouseEnterHandlers.set(btn, handler);
    btn.addEventListener("mouseenter", handler);
}


function removeButtonMouseEnter(btn) {
    const handler = mouseEnterHandlers.get(btn, handler);
    btn.removeEventListener("mouseenter", handler);
}


function createButtionClickAudio(){
    const bAudio = new Audio(BUTTON_AUDIO_PATH);
    AUDIOS.push(bAudio);
    bAudio.currentTime = 0;
    bAudio.play().then(() => {
        lastAudio = bAudio;
    }).catch(err => {
        console.warn("Audio play failed:", err);
    });
}


