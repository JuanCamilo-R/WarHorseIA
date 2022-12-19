import './App.css';
import { Square } from './Square';

function App() {
  const playerMove = async (squareId, squareType, squareStatus) => {
    console.log(squareId, squareType, squareStatus);
  };

  const getRandomPos = () => {
    let i = Math.floor(Math.random() * 7);
    let j = Math.floor(Math.random() * 7);
    return `${i},${j}`;
  }

  const printBoard = () => {
    const squares = [];
    const greenPlayer = getRandomPos();
    var redPlayer = getRandomPos();

    while(redPlayer === greenPlayer){
      redPlayer = getRandomPos();
    }

    for (var i = 0; i < 8; i++) {
      let row = [];
      for (var j = 0; j < 8; j++) {
        const squareId = `${i},${j}`;
        const squareStatus = squareId === greenPlayer ? "green" : squareId === redPlayer ? "red" : "free"
        const squareType = squareId === greenPlayer ? "horse" : squareId === redPlayer ? "horse" : ""

        row.push(
          <Square
            key={squareId}
            id={squareId}
            type={squareType}
            status={squareStatus}
            onClick={playerMove}
          />
        );
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
      <div className="board">{printBoard()}</div>
    </div>
  );
}

export default App;
