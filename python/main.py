"""
    This is nasty to read with the amount of print statments
    so I'd suggest you just don't try to :)
"""

from binarypuzzle import BinaryPuzzle, colour
from timeit import timeit
import time
import sys

title = f"""
{colour.GREEN}█▀▀▄ ░▀░ █▀▀▄ █▀▀█ █▀▀█ █░░█   {colour.BLUE}█▀▀█ █░░█ ▀▀█ ▀▀█ █░░ █▀▀
{colour.GREEN}█▀▀▄ ▀█▀ █░░█ █▄▄█ █▄▄▀ █▄▄█   {colour.BLUE}█░░█ █░░█ ▄▀░ ▄▀░ █░░ █▀▀
{colour.GREEN}▀▀▀░ ▀▀▀ ▀░░▀ ▀░░▀ ▀░▀▀ ▄▄▄█   {colour.BLUE}█▀▀▀ ░▀▀▀ ▀▀▀ ▀▀▀ ▀▀▀ ▀▀▀
{colour.RESET}"""

def solve(binary):
    # Run tests to solve
    tests_passed = 0
    while tests_passed < 3:
        for func in binary.tests:
            old = [x[:] for x in binary.grid]
            new = func()

            if new != old: # Test failed (new digits solved)
                name = func.__name__.upper()
                print(f"{colour.CYAN}GRID AFTER {name}{colour.RESET}")
                binary.print()
                tests_passed = 0
            else: # Test passed (potentially finished the puzzle)
                tests_passed += 1

    # Confirm if puzzle solved logically
    if binary.solved:
        print(f"{colour.GREEN}PUZZLE SOLVED{colour.RESET}")
    else:
        print(f"{colour.GREEN}This puzzle can't be solved following the three rules. Good luck solving the rest!{colour.RESET}")


def main(binpuz: bool):
    print(title if binpuz else "BinaryPuzzle\nAiden Gardner\n")
    
    print(f"Enter {colour.CYAN}0{colour.RESET} for a random puzzle")
    print(f"Enter {colour.CYAN}6{colour.RESET} and then a digit between 1 and 13 for the corresponding 6x6 puzzle. ", end="")
    print(f"{colour.GREEN}e.g.{colour.RESET} {colour.CYAN}61{colour.RESET} or {colour.CYAN}613{colour.RESET}")
    
    print(f"Enter {colour.CYAN}8{colour.RESET} for an 8x8 puzzle")
    print(f"Enter {colour.CYAN}14{colour.RESET} for a 14x14 puzzle")
    print(f"You may also enter {colour.CYAN}\"custom\"{colour.RESET} to enter custom puzzle data (any size)")

    code = input(f"{colour.BLUE}> {colour.CYAN}").strip().lower()
    print(colour.RESET, end="")

    if code in ["c", "custom"]:
        puzid = NotImplemented
        print(f"\n{colour.BLUE}FORMAT FOR CUSTOM PUZZLES{colour.RESET}")
        print(f"{colour.BLUE}>{colour.RESET} Use the digit {colour.CYAN}0{colour.RESET} or {colour.CYAN}1{colour.RESET} to represent their respective values")
        print(f"{colour.BLUE}>{colour.RESET} Use a {colour.CYAN}x{colour.RESET} to represent a blank cell")
        print(f"{colour.BLUE}>{colour.RESET} The character {colour.CYAN}\\n{colour.RESET} should be used to seperate each row")
        print(f"{colour.BLUE}>{colour.RESET} The puzzle may be any size, but should be valid (all rows and cols the same length)")

        sixbysix = "1x0x00\nx1x00x\nxxxxx0\n0xx1xx\n10x11x\nx0xx11"
        conversion = {"0": colour.CYAN, "1": colour.CYAN, "x": colour.GREEN}
        for key, value in conversion.items():
            sixbysix = sixbysix.replace(key, f"{value}{key}{colour.RESET}")
        sixbysix = sixbysix.replace("\n", f"{colour.BLUE}\\n{colour.RESET}")

        print(f"\n{colour.BLUE}An example of a 6x6 grid string{colour.RESET}")
        print(f"{colour.BLUE}>{colour.RESET} {sixbysix}")

        print(f"\n{colour.BLUE}Enter your puzzle string{colour.RESET}")
        string = input(f"{colour.BLUE}> {colour.CYAN}").strip().lower().replace("\\n", "\n")
        print(colour.RESET, end="")

        binary = BinaryPuzzle(string)
    elif not code.isdigit() or int(code) not in [0, 8, 14, 61, 62, 63, 64, 65, 66, 67, 68, 69, 610, 611, 612, 613]:
        print(f"{colour.RED}You must enter a valid option!{colour.RESET}")
        time.sleep(3)
        print() # Clear screen
        return main(binpuz)
    else:
        puzid = int(code)
    
    # Load selected puzzle
    if puzid == 0:
        binary = BinaryPuzzle.example(0)        # Random puzzle
    elif puzid == 8:
        binary = BinaryPuzzle.example(14)       # Example 8x8 puzzle
    elif puzid == 14:
        binary = BinaryPuzzle.example(15)       # Example 8x8 puzzle
    elif str(puzid).startswith("6"):
        puzid = int(str(puzid)[1:])
        binary = BinaryPuzzle.example(puzid)    # Example 6x6 puzzle

    # Print initial grid
    print(f"\n{colour.GREEN}INITIAL GRID{colour.RESET}")
    binary.print()
    
    # Solve puzzle
    input(f"{colour.MAGENTA}Puzzle selected. Press enter to solve{colour.RESET}")
    solve(binary)

    # Enter to exit
    input(f"{colour.BLUE}Press enter to exit{colour.RESET}")
    

if __name__ == "__main__":
    binpuz = "--no-title" not in sys.argv
    main(binpuz)
