const fullScreenDiv = document.getElementById("fullscreen");
const canvas_script = document.getElementById("canvas");

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


function fullScreen() {
    enterfullScreen(fullScreenDiv);
    // enterfullScreen(canvas_script);
}



function enterfullScreen(elem) {


    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }

    canvas_script.width  = window.innerWidth;
    canvas_script.height = window.innerHeight;
}


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