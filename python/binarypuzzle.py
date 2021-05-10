import sys
import random

try:
    from colorama import Fore as colour
    from colorama import init as colorama_init
    colorama_init()

    if "--no-colour" in sys.argv:
        raise ModuleNotFoundError
except ModuleNotFoundError:
    class Empty(object):
        def __getattr__(self, attr):
            return str()
    colour = Empty()


class BinaryPuzzle(object):
    def __init__(self, gridstr):
        self.grid = []
        self.puzzle_size = len(gridstr.split("\n"))

        # Check if grid valid
        for row in gridstr.split("\n"):
            self.grid.append(list(row))
            if len(row) != self.puzzle_size:
                raise ValueError("This puzzle isn't valid.")
        self.initial = [x[:] for x in self.grid]
        self.tests = [self.solve_pairs, self.solve_trios, self.solve_quota]

    def print(self):
        """
            Print puzzle with colours indicating
            which boxes have been filled in
        """

        for rpos, row in enumerate(self.grid):
            for cpos, char in enumerate(row):
                if char != self.initial[rpos][cpos]:
                    print(colour.RED + char + colour.RESET, end="")
                else:
                    print(char.replace("x", "_"), end="")
            print()
        print()

    # Constructor method
    @classmethod
    def example(cls, pos=0):
        """
            Generate a random puzzle.
            Index 0 will be randomly generated from the other list entries.
            These puzzles are the same as the JavaScript ones
        """

        puzzles = [
            "1x0x00\nx1x00x\nxxxxx0\n0xx1xx\n10x11x\nx0xx11",  # Puzzle 1
            "xxxxxx\nx1xxx1\nx1x1xx\nxx0xx1\nx1xxxx\nxxx00x",  # Puzzle 2
            "x1xxxx\nxxx0x0\nx0x0xx\n1xxx1x\nxxxx0x\n0xxxxx",  # Puzzle 3
            "0xx1xx\nx0xxx1\nxx11xx\nxxxx11\nxxxxx0\n0x1x1x",  # Puzzle 4
            "xxxxxx\nx1x1x1\nxx00xx\n0xxxxx\nxxxx11\nxx0x0x",  # Puzzle 5
            "xxxxx0\nx1xx1x\nxxx0xx\nxx1xxx\nxx1xxx\nx0xx1x",  # Puzzle 6 - Unsolvable
            "1x1xx1\nxxx1xx\n0xx10x\nxx1xxx\nx1xxxx\n1xx11x",  # Puzzle 7 - Unsolvable
            "11xxxx\n1xx1xx\nxxxx0x\n0x0xxx\nxxxxxx\nxx0x0x",  # Puzzle 8
            "xx00x0\nxxxxxx\nx11xxx\nxxxx00\nxx1x0x\nxxxxxx",  # Puzzle 9
            "xxxxxx\nx1xxxx\nxx0x11\nxx0xxx\nx0xx1x\nxxxxxx",  # Puzzle 10
            "x1x1x1\nxxxxxx\n00xxxx\nxxxx1x\n0x10xx\nx1xxxx",  # Puzzle 11
            "0xxxxx\nx11xxx\nxx1xxx\nxxx0xx\n0xx1xx\nxxxxxx",  # Puzzle 12
            "xxx1xx\nxxxxx0\nxxxx00\nxxxx1x\n1xxxxx\nx0x0x0",  # Puzzle 13
            
            "xxxxxxx0\nx00xx1xx\nx0xxx1x0\nxx1xxxxx\n00x1xx1x\nxxxx1xxx\n11xxx0x1\nx1xxxxx1",  # 8x8 puzzle
            "x00xx11x1x00x0\nxxxxxxxxxxx0xx\nx00xxxx11xxx1x\nx0x11x0xxx0xxx\nxxxx1xxxxxxxxx\n01xxxxxx0x11x1\nxxx0xx1xx0xxxx\n" \
                "x0xxxxxxxxxxx0\nxxxx1x00x1xx00\nx11xxx00xxxx0x\n0xxxxxxxxxx1xx\nx0xxxxxxxx1xxx\n1xxxxx11x0x0x0\nx1xx0xx1xxx0x1"  # 14x14 puzzle
        ]

        puzzles.insert(0, random.choice(puzzles))
        assert isinstance(pos, int) and pos in range(len(puzzles))
        return cls(puzzles[pos])

    # Instance properties
    @property
    def solved(self):
        """
            Returns `True` if the puzzle is solved. 
            If this returns False after all tests have passed,
            random numbers will be generated to fill the empty cells.
        """

        return "x" not in "".join(["".join(i) for i in self.grid])

    @property
    def valid(self):
        """
            Ensures that the grid is kept valid.
            This only needs to be called when guessing the
            remaining numbers in a logistically unsolvable grid.
        """ # TODO: This hasn't been checked yet.

        # Ensure there's no more than len/2 characters of each type horizontally
        for row in self.grid:
            count = {char: row.count(char) for char in row}
            if count.get("0") > (self.puzzle_size / 2):
                return False, "Too many 0s horizontally"
            if count.get("1") > (self.puzzle_size / 2):
                return False, "Too many 1s horizontally"

        # Ensure there's no more than len/2 characters of each type vertically
        for n in range(6):
            col = [self.grid[i][n] for i in range(self.puzzle_size)]
            count = {char: col.count(char) for char in col}
            if count.get("0") > (self.puzzle_size / 2):
                return False, "Too many 0s vertically"
            if count.get("1") > (self.puzzle_size / 2):
                return False, "Too many 1s vertically"

        # Check if any trios of the same digit exist
        for rpos, row in enumerate(self.grid):
            for cpos, char in enumerate(row):
                if cpos in range(1, self.puzzle_size - 1):
                    hor = row[cpos - 1] + char + row[cpos + 1]
                    if hor in ["000", "111"]:
                        return False, "Trio found horizontally"

            if rpos in range(1, self.puzzle_size - 1):
                ver = self.grid[rpos - 1][cpos] + char + self.grid[rpos + 1][cpos]
                if ver in ["000", "111"]:
                    return False  # Trio found vertically

        # Make sure all rows and all columns are unique (only if grid completed)
        if self.solved:
            if len(set(["".join(i) for i in self.grid])) != self.puzzle_size:
                return False  # Less than 6 identical rows

            cols = [[self.grid[i][n] for i in range(self.puzzle_size)]
                    for n in range(self.puzzle_size)]
            if len(set(["".join(i) for i in cols])) != self.puzzle_size:
                return False  # Less than 6 identical columns

        return True

    # Processing functions
    def solve_trios(self):
        """
            Solves the trios in the grid (1x1 -> 101)
            Solves 1x1 and 0x0 horizontally and vertically
        """

        for rpos, row in enumerate(self.grid):
            for cpos, char in enumerate(row):
                if cpos in range(1, self.puzzle_size - 1):
                    if char == "x" and row[cpos - 1] == row[cpos + 1] == "1":
                        self.grid[rpos][cpos] = "0"  # Solve 1x1 horizontally
                    if char == "x" and row[cpos - 1] == row[cpos + 1] == "0":
                        self.grid[rpos][cpos] = "1"  # Solve 0x0 horizontally

                if rpos in range(1, self.puzzle_size - 1):
                    if char == "x" and self.grid[rpos - 1][cpos] == self.grid[rpos + 1][cpos] == "1":
                        self.grid[rpos][cpos] = "0"  # Solve 1x1 vertically

                    if char == "x" and self.grid[rpos - 1][cpos] == self.grid[rpos + 1][cpos] == "0":
                        self.grid[rpos][cpos] = "1"  # Solve 0x0 horizontally

        return self.grid

    def solve_pairs(self):
        """
            Solves the pairs in the grid (11x -> 110)
            Solves 11x, x11, 00x, x00 horizontally and vertically
        """

        for rpos, row in enumerate(self.grid):
            for cpos, char in enumerate(row):
                if cpos in range(1, self.puzzle_size - 1):
                    if char == row[cpos - 1] == "1" and row[cpos + 1] == "x":
                        self.grid[rpos][cpos + 1] = "0"  # Solve 11x horizontally
                    if char == row[cpos + 1] == "1" and row[cpos - 1] == "x":
                        self.grid[rpos][cpos - 1] = "0"  # Solve x11 horizontally

                    if char == row[cpos - 1] == "0" and row[cpos + 1] == "x":
                        self.grid[rpos][cpos + 1] = "1"  # Solve 00x horizontally
                    if char == row[cpos + 1] == "0" and row[cpos - 1] == "x":
                        self.grid[rpos][cpos - 1] = "1"  # Solve x00 horizontally

                if rpos in range(1, self.puzzle_size - 1):
                    if char == self.grid[rpos - 1][cpos] == "1" and self.grid[rpos + 1][cpos] == "x":
                        self.grid[rpos + 1][cpos] = "0"  # Solve 11x vertically
                    if char == self.grid[rpos + 1][cpos] == "1" and self.grid[rpos - 1][cpos] == "x":
                        self.grid[rpos - 1][cpos] = "0"  # Solve x11 vertically

                    if char == self.grid[rpos - 1][cpos] == "0" and self.grid[rpos + 1][cpos] == "x":
                        self.grid[rpos + 1][cpos] = "1"  # Solve 00x vertically
                    if char == self.grid[rpos + 1][cpos] == "0" and self.grid[rpos - 1][cpos] == "x":
                        self.grid[rpos - 1][cpos] = "1"  # Solve x00 vertically

        return self.grid

    def solve_quota(self):
        """
            Fills in the remaining squares if the quota of one of the digits has been hit.
            e.g. If a row already has three 0's filled in, the rest will be filled in with x's.

            Test horizontal with:   x00x01\nx11x1x\nx11x0x\nxxxxxx\nxxxxxx\nxxxxxx
            Test vertical with:     10xxxx\n1xxxxx\nxx0xxx\n100xxx\nxxxxxx\nx01xxx
        """

        # Solve horizontally
        for rpos, row in enumerate(self.grid):
            count = {char: row.count(char) for char in row}

            if count.get("0") == (self.puzzle_size / 2):
                for cpos, char in enumerate(row):
                    if char == "x":
                        row[cpos] = "1"
                self.grid[rpos] = row

            if count.get("1") == (self.puzzle_size / 2):
                for cpos, char in enumerate(row):
                    if char == "x":
                        row[cpos] = "0"
                self.grid[rpos] = row

        # Solve vertically
        for n in range(6):
            col = [self.grid[i][n] for i in range(self.puzzle_size)]
            count = {char: col.count(char) for char in col}

            if count.get("0") == (self.puzzle_size / 2):
                for cpos, char in enumerate(col):
                    if char == "x":
                        self.grid[cpos][n] = "1"

            if count.get("1") == (self.puzzle_size / 2):
                for cpos, char in enumerate(col):
                    if char == "x":
                        self.grid[cpos][n] = "0"

        return self.grid
