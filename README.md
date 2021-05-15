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

## :scroll: Licence
This project is licensed under the [MIT licence](https://choosealicense.com/licenses/mit/#). For more info, see the group project [Wiki page](https://github.com/aiden2480/A2-UniTech-BinaryPuzzle/wiki#justification-of-licence).

## :snake: Python
The Python version is located under [`python/`](./python) and should be accessed via `cd python` before running `main.py` (due to relative imports).
Dependencies may be installed through `pip install -r requirements.txt`. `Colorama` module is optional.
An executable file is automatically created on each push, though it doesn't have colorama support enabled.

If the program displays a bunch of replacement characters (�) instead of displaying a title, use the `--no-title` flag. If you want to disable terminal colours (:confused:) pass the `--no-colour` flag

## :memo: Future features
- [ ] If the grid is still incomplete after passing the three tests, randomly guess cells until correct
- [ ] Make it so the code can't physically solve the puzzle incorrectly
    - This scenario might occur if the user screws up the puzzle and then clicks `Solve fully`
- [ ] Save and load sessions from cookie savedata includes:
    - `version` (of the program to run the save on)
    - `date` - when the save was created
    - `cell data` - current state of the cells
    - `cell template` - use to grey out template cells
- [ ] Add functionality for the code to generate puzzles for the user to complete
- [ ] Update readme descriptions with commit links
- [x] Cells that are updated by code temporarily flash green to draw attention before fading to blurple
    - Added in version [v1.06](https://aiden2480.github.io/binary-puzzle/puz106.html)
- [x] Allow for variable puzzle size
    - Added in version [v1.09](https://aiden2480.github.io/binary-puzzle/puz109.html)
    - Create table from js
- [x] Functions `isGridFull` and `attachCellScript`
    - Added in version [v1.10](https://aiden2480.github.io/binary-puzzle/puz110.html)
    - If the grid is full, run some js to display a correct/incorrect message
    - Move cell script attachment to different function to allow for variable grid size
- [x] Function that checks if the puzzle is correct when all cells are filled in
    - Added in version [v1.10](https://aiden2480.github.io/binary-puzzle/puz110.html)
- [x] Add opengraph tags for discord embeds
    - Added in version [v1.10](https://aiden2480.github.io/binary-puzzle/puz110.html)
- [x] Add a licence
    - Added in version [v1.11](./LICENCE)
- [x] Reset grid to template button
    - Added in version [v1.12](https://aiden2480.github.io/binary-puzzle/puz112.html)
- [x] Display error message if user violates rule while still solving
    - Added in version [v1.13](https://aiden2480.github.io/binary-puzzle/puz113.html)
- [x] Turn application into a PWA
    - Added after version v1.13
- [x] Automate `latest.html` redirect link
    - Added in version [v1.13](https://aiden2480.github.io/binary-puzzle/latest.html)
- [x] Add logo to python executable
