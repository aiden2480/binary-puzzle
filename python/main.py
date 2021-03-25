from binarypuzzle import BinaryPuzzle, colour
from timeit import timeit


def main(index=0):
    binary = BinaryPuzzle.example(index)

    # Print initial puzzle
    print(colour.GREEN + f"INITIAL GRID{colour.RESET}")
    binary.print()

    # Run tests to solve
    tests_passed = 0
    while tests_passed < 3:
        for func in binary.tests:
            old = [x[:] for x in binary.grid]
            new = func()

            if new != old:  # Test failed (new digits solved)
                name = func.__name__.upper()
                print(f"{colour.CYAN}GRID AFTER {name}{colour.RESET}")
                binary.print()
                tests_passed = 0
            else:  # Test passed (potentially finished the puzzle)
                tests_passed += 1

    # Confirm if puzzle solved logically
    if binary.solved:
        print(f"{colour.GREEN}PUZZLE SOLVED{colour.RESET}")
        return
    
    # Puzzle incomplete, Start guessing random numbers (TODO)


def time(func, iterations=1000):
    """
        Current statistics (1000 tests)
         - With print statement:        93729.3206 μs/n
         - Without print statements:     1064.4711 μs/n
        88x faster without the print statements. 
    """
    
    elapsed = timeit(func, number=iterations)
    microseconds = round((elapsed/iterations)*1000000, 4)

    print(f"{iterations=} {elapsed=} {microseconds} μs per iteration")


if __name__ == "__main__":
    main()
