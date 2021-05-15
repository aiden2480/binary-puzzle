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
    #   print(f"Enter {colour.CYAN}6{colour.RESET} and then a digit between 1 and 13 for the corresponding 6x6 puzzle. ", end="")
    #   print(f"{colour.GREEN}e.g.{colour.RESET} {colour.CYAN}61{colour.RESET} or {colour.CYAN}612{colour.RESET}")
    
    #   print(f"Enter {colour.CYAN}8{colour.RESET} for an 8x8 puzzle")
    #   print(f"Enter {colour.CYAN}14{colour.RESET} for a 14x14 puzzle")
    #   print(f"You may also enter {colour.CYAN}\"custom\"{colour.RESET} to enter custom puzzle data (any size)")

    code = input(f"\n{colour.BLUE}> {colour.CYAN}").strip().lower()
    print(colour.RESET, end="")

    if code in ["c", "custom"]:
        print("you picked a custom code")
    elif not code.isdigit():
        print(f"{colour.RED}You must enter an integer!{colour.RESET}")
        time.sleep(3)
        print()
        return main(binpuz)
    puzid = int(code)
    
    if puzid == 0:
        binary = BinaryPuzzle.example(0)
        print(f"\n{colour.GREEN}INITIAL GRID{colour.RESET}")
        binary.print()

        input(f"{colour.MAGENTA}Random puzzle selected. Press enter to solve{colour.RESET}")
        solve(binary)
    input(f"{colour.BLUE}Press enter to exit{colour.RESET}")
    

if __name__ == "__main__":
    binpuz = "--no-title" not in sys.argv
    main(binpuz)
