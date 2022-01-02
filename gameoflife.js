class Cell {
    constructor(x, y, isAlive) {
        this.x = x;
        this.y = y;
        this.isAlive = isAlive;
    }
}

export default class GameOfLife {
    constructor(width, height) {
        this.width = Math.floor(width / 4);
        this.height = Math.floor(height / 4);
        this.cells = new Array(this.width);
        this.generation = 0;
    }

    init() {
        for (let x = 0; x < this.width; ++x) {
            this.cells[x] = new Array(this.height);
            for (let y = 0; y < this.height; ++y) {
                this.cells[x][y] = new Cell(x, y, Math.random() < 0.1);
            }
        }

        this.generation = 0;
    }

    update() {
        const newCells = [];

        for (let x = 0; x < this.width; ++x) {
            newCells[x] = new Array(this.height);

            for (let y = 0; y < this.height; ++y) {
                const cell = this.cells[x][y];
                const neighbors = this.#getNeighbors(cell);
                const isAlive = this.#isAlive(cell, neighbors);

                newCells[x][y] = new Cell(x, y, isAlive);
            }
        }

        this.cells = newCells;
        ++this.generation;
    }

    #getNeighbors(cell) {
        const neighbors = [];

        for (let x = cell.x - 1; x <= cell.x + 1; ++x) {
            for (let y = cell.y - 1; y <= cell.y + 1; ++y) {
                if (this.#isWithinRange(x, y) && this.#isNotSelf(x, y, cell)) {
                    neighbors.push(this.cells[x][y]);
                }
            }
        }

        return neighbors;
    }

    #isWithinRange(x, y) {
        return x >= 0 && x < this.width && y >= 0 && y < this.height;
    }

    #isNotSelf(x, y, cell) {
        return !(x === cell.x && y === cell.y)
    }

    #isAlive(cell, neighbors) {
        let aliveNeighbors = 0;

        for (let i = 0; i < neighbors.length; ++i) {
            if (neighbors[i].isAlive) {
                ++aliveNeighbors;
            }
        }

        if (cell.isAlive) {
            return aliveNeighbors === 2 || aliveNeighbors === 3;
        } else {
            return aliveNeighbors === 3;
        }
    }
}