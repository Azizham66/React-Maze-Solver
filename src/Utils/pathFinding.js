import EasyStar from 'easystarjs';

export default function aStar(startPos, goalPos, grid) {
    const numberGrid = []

    for (let i = 0; i < grid.length; i++) {
        numberGrid[i] = [];
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j]) {
                numberGrid[i][j] = 1
            } else {
                numberGrid[i][j] = 0;
            }
        }
    }
    return new Promise((resolve) => {
        const easyStar = new EasyStar.js();
        easyStar.setGrid(numberGrid);
        easyStar.setAcceptableTiles([1]);
        easyStar.findPath(
            startPos[1], startPos[0],
            goalPos[1], goalPos[0],
            (path) => resolve(path) // resolve the promise with the path
        );
        easyStar.setIterationsPerCalculation(500);
        easyStar.calculate();
    });
}