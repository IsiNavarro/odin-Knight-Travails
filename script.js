const q = [];

class boardNode {
  constructor(index, neighbours = null) {
    this.index = index;
    this.neighbours = neighbours;
    this.parent = null;
  }
  getNeighbours() {
    const x = this.index[0];
    const y = this.index[1];

    const possibleMoves = [
      [-2, -1],
      [-2, 1],
      [-1, -2],
      [-1, 2],
      [1, -2],
      [1, 2],
      [2, -1],
      [2, 1],
    ];

    const neighbours = [];

    for (let i = 0; i < possibleMoves.length; i++) {
      //Check X coordinate is in the board
      //Check Y coordinate is in the board
      if (
        x + possibleMoves[i][0] < 0 ||
        x + possibleMoves[i][0] > 7 ||
        y + possibleMoves[i][1] < 0 ||
        y + possibleMoves[i][1] > 7
      ) {
      } else {
        const node = new boardNode([
          x + possibleMoves[i][0],
          y + possibleMoves[i][1],
        ]);
        // Give each node its parent
        node.parent = this;

        neighbours.push(node);
      }
    }
    this.neighbours = neighbours;
  }
  depth(parent = this.parent, steps = 0) {
    if (parent === null) return steps;
    else {
      steps++;
      return this.depth(parent.parent, steps);
    }
  }

  //Path returns an array with positions visited. path[0] is the last position i.e.: goal position
  path(node = this, path = []) {
    if (node.parent === null) return path;
    else {
      path.push(node.index);
      return this.path(node.parent, path);
    }
  }
}

function KnightTravails(start, end) {
  //Add the very first node
  if (q.length === 0) q.push(new boardNode(start));
  //1. Check if found
  // Comparing arrays is tricky 'cause they're references
  if (JSON.stringify(start) === JSON.stringify(end)) {
    return q.shift();
  } else {
    const startNode = q[0];
    //2. Shift queue
    q.shift();

    //3. Get neighbours
    startNode.getNeighbours();

    //4. Add neigbours to Queue
    startNode.neighbours.forEach((neighbour) => {
      q.push(neighbour);
    });

    //5 Pass first in line to the function back again
    return KnightTravails(q[0].index, end);
  }
}

const node = KnightTravails([0, 0], [2, 4]);
const path = node.path();
console.log(path);

//Could optimise already taken paths. So that the queue doesn't get so many nodes
