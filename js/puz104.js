// 21/4/21 Aiden - Added 6x6 grid templates
var G1 = [1, null, 0, null, 0, 0, null, 1, null, 0, 0, null, null, null, null, null, null, 0, 0, null, null, 1, null, null, 1, 0, null, 1, 1, null, null, 0, null, null, 1, 1];
var G2 = [null, 1, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
var G3 = [null, null, 1, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
var G4 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35];

function loadGrid(grid) { // 21/4/21 Aiden - Fills in the grid from a template
    var size = Math.sqrt(grid.length);
    var grid = convert1Dto2D(grid);
    console.log(grid); // 2D

    for (let j = 0; j < size; j++) {
        for (let i = 0; i < size; i++) {
            let cell = document.querySelector(`button#B${j}${i}`);
            let value = grid[j][i];
    
            if (value != null) {
                cell.innerText = value;
                cell.classList.add("disabled");
                cell.disabled = true;
            }
        }
    }

}

function convert1Dto2D(grid) {
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

function load() {
    loadGrid(G1);

    /* Attach click script to each button */
    let conversion = {0:1, 1:0};
    let buttons = document.querySelectorAll("[id^='B']");
    
    function changeValue(button) {
        button.innerText = conversion[button.innerText] || "0";
    }
    
    for (let i=0; i < buttons.length; i++) {
        b = buttons[i];
        b.onclick = function(){changeValue(this)};
        b.type = "button";
    }
}
