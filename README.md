# :jigsaw: Binary Puzzle
<div id="badges" align="center">
    <img src="https://img.shields.io/github/last-commit/aiden2480/binary-puzzle?color=7289DA&logoColor=23272A&style=flat-square" alt="GitHub last commit" />
    <img src="https://img.shields.io/github/commit-activity/m/aiden2480/binary-puzzle?color=7289DA&logoColor=23272A&style=flat-square" alt="GitHub commits per month" />
    <img src="https://img.shields.io/github/repo-size/aiden2480/binary-puzzle?color=7289DA&logoColor=23272A&style=flat-square" alt="GitHub repo size" />
    <a href="https://aiden2480.github.io/binary-puzzle/" target="_blank">
        <img src="https://img.shields.io/badge/website-click%20here-7289DA?logoColor=23272A&style=flat-square" alt="GitHub pages site" />
    </a>
</div>

## :bar_chart: Details
Aiden Gardner 11SDD6 Year 11 Term 2 BinaryPuzzle assessment 2021.
Solves 6x6 binary puzzles using three rules. Available in HTML and Python.

## :snake: Python
The Python version is located under [`python/`](./python) and should be accessed via `cd python` before running `main.py` (due to relative imports).
Dependencies may be installed through `pip install -r requirements.txt`. `Colorama` module is optional.
An executable file is automatically created on each push, though it doesn't have colorama support enabled.

## :memo: Future features
- [ ] Function that checks if the puzzle is correct when all cells are filled in
- [ ] If the grid is still incomplete after passing the three tests, randomly guess cells until correct
- [ ] Add opengraph tags for discord embeds
- [ ] Allow for variable puzzle size
    - Create table from js
- [ ] Fix question image link navigating to helo fish
- [ ] Reset grid to template button
- [ ] Add a licence
- [ ] Update python version with grid selector and example grids added in [v1.05](./js/puz105.js)
- [ ] Save and load sessions from cookie savedata includes:
    - `version` (of the program to run the save on)
    - `date` - when the save was created
    - `cell data` - current state of the cells
    - `cell template` - use to grey out template cells
- [x] Cells that are updated by code temporarily flash green to draw attention before fading to blurple
    - Added in version [v1.06](https://aiden2480.github.io/binary-puzzle/puz106.html)
