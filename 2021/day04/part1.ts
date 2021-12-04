export {};

type Board = { number: number; checked: boolean }[][];

interface Game {
  numbers: number[];
  boards: Board[];
}

function getBoards(
  input: string[]
): { number: number; checked: boolean }[][][] {
  if (input.length) {
    return [
      input.slice(0, 5).map((row) =>
        row
          .replaceAll('  ', ' ')
          .trim()
          .split(' ')
          .map((n) => ({ number: Number(n), checked: false }))
      ),
    ].concat(getBoards(input.slice(6)));
  }
  return [];
}

function parseInput(input: string[]): Game {
  return {
    numbers: input[0].split(',').map((n) => Number(n)),
    boards: getBoards(input.slice(2)),
  };
}

function didWin(board: { number: number; checked: boolean }[][]) {
  return (
    board.some((row) => row.every((cell) => cell.checked)) ||
    [0, 1, 2, 3, 4].some((i) => board.every((row) => row[i].checked))
  );
}

function computeResult(winner: Board, number: number): number {
  return (
    winner.reduce((acc, row) => {
      return (
        acc +
        row.reduce((acc, cell) => {
          return acc + (!cell.checked ? cell.number : 0);
        }, 0)
      );
    }, 0) * number
  );
}

function play(game: Game): number {
  for (const number of game.numbers.slice(0, 5)) {
    game.boards.map((board) => {
      board.map((row) => {
        row.map((cell) => {
          if (cell.number === number) {
            cell.checked = true;
          }
        });
      });
    });
    const winner = game.boards.find((board) => didWin(board));
    if (winner) {
      return computeResult(winner, number);
    }
  }
  return play({
    numbers: game.numbers.slice(5),
    boards: game.boards,
  });
}

console.log(play(parseInput((await Deno.readTextFile('./input')).split('\n'))));
