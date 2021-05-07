// Grid format: G(size: one digit)(array no: two digits)
var G601 = [1, null, 0, null, 0, 0, null, 1, null, 0, 0, null, null, null, null, null, null, 0, 0, null, null, 1, null, null, 1, 0, null, 1, 1, null, null, 0, null, null, 1, 1];
var G602 = [null, null, null, null, null, null, null, 1, null, null, null, 1, null, 1, null, 1, null, null, null, null, 0, null, null, 1, null, 1, null, null, null, null, null, null, null, 0, 0, null];
var G603 = [null, 1, null, null, null, null, null, null, null, 0, null, 0, null, 0, null, 0, null, null, 1, null, null, null, 1, null, null, null, null, null, 0, null, 0, null, null, null, null, null];
var G604 = [0, null, null, 1, null, null, null, 0, null, null, null, 1, null, null, 1, 1, null, null, null, null, null, null, 1, 1, null, null, null, null, null, 0, 0, null, 1, null, 1, null];
var G605 = [null, null, null, null, null, null, null, 1, null, 1, null, 1, null, null, 0, 0, null, null, 0, null, null, null, null, null, null, null, null, null, 1, 1, null, null, 0, null, 0, null];
var G606 = [null, null, null, null, null, 0, null, 1, null, null, 1, null, null, null, null, 0, null, null, null, null, 1, null, null, null, null, null, 1, null, null, null, null, 0, null, null, 1, null];
var G607 = [1, null, 1, null, null, 1, null, null, null, 1, null, null, 0, null, null, 1, 0, null, null, null, 1, null, null, null, null, 1, null, null, null, null, 1, null, null, 1, 1, null];
var G608 = [1, 1, null, null, null, null, 1, null, null, 1, null, null, null, null, null, null, 0, null, 0, null, 0, null, null, null, null, null, null, null, null, null, null, null, 0, null, 0, null];
var G609 = [null, null, 0, 0, null, 0, null, null, null, null, null, null, null, 1, 1, null, null, null, null, null, null, null, 0, 0, null, null, 1, null, 0, null, null, null, null, null, null, null];
var G610 = [null, null, null, null, null, null, null, 1, null, null, null, null, null, null, 0, null, 1, 1, null, null, 0, null, null, null, null, 0, null, null, 1, null, null, null, null, null, null, null];
var G611 = [null, 1, null, 1, null, 1, null, null, null, null, null, null, 0, 0, null, null, null, null, null, null, null, null, 1, null, 0, null, 1, 0, null, null, null, 1, null, null, null, null];
var G612 = [0, null, null, null, null, null, null, 1, 1, null, null, null, null, null, 1, null, null, null, null, null, null, 0, null, null, 0, null, null, 1, null, null, null, null, null, null, null, null];
var G613 = [null, null, null, 1, null, null, null, null, null, null, null, 0, null, null, null, null, 0, 0, null, null, null, null, 1, null, 1, null, null, null, null, null, null, 0, null, 0, null, 0];
var G801 = [null, null, null, null, null, null, null, 0, null, 0, 0, null, null, 1, null, null, null, 0, null, null, null, 1, null, 0, null, null, 1, null, null, null, null, null, 0, 0, null, 1, null, null, 1, null, null, null, null, null, 1, null, null, null, 1, 1, null, null, null, 0, null, 1, null, 1, null, null, null, null, null, 1];
var G141 = [null, 0, 0, null, null, 1, 1, null, 1, null, 0, 0, null, 0, null, null, null, null, null, null, null, null, null, null, null, 0, null, null, null, 0, 0, null, null, null, null, 1, 1, null, null, null, 1, null, null, 0, null, 1, 1, null, 0, null, null, null, 0, null, null, null, null, null, null, null, 1, null, null, null, null, null, null, null, null, null, 0, 1, null, null, null, null, null, null, 0, null, 1, 1, null, 1, null, null, null, 0, null, null, 1, null, null, 0, null, null, null, null, null, 0, null, null, null, null, null, null, null, null, null, null, null, 0, null, null, null, null, 1, null, 0, 0, null, 1, null, null, 0, 0, null, 1, 1, null, null, null, 0, 0, null, null, null, null, 0, null, 0, null, null, null, null, null, null, null, null, null, null, 1, null, null, null, 0, null, null, null, null, null, null, null, null, 1, null, null, null, 1, null, null, null, null, null, 1, 1, null, 0, null, 0, null, 0, null, 1, null, null, 0, null, null, 1, null, null, null, 0, null, 1];
var GEMP = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
var current;    // Will be a two-dimensional array. Synced with the HTML board
var size;       // Much better to have this as a global variable than calculate it every time

