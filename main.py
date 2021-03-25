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
                print(f"\n{colour.CYAN}GRID AFTER {name}{colour.RESET}")
                binary.print()
                tests_passed = 0
            else:  # Test passed (potentialyl finished the puzzle)
                tests_passed += 1

    # Confirm if puzzle solved logically
    if binary.solved:
        print(f"{colour.GREEN}PUZZLE SOLVED{colour.RESET}")
        return
    
    # Start guessing random numbers


def time(func, iterations=10000):
    """
        Current statistics (10000 tests)
         - With print statement: 26362µs/n
         - Without print statements: 1781µs/n
         - Randomly generated (no print): 1857µs/n
    """
    
    elapsed = timeit(func, number=iterations)
    microseconds = round((elapsed/iterations)*1000000, 4)

    print(f"{iterations=} {elapsed=} {microseconds} µs per iteration")


if __name__ == "__main__":
    main()
