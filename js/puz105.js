// 3/5/21 - Added more grids
var G01 = [1, null, 0, null, 0, 0, null, 1, null, 0, 0, null, null, null, null, null, null, 0, 0, null, null, 1, null, null, 1, 0, null, 1, 1, null, null, 0, null, null, 1, 1];
var G02 = [null, null, null, null, null, null, null, 1, null, null, null, 1, null, 1, null, 1, null, null, null, null, 0, null, null, 1, null, 1, null, null, null, null, null, null, null, 0, 0, null];
var G03 = [null, 1, null, null, null, null, null, null, null, 0, null, 0, null, 0, null, 0, null, null, 1, null, null, null, 1, null, null, null, null, null, 0, null, 0, null, null, null, null, null];
var G04 = [0, null, null, 1, null, null, null, 0, null, null, null, 1, null, null, 1, 1, null, null, null, null, null, null, 1, 1, null, null, null, null, null, 0, 0, null, 1, null, 1, null];
var G05 = [null, null, null, null, null, null, null, 1, null, 1, null, 1, null, null, 0, 0, null, null, 0, null, null, null, null, null, null, null, null, null, 1, 1, null, null, 0, null, 0, null];
var G06 = [null, null, null, null, null, 0, null, 1, null, null, 1, null, null, null, null, 0, null, null, null, null, 1, null, null, null, null, null, 1, null, null, null, null, 0, null, null, 1, null];
var G07 = [1, null, 1, null, null, 1, null, null, null, 1, null, null, 0, null, null, 1, 0, null, null, null, 1, null, null, null, null, 1, null, null, null, null, 1, null, null, 1, 1, null];
var G08 = [1, 1, null, null, null, null, 1, null, null, 1, null, null, null, null, null, null, 0, null, 0, null, 0, null, null, null, null, null, null, null, null, null, null, null, 0, null, 0, null];
var G09 = [null, null, 0, 0, null, 0, null, null, null, null, null, null, null, 1, 1, null, null, null, null, null, null, null, 0, 0, null, null, 1, null, 0, null, null, null, null, null, null, null];
var G10 = [null, null, null, null, null, null, null, 1, null, null, null, null, null, null, 0, null, 1, 1, null, null, 0, null, null, null, null, 0, null, null, 1, null, null, null, null, null, null, null];
var G11 = [null, 1, null, 1, null, 1, null, null, null, null, null, null, 0, 0, null, null, null, null, null, null, null, null, 1, null, 0, null, 1, 0, null, null, null, 1, null, null, null, null];
var G12 = [0, null, null, null, null, null, null, 1, 1, null, null, null, null, null, 1, null, null, null, null, null, null, 0, null, null, 0, null, null, 1, null, null, null, null, null, null, null, null];
var G13 = [null, null, null, 1, null, null, null, null, null, null, null, 0, null, null, null, null, 0, 0, null, null, null, null, 1, null, 1, null, null, null, null, null, null, 0, null, 0, null, 0];
var GAR = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
var GEM = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];

function loadGrid(grid) {
    /* 21/4/21 - Fills in the grid from a one-dimensional template (converts to 2D) */
    var size = Math.sqrt(grid.length);
    var grid = convert1Dto2D(grid);
    console.log(grid); // 2D array

    for (let j = 0; j < size; j++) {
        for (let i = 0; i < size; i++) {
            let cell = document.querySelector(`button#B${j}${i}`);
            let value = grid[j][i];
    
            if (value != null) {        /* Write new value */
                cell.innerText = value;
                cell.classList.add("disabled");
                cell.disabled = true;
            } else {                    /* Clear old value */
                cell.innerText = "";
                cell.classList.remove("disabled");
                cell.disabled = false;
            }
        }
    }

}

function convert1Dto2D(grid) {
    /* Converts a one-dimensional grid to a two-dimensional one */
    var size = Math.sqrt(grid.length);
    var processed = [];
    var copy = JSON.parse(JSON.stringify(grid));

    for (let j = 0; j < size; j++) {
        var temp = [];
        for (let i = 0; i < size; i++) {
            temp.push(copy.shift())
        }
        processed.push(temp);
    }

    return processed;
}

function main() {
    /* Load grid in selector */
    loadGrid(eval(document.getElementById("changePuz").value));

    /* Attach click scripts to buttons */
    let conversion = {0:1, 1:0};
    let buttons = document.querySelectorAll("[id^='B']");
    
    /* On left/right click functions */
    function changeValue(button) {
        button.innerText = conversion[button.innerText] || "0";
    }
    function contextMenu(button, e) {
        e.preventDefault();
        button.innerText = "";
    }
    
    /* Attach to buttons */
    for (let i=0; i < buttons.length; i++) {
        b = buttons[i];
        b.onclick = function(){changeValue(this)};
        b.oncontextmenu = function(e){contextMenu(this, e)};
        b.type = "button";
    }
}

/* Solving functions */
function solvePairs() {
    alert("Solves the pairs in the grid (11x -> 110)\nSolves 11x, x11, 00x, x00 horizontally and vertically");
}

function solveTrios() {
    alert("Solves the trios in the grid (1x1 -> 101)\nSolves 1x1 and 0x0 horizontally and vertically");
}

function solveQuota() {
    alert("Fills in the remaining squares if the quota of one of the digits has been hit.\n" +
        "e.g. If a row already has three 0's filled in, the rest will be filled in with 1's.");
}

function solveFully() {
    alert("Solves the puzzle using the three methods, stops if it has to guess");
}
