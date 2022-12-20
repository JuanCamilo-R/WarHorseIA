import './App.css';
import { Square } from './Square';

function App() {
  const gridHeight = 8;
  const gridWidth = 8;

  const playerMove = async (squareId, squareType, squareStatus) => {
    console.log(squareId, squareType, squareStatus);
  };

  // Gets random positions.
  const getRandomPos = () => {
    let i = Math.floor(Math.random() * gridHeight);
    let j = Math.floor(Math.random() * gridWidth);
    return `${i},${j}`;
  };

  // Creates the inital board with all the squares declared free.
  const createBoard = () => {
    const squares = []; 
    const squaresProps = [];

    for (let i = 0; i < gridHeight; i++) {
      for (let j = 0; j < gridWidth; j++) {
        const squareId = `${i},${j}`;
        const squareType = '';
        const squareStatus = 'free';

        squares.push(
          <Square
            key={squareId}
            id={squareId}
            type={squareType}
            status={squareStatus}
            onClick={playerMove}
          />
        );

        squaresProps.push([squareType, squareStatus]);
      }
    }

    return [squares, squaresProps];
  };

  const initialBoard = createBoard();
  const squares = initialBoard[0]; // List of Square components.
  const squaresProps = initialBoard[1]; // List of properties of the Square components.

  // Replaces a Square in the list of Square components.
  const updateSquare = (pos, squaresProps, squares) => {
    const squareType = squaresProps[pos][0];
    const squareStatus = squaresProps[pos][1];

    squares[pos] = (
      <Square
        key={squares[pos].props.id}
        id={squares[pos].props.id}
        type={squareType}
        status={squareStatus}
        onClick={playerMove}
      />
    );
  };

  // Sets the starting positions of the players.
  const setPlayersPositions = (squaresProps, squares) => {
    const greenPlayerPos = getRandomPos();
    let redPlayerPos = getRandomPos();

    while (redPlayerPos === greenPlayerPos) {
      redPlayerPos = getRandomPos();
    }

    const greenPlayerPosRow = parseInt(greenPlayerPos.split(',')[0]);
    const greenPlayerPosColumn = parseInt(greenPlayerPos.split(',')[1]);
    const redPlayerPosRow = parseInt(redPlayerPos.split(',')[0]);
    const redPlayerPosColumn = parseInt(redPlayerPos.split(',')[1]);

    const greenPlayerListPos = greenPlayerPosRow * gridWidth + greenPlayerPosColumn;
    const redPlayerListPos = redPlayerPosRow * gridWidth + redPlayerPosColumn;

    squaresProps[greenPlayerListPos][0] = 'horse';
    squaresProps[greenPlayerListPos][1] = 'green';

    squaresProps[redPlayerListPos][0] = 'horse';
    squaresProps[redPlayerListPos][1] = 'red';

    updateSquare(greenPlayerListPos, squaresProps, squares);
    updateSquare(redPlayerListPos, squaresProps, squares);

    return [greenPlayerPos, redPlayerPos];
  };


  // Obtains the adjacent positions of a position.
  const adjacentPositions = (position) => {
    const adjacentPositions = [];

    adjacentPositions.push([position[0] - 1, position[1]]); // Up.
    adjacentPositions.push([position[0] - 1, position[1] + 1]); // Upper right diagonal.
    adjacentPositions.push([position[0], position[1] + 1]); // Right.
    adjacentPositions.push([position[0] + 1, position[1] + 1]); // Lower right diagonal.
    adjacentPositions.push([position[0] + 1, position[1]]); // Down.
    adjacentPositions.push([position[0] + 1, position[1] - 1]); // Lower left diagonal.
    adjacentPositions.push([position[0], position[1] - 1]); // Left.
    adjacentPositions.push([position[0] - 1, position[1] - 1]); // Upper left diagonal.

    return adjacentPositions;
  };
  
  // Sets the bonuses positions.
  const setBonuses = (squaresProps, squares, greenPlayerPos, redPlayerPos) => {
    let firstBonusPos = getRandomPos();
    let secondBonusPos = getRandomPos();
    let thirdBonusPos = getRandomPos();

    // Checks that the first bonus position is not the same position of one of the players.
    while (
      (firstBonusPos === greenPlayerPos) |
      (firstBonusPos === redPlayerPos) 
    ) {
      firstBonusPos = getRandomPos();
    }

    /* Checks that the position of the second bonus is not the same position of the first bonus
     or one of the players.*/
    while (
      (secondBonusPos === firstBonusPos) |
      (secondBonusPos === greenPlayerPos) |
      (secondBonusPos === redPlayerPos)
    ) {
      secondBonusPos = getRandomPos();
    }

    /* Checks that the position of the third bonus is not the same position of the first bonus, 
     the second bonus, or one of the players.*/
    while (
      (thirdBonusPos === firstBonusPos) |
      (thirdBonusPos === secondBonusPos) |
      (thirdBonusPos === greenPlayerPos) |
      (thirdBonusPos === redPlayerPos)
    ) {
      thirdBonusPos = getRandomPos();
    }

    const firstBonusPosRow = parseInt(firstBonusPos.split(',')[0]);
    const firstBonusPosColumn = parseInt(firstBonusPos.split(',')[1]);
    const secondBonusPosRow = parseInt(secondBonusPos.split(',')[0]);
    const secondBonusPosColumn = parseInt(secondBonusPos.split(',')[1]);
    const thirdBonusPosRow = parseInt(thirdBonusPos.split(',')[0]);
    const thirdBonusPosColumn = parseInt(thirdBonusPos.split(',')[1]);

    const firstBonusListPos = firstBonusPosRow * gridWidth + firstBonusPosColumn;
    const secondBonusListPos = secondBonusPosRow * gridWidth + secondBonusPosColumn;
    const thirdBonusListPos = thirdBonusPosRow * gridWidth + thirdBonusPosColumn;

    squaresProps[firstBonusListPos][0] = 'bonus';
    squaresProps[secondBonusListPos][0] = 'bonus';
    squaresProps[thirdBonusListPos][0] = 'bonus';

    updateSquare(firstBonusListPos, squaresProps, squares);
    updateSquare(secondBonusListPos, squaresProps, squares);
    updateSquare(thirdBonusListPos, squaresProps, squares);
  };

  // Prints the board by recorring the list of Square components.
  const printBoard = (squaresProps, squaresList) => {
    const playersPositions = setPlayersPositions(squaresProps, squaresList);
    const greenPlayerPos = playersPositions[0];
    const redPlayerPos = playersPositions[1];
    setBonuses(squaresProps, squaresList, greenPlayerPos, redPlayerPos);
    const squares = [];

    for (let i = 0; i < gridHeight; i++) {
      let row = [];
      for (let j = 0; j < gridWidth; j++) {
        row.push(squaresList[i * gridWidth + j]);
      }
      squares.push(
        <div key={i} className="boardRow">
          {row}
        </div>
      );
    }

    return squares;
  };

  return (
    <div className="app">
      <h1 className="title">⚔️ War horses 🐎</h1>
      <div className="board">{printBoard(squaresProps, squares)}</div>
    </div>
  );
}

export default App;
