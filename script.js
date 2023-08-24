class boardNode {
  constructor(index, neighbours = null) {
    this.index = index;
    this.neighbours = neighbours;
    this.visited = null;
  }
}
function getNeighbours(root) {
  const x = root.index[0];
  const y = root.index[1];

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
      neighbours.push(node);
    }
  }
  return neighbours;
}

const sampleNode = new boardNode([0, 0]);
sampleNode.neighbours = getNeighbours(sampleNode);
sampleNode.neighbours.forEach((neighbour) => {
  console.log(neighbour.index);
});
