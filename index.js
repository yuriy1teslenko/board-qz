const board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]];
const word = "ABCCED"

// Constraints:
//     board and word consists only of lowercase and uppercase English letters.
// 1 <= board.length <= 200
// 1 <= board[i].length <= 200
// 1 <= word.length <= 10^3

const findTraces = (word, board) => {
  const width = board[0].length;
  const flatBoard = board.flat(1);
  const initialTrace = {pathSteps: [], board: flatBoard, width};

  let traces = [initialTrace];
  word.split('').forEach((char, index) => {
    traces = traces.reduce((acc, trace) => {
      const positions = index ? findInNeighbors(char, trace) : findEntryPoints(char, trace);
      positions.forEach(position => {
        const nextStep = stepIn(position, trace);
        if (nextStep) acc.push(nextStep)
      })
      return acc
    }, [])
  })
  console.log(traces);
  return Boolean(traces.length)
};

const findEntryPoints = (char, { board }) => board.reduce((acc, el, position) => el === char ? [...acc, position]: acc, [])
const findInNeighbors = (char, { pathSteps, board, width }) => {
  const position = pathSteps[pathSteps.length - 1];
  const above = position - width;
  const onTheLeft = position - 1;
  const onTheRight = position + 1;
  const beneath = position + width;

  const positions = [];

  if (board[above] === char) positions.push(above)
  if ((position % width) && board[onTheLeft] === char) positions.push(onTheLeft)
  if ((onTheRight % width) && board[onTheRight] === char) positions.push(onTheRight)
  if (board[beneath] === char) positions.push(beneath)
  return positions
};
const stepIn = (newPosition, { pathSteps, board, width }) => pathSteps.find((pastStep) => pastStep === newPosition) ? null : ({
  pathSteps: [...pathSteps, newPosition],
  board,
  width
});

findTraces(word, board);
