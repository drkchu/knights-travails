// Think of the start position as the root of a tree, with each branch being a possible path going down.

// Idea: Starting at the start position, add all children to a queue. Essentially a BFS search:


class pathElement {
    constructor(movesToGetToPosition, position) {
        this.movesToGetToPosition = movesToGetToPosition;
        this.position = position;
    }
}

// Example: knightMoves([0,0],[1,2]) == [[0,0],[1,2]]
function knightMoves(start, finish) {
    const queue = [];
    let result = [];

    queue.push(new pathElement([start], start));

    while (queue.length !== 0) {
        const currPathElement = queue.shift();

        // Be careful here, I was originally comparing the arrays which checks if the reference are the same!! 
        if (currPathElement.position[0] === finish[0] && currPathElement.position[1] === finish[1]) {
            printSolution(currPathElement.movesToGetToPosition);
            return;
        }
        
        
        const nextMoves = generateNextMoves(currPathElement.position);

        nextMoves.forEach((position) => {
            if (isValidBoardPosition(position)) 
                queue.push(new pathElement(currPathElement.movesToGetToPosition.concat([position]), position));
        });
    }
}

// Returns an array of all the next possible moves from the given positon, valid or invalid
function generateNextMoves(position) {
    return [[position[0] + 2, position[1] + 1],
            [position[0] + 2, position[1] - 1],
            [position[0] + 1, position[1] + 2],
            [position[0] + 1, position[1] - 2],
            [position[0] - 1, position[1] + 2],
            [position[0] - 1, position[1] - 2],
            [position[0] - 2, position[1] + 1],
            [position[0] - 2, position[1] - 1]];
}

// Function that checks whether the given position is valid
function isValidBoardPosition(position) {
    const x = position[0];
    const y = position[1];

    return 0 <= x && x <= 7 && 0 <= y && y <= 7;
}

function printSolution(pathSolution) {
    console.log(`You made it in ${pathSolution.length} moves!  Here's your path:`)
    pathSolution.forEach((position) => console.log(position));
}

knightMoves([0,0],[7,7]);