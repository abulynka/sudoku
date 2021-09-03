module.exports = function solveSudoku(matrix) {
  const sudoku = new Sudoku(matrix);
  sudoku.solve();
  return sudoku.matrix;
}

class Sudoku {
  /**
   * @param {number[][]} matrix
   */
  constructor(matrix, main, counter) {
    this.matrix = matrix;
    this.main = main;
    this.counter = counter;
  }

  solve = function() {
    let guard = 100000;
    while (this.solved() === false && --guard > 0) {
      if (this.makeChange() === false) {
        return false;
      }
    }

    return true;
  }

  makeChange = function() {
    for (let i = 0; i < this.matrix.length; ++i) {
      for (let j = 0; j < this.matrix[i].length; ++j) {
        if (this.matrix[i][j] === 0) {
          for (let k = 1; k < 10; ++k) {
            this.matrix[i][j] = k;
            if (this.validate() === true) {
              const sudoku = new Sudoku([...this.matrix]);
              if (sudoku.solve() === true) {
                this.matrix = sudoku.matrix;
                return true;
              }
            }
            this.matrix[i][j] = 0;
          }
          return false;
        }
      }
    }
  }

  validate = function() {
    for (let i = 0; i < this.matrix.length; ++i) {
      let duplicates = this.getDuplicates(this.matrix[i]);
      if (this.checkForDuplicates(duplicates)) {
        return false;
      }

      const line = [];
      for (let j = 0; j < this.matrix.length; ++j) {
        line.push(this.matrix[j][i]);
      }
      duplicates = this.getDuplicates(line);
      if (this.checkForDuplicates(duplicates)) {
        return false;
      }
    }

    for (let m = 0; m < 3; ++m) {
      for (let n = 0; n < 3; ++n) {
        const line = this.getLineFromSquare(m, n);
        const duplicates = this.getDuplicates(line);
        if (this.checkForDuplicates(duplicates)) {
          return false;
        }
      }
    }

    return true;
  }

  checkForDuplicates = function(duplicates) {
    if (duplicates.length > 1) {
      return true;
    }

    if (duplicates.length === 1 && duplicates[0] !== 0) {
      return true;
    }

    return false;
  }

  getDuplicates = function(arr) {
    const uniqueElements = new Set(arr);
    const filteredElements = arr.filter(
      (item) => {
        if (uniqueElements.has(item)) {
          uniqueElements.delete(item);
          return false;
        } else {
          return true;
        }
      }
    );
    return Array.from(new Set(filteredElements));
  }

  getLineFromSquare(m, n) {
    const line = [];
    for (let i = m * 3; i < m * 3 + 3; ++i) {
      for (let j = n * 3; j < n * 3 + 3; ++j) {
        line.push(this.matrix[i][j]);
      }
    }
    return line;
  }

  solved = function() {
    for (let i = 0; i < this.matrix.length; ++i) {
      for (let j = 0; j < this.matrix[i].length; ++j) {
        if (this.matrix[i][j] === 0) {
          return false;
        }
      }
    }
    return true;
  }
}
