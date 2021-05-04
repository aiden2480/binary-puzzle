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
var current; // Will be a two-dimensional array.

function loadGrid(grid) {
    /* 21/4/21 - Fills in the grid from a one-dimensional template (converts to 2D) */
    var size = Math.sqrt(grid.length);
    var grid = convert1Dto2D(grid);
    
    console.log("Loading array:");
    console.log(JSON.parse(JSON.stringify(grid)));
    window.current = grid;

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
                cell.classList.remove("updatedCell");
                cell.disabled = false;
            }
        }
    }
}

function convert1Dto2D(grid) {
    /* Converts a one-dimensional grid to a two-dimensional one */
    var processed = [];
    var size = Math.sqrt(grid.length);
    var copy = JSON.parse(JSON.stringify(grid));

    for (let j = 0; j < size; j++) {
        let temp = [];
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
    var conversion = {0:1, 1:0};
    var buttons = document.querySelectorAll("[id^='B']");
    
    /* On left/right click functions */
    function changeValue(button) {
        button.innerText = conversion[button.innerText] || "0";
        window.current[Number(button.id[1])][Number(button.id[2])] = Number(button.innerText);
    }

    function contextMenu(button, e) {
        e.preventDefault();
        button.innerText = "";
        button.classList.remove("updatedCell");
        window.current[Number(button.id[1])][Number(button.id[2])] = null;
    }

    /* Attach to buttons */
    for (let i = 0; i < buttons.length; i++) {
        let b = buttons[i];
        b.onclick = function(){changeValue(this)};
        b.oncontextmenu = function(e){contextMenu(this, e)};
        b.type = "button";
    }
}

/* Solving functions */
function solvePairs() {
    if (window.current == undefined) {
        alert("Current grid undefined. Unable to solve pairs. Load a grid before trying again.");
        return;
    }

    var size = current.length;

    for (let j = 0; j < size; j++) {        /* "j" is col pos */
        for (let i = 0; i < size; i++) {    /* "i" is row pos */
            if (i > 0 && i < (size - 1)) {  /* The selected cell isn't at either end of the row */
                let concatenation = `${current[j][i - 1]}${current[j][i]}${current[j][i + 1]}`;

                /* Solve 00x/x00/11x/x11 horizontally */
                if (concatenation.match(/null00/)) {        // x00
                    current[j][i - 1] = 1;
                } else if (concatenation.match(/00null/)) { // 00x
                    current[j][i + 1] = 1;
                } else if (concatenation.match(/null11/)) { // x11
                    current[j][i - 1] = 0;
                } else if (concatenation.match(/11null/)) { // 11x
                    current[j][i + 1] = 0;
                }
            }

            if (j > 0 && j < (size - 1)) {  /* The selected cell isn't at either end of the column */
                let concatenation = `${current[j - 1][i]}${current[j][i]}${current[j + 1][i]}`;

                /* Solve 00x/x00/11x/x11 vertically */
                if (concatenation.match(/null00/)) {        // x00
                    current[j - 1][i] = 1;
                } else if (concatenation.match(/00null/)) { // 00x
                    current[j + 1][i] = 1;
                } else if (concatenation.match(/null11/)) { // x11
                    current[j - 1][i] = 0;
                } else if (concatenation.match(/11null/)) { // 11x
                    current[j + 1][i] = 0;
                }
            }
        }
    }

    /* Update webpage */
    return updateWebpage("solvePairs");
}

function solveTrios() {
    if (window.current == undefined) {
        alert("Current grid undefined. Unable to solve trios. Load a grid before trying again.");
        return;
    }

    var size = current.length;
    var regex = /([01])null\1/;
    // This regex will match a 0 or 1, then the word null,
    // then the initial character again.

    for (let j = 0; j < size; j++) {        /* "j" is col pos */
        for (let i = 0; i < size; i++) {    /* "i" is row pos */
            if (i > 0 && i < (size - 1)) {  /* The selected cell isn't at either end of the row */
                let concatenation = `${current[j][i - 1]}${current[j][i]}${current[j][i + 1]}`;
                var match = concatenation.match(regex);
                if (match) {
                    current[j][i] = match[1] == "0" ? 1 : 0;
                }
            }

            if (j > 0 && j < (size - 1)) {  /* The selected cell isn't at either end of the column */
                let concatenation = `${current[j - 1][i]}${current[j][i]}${current[j + 1][i]}`;
                var match = concatenation.match(regex);
                if (match) {
                    current[j][i] = match[1] == "0" ? 1 : 0;
                }
            }
        }
    }

    /* Update webpage */
    return updateWebpage("solveTrios");
}

function solveQuota() {
    alert("Fills in the remaining squares if the quota of one of the digits has been hit.\n" +
        "e.g. If a row already has three 0's filled in, the rest will be filled in with 1's.");
}

function solveFully() {
    alert("Solves the puzzle using the three methods, stops if it has to guess");
}

/* Helper functions */
function updateWebpage(parentFunc) {
    /* This is called at the end of each solving function */
    var updated = 0;
    var size = current.length;

    /* Update grid */
    for (let j = 0; j < size; j++) {
        for (let i = 0; i < size; i++) {
            let cell = document.querySelector(`button#B${j}${i}`);
            
            if (cell.textContent != String(current[j][i]) && current[j][i] != null) {
                cell.textContent = current[j][i];
                cell.classList.add("updatedCell"); // Adding this class will play animation
                updated += 1;
            }
        }
    }

    /* Log action */
    console.log(`Ran ${parentFunc}(). ${updated} cell${updated != 1 ? "s" : ""} updated`);
    console.log(JSON.parse(JSON.stringify(current))); // Deepcopy so it will print properly
    return updated; // This will be useful later in `solveFully()`
}