function loadGrid(grid) {
    /* 21/4/21 - Fills in the grid from a one-dimensional template (converts to 2D) */
    if (!Number.isInteger(Math.sqrt(grid.length))) {
        console.error(`Invalid grid (length ${grid.length}):`);
        console.log(grid);
        
        alert("The selected grid couldn't be loaded. It does not contain a square number of elements.");
        return;
    }

    window.size = Math.sqrt(grid.length);
    window.current = convert1Dto2D(grid);
    
    console.clear();
    console.log("Loading array:");
    console.log(JSON.parse(JSON.stringify(current)));

    /* Create a table of the appropriate size */
    createTable();
    hideSolveStatus();

    for (let j = 0; j < size; j++) {
        for (let i = 0; i < size; i++) {
            let cell = document.querySelector(`button#R${j}C${i}`);
            let value = current[j][i];
    
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

function onPageLoad() {
    /* Load grid in selector */
    loadGrid(eval(document.getElementById("changePuz").value));

    /* Attach click script to cells */
    attachClickScript();
}

function displaySolveStatus() {
    // This is only called when the grid is full, but we'll add a check anyway
    if (!isGridFull()) {
        return;
    }

    var status = isGridCorrect();
    var solvestatus = document.getElementById("solvestatus");

    if (status == true) {
        console.log("yay");
        solvestatus.textContent = "Correct! Well done!";
        solvestatus.classList.add("correct");
        solvestatus.classList.remove("incorrect");
        return;
    }

    // If we get to this point, `status` will be an error message
    solvestatus.textContent = status;
    solvestatus.classList.add("incorrect");
    solvestatus.classList.remove("correct");
}

function hideSolveStatus() {
    document.getElementById("solvestatus").textContent = "\xa0";
}

/* Solving functions */
function solvePairs() {
    if (window.current == undefined) {
        alert("Current grid undefined. Unable to solve pairs. Load a grid before trying again.");
        return;
    }

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

    // This regex will match a 0 or 1, then the
    // word null, then the initial character again.
    var regex = /([01])null\1/;

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
    if (window.current == undefined) {
        alert("Current grid undefined. Unable to solve quota. Load a grid before trying again.");
        return;
    }

    for (let j = 0; j < size; j++) {
        /* Create array slice of current column */
        let col = [];
        for (let i = 0; i < size; i++) {
            col.push(current[i][j]);
        }

        /* Calculate the number of ones and zeros in each row/col */
        let horzero = current[j].filter(x => x == 0).length;
        let horone = current[j].filter(x => x == 1).length;
        let verzero = col.filter(x => x == 0).length;
        let verone = col.filter(x => x == 1).length;
        
        /* Solve full zero quota horizontally */
        if (horzero == (size / 2) && current[j].indexOf(null) != -1) {
            do {
                let index = current[j].indexOf(null);
                current[j][index] = 1;
            } while (current[j].indexOf(null) != -1);
        }

        /* Solve full one quota horizontally */
        if (horone == (size / 2) && current[j].indexOf(null) != -1) {
            do {
                let index = current[j].indexOf(null);
                current[j][index] = 0;
            } while (current[j].indexOf(null) != -1);
        }
        
        /* Solve full zero quota vertically */
        if (verzero == (size / 2) && col.indexOf(null) != -1) {
            do {
                let index = col.indexOf(null);
                current[index][j] = 1;
                col[index] = 1; // Record change to prevent hang
            } while (col.indexOf(null) != -1);
        }

        /* Solve full one quota vertically */
        if (verone == (size / 2) && col.indexOf(null) != -1) {
            do {
                let index = col.indexOf(null);
                current[index][j] = 0;
                col[index] = 0; // Record change to prevent hang
            } while (col.indexOf(null) != -1);
        }
    }

    /* Update webpage */
    return updateWebpage("solveQuota");
}

function solveFully() {
    if (window.current == undefined) {
        alert("Current grid undefined. Unable to solve quota. Load a grid before trying again.");
        return;
    }

    var total = 0;
    var passed = 0;
    var tests = [solvePairs, solveTrios, solveQuota];

    do {
        for (let i = 0; i < tests.length; i++) {
            // Int number of cells changed returned by solving function
            let changed = tests[i]();
            if (changed) {
                // This test affected the grid. Go back to the beginning
                total += changed;
                passed = 0;
                break;
            }
            passed += 1;
        }
    } while (passed < tests.length);

    console.log(`Ran solveFully(). ${total} total cell${total != 1 ? "s" : ""} updated`);
}

/* Helper functions */
function updateWebpage(parentFunc) {
    /* This is called at the end of each solving function */
    var updated = 0;

    /* Update grid */
    for (let j = 0; j < size; j++) {
        for (let i = 0; i < size; i++) {
            let cell = document.querySelector(`button#R${j}C${i}`);
            
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

function convert1Dto2D(grid) {
    /* Converts a one-dimensional grid to a two-dimensional one */
    var processed = [];
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

function createTable() {
    /* Create an appropriately sized table for the grid */
    var table = document.getElementById("gameboard");

    // Check if table is already correct size, return
    if (table.children.length == size) {
        return;
    }

    table.innerHTML = "";
    for (let j = 0; j < size; j++) {
        tr = document.createElement("tr");
        for (let i = 0; i < size; i++) {
            td = document.createElement("td");
            button = document.createElement("button");
            button.id = `R${j}C${i}`;
            td.appendChild(button);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    /* Reattach click script to buttons */
    attachClickScript();
}

function attachClickScript() {
    /* Attach click scripts to buttons */
    var conversion = {0:1, 1:0};
    var buttons = document.querySelectorAll("[id^='R']");
    
    /* On left/right click functions */
    function changeValue(button) {
        var decon = button.id.replace("R", "").split("C")
        
        button.innerText = conversion[button.innerText] || "0";
        window.current[Number(decon[0])][Number(decon[1])] = Number(button.innerText);

        // Show solve status
        if (isGridFull()) {
            displaySolveStatus();
        }
    }

    function contextMenu(button, e) {
        var decon = button.id.replace("R", "").split("C");
        
        e.preventDefault();
        button.innerText = "";
        button.classList.remove("updatedCell");
        window.current[Number(decon[0])][Number(decon[1])] = null;

        // Hide solve status
        hideSolveStatus();
    }

    /* Attach to buttons */
    for (let i = 0; i < buttons.length; i++) {
        let b = buttons[i];
        b.onclick = function(){changeValue(this)};
        b.oncontextmenu = function(e){contextMenu(this, e)};
        b.type = "button";
    }
}

function isGridFull(){
    for (let j = 0; j < size; j++) {
        if (current[j].includes(null)) {
            return false;
        }
    }
    return true;
}

function isGridCorrect() {
    if (!isGridFull()) {
        return null;
    }

    var rowunique = new Set();
    var colunique = new Set();
    var trioregex = /[01]*([01])\1\1[01]*/;

    // Ensure there's no more than len/2 characters of each type
    for (let j = 0; j < size; j++) {
        let col = [];
        for (let i = 0; i < size; i++) {
            col.push(current[i][j]);
        }

        let horzero = current[j].filter(x => x == 0).length;
        let horone = current[j].filter(x => x == 1).length;
        let verzero = col.filter(x => x == 0).length;
        let verone = col.filter(x => x == 1).length;

        if (horzero > (size / 2)) {
            return `Too many zeros in row ${j + 1}`;
        }
        if (horone > (size / 2)) {
            return `Too many ones in row ${j + 1}`;
        }
        if (verzero > (size / 2)) {
            return `Too many zeros in column ${j + 1}`;
        }
        if (verone > (size / 2)) {
            return `Too many ones in column ${j + 1}`;
        }
    }

    // Check if any trios of the same digit exist
    for (let j = 0; j < size; j++) {
        let col = [];
        for (let i = 0; i < size; i++) {
            col.push(current[i][j]);
        }

        let rowmatch = current[j].join("").match(trioregex);
        let colmatch = col.join("").match(trioregex);

        if (rowmatch) {
            var char = rowmatch[0] == "0" ? "zeroes" : "ones";
            return `Three consecutave ${char} found in row ${j + 1}`;
        }
        if (colmatch) {
            var char = colmatch[0] == "0" ? "zeroes" : "ones";
            return `Three consecutave ${char} found in column ${j + 1}`;
        }
    }

    // Make sure all rows and all columns are unique
    for (let j = 0; j < size; j++) {
        let col = [];
        for (let i = 0; i < size; i++) {
            col.push(current[i][j]);
        }
        
        colunique.add(col);
        rowunique.add(current[j]);
    }

    if (colunique.size != size) {
        return "Not all columns are unique";
    }
    if (rowunique.size != size) {
        return "Not all rows are unique";
    }

    // All tests passed
    return true;
}
