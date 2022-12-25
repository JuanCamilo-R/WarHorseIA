import React from 'react';
import './styles/App.css';
import { Square } from './Square';
import { World } from "./logic/world.js";

const GRIDHEIGHT = 8;
const GRIDWIDTH = 8;

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: this.setInitialPositions(),
            redIsNext: true,
            gameOver: false,
            horseId: '',
        };
    }

    // Sets the starting positions of the squares.
    setInitialPositions = () => {

        let newWorlds = new World();
        newWorlds.fillWorld();
        const newWorld = newWorlds.world;
        newWorlds.printWorld();

        const squares = Array(GRIDHEIGHT * GRIDWIDTH).fill(['', 'free']);

        for (let i = 0; i < GRIDHEIGHT; i++) {
            for (let j = 0; j < GRIDWIDTH; j++) {

                if (newWorld[i][j] === 1) {
                    squares[i * GRIDWIDTH + j] = ['horse', 'red'];
                    // redPlayerPos = i,j
                }

                if (newWorld[i][j] === 2) {
                    squares[i * GRIDWIDTH + j] = ['horse', 'green'];
                    // greenPlayerPos = i,j
                }

                if (newWorld[i][j] === 3) {
                    squares[i * GRIDWIDTH + j] = ['bonus', 'free'];
                }

                if (newWorld[i][j] === 4) {
                    squares[i * GRIDWIDTH + j] = ['', 'red'];
                }

                if (newWorld[i][j] === 5) {
                    squares[i * GRIDWIDTH + j] = ['', 'green'];
                }

            }
        }

        return squares;
    };

    // Executes actions when a square is clicked on.
    playerMove = (i, id) => {
        const squares = this.state.squares.slice();

        if (!this.state.gameOver && squares[i][1] !== 'free') {

            const turn = this.state.redIsNext ? 'red' : 'green'

            // Horse.
            if (squares[i][0] === 'horse' && squares[i][1] === turn) {
                squares[i] = ['horse-selected', turn];
                const posibleMoves = this.knightMoves(id);
                for (let a = 0; a < posibleMoves.length; a++) {
                    const index = posibleMoves[a];
                    const type = squares[index][0];
                    const status = squares[index][1];

                    if (status === 'free') {
                        squares[index] = [type, 'free-dark'];
                    }
                }
                this.setState({ squares: squares, horseId: id });
            }
            else {
                // Horse selected.
                if (squares[i][0] === 'horse-selected' && squares[i][1] === turn) {
                    squares[i] = ['horse', turn];
                    const posibleMoves = this.knightMoves(id);
                    for (let a = 0; a < posibleMoves.length; a++) {
                        const index = posibleMoves[a];
                        const type = squares[index][0];
                        const status = squares[index][1];

                        if (status === 'free-dark') {
                            squares[index] = [type, 'free'];
                        }
                    }
                    this.setState({ squares: squares });
                }
            }

            // Free-dark.
            if (squares[i][0] === '' && squares[i][1] === 'free-dark') {
                const posibleMoves = this.knightMoves(this.state.horseId);
                for (let a = 0; a < posibleMoves.length; a++) {
                    const index = posibleMoves[a];
                    const type = squares[index][0];
                    const status = squares[index][1];

                    if (status === 'free-dark') {
                        squares[index] = [type, 'free'];
                    }
                }

                const horsePos = this.idToPos(this.state.horseId);
                squares[horsePos] = ['', turn];

                squares[i] = ['horse', turn];

                this.setState({ squares: squares, redIsNext: turn === 'red' ? false : true });
            }
        }
    }

    idToPos = (id) => {
        const i = parseInt(id.split(',')[0]);
        const j = parseInt(id.split(',')[1]);
        return i * GRIDWIDTH + j;
    }

    // Obtains the possible knight moves in chess for a given position.
    knightMoves = (id) => {
        const i = parseInt(id.split(',')[0]);
        const j = parseInt(id.split(',')[1]);

        const moves = [];
        moves.push([i - 2, j - 1]); // 1st.
        moves.push([i - 2, j + 1]); // 2nd.
        moves.push([i - 1, j + 2]); // 3rd.
        moves.push([i + 1, j + 2]); // 4th.
        moves.push([i + 2, j + 1]); // 5th.
        moves.push([i + 2, j - 1]); // 6th.
        moves.push([i + 1, j - 2]); // 7th.
        moves.push([i - 1, j - 2]); // 8th.

        const possibleMoves = [];
        for (let i = 0; i < moves.length; i++) {
            const row = moves[i][0];
            const column = moves[i][1];

            if (row >= 0 && row < GRIDHEIGHT &&
                column >= 0 && column < GRIDWIDTH) {
                possibleMoves.push(row * GRIDWIDTH + column);
            }
        }

        return possibleMoves;
    };

    renderSquare = (squareId, onClick, pos) => {
        return (
            <Square
                key={squareId}
                type={this.state.squares[pos][0]}
                status={this.state.squares[pos][1]}
                onClick={onClick}
            />
        );
    }

    // Scans the board to determine if there are no more possible moves and returns a winner.
    calculateWinner = (squares) => {
        let winner;
        let redsCount = 0;
        let greensCount = 0;

        for (let i = 0; i < GRIDHEIGHT * GRIDWIDTH; i++) {
            if (squares[i][1] === 'free' || squares[i][1] === 'free-dark') {
                return 'no winner yet';
            }
            if (squares[i][1] === 'red') {
                redsCount++;
            }
            if (squares[i][1] === 'green') {
                greensCount++;
            }
        }

        winner = (redsCount === greensCount) ? 'Game ends in a draw' : (redsCount > greensCount) ? 'Red player wins' : 'Green player wins'
        this.setState({ gameOver: true });
        return winner;
    }

    render = () => {
        // 
        const winner = this.calculateWinner(this.state.squares);

        // Shows who plays next.
        let status = winner === 'no winner yet' ? (this.state.redIsNext ? `Red's ` : `Green's `) + 'turn ' : winner;

        const squaresList = [];
        // Creates all the squares.
        for (let i = 0; i < GRIDHEIGHT; i++) {
            for (let j = 0; j < GRIDWIDTH; j++) {
                const squareId = `${i},${j}`;
                const pos = this.idToPos(squareId)

                squaresList.push(
                    this.renderSquare(
                        squareId,
                        () => {
                            this.playerMove(pos, squareId);
                        },
                        pos
                    )
                );
            }
        }

        const squaresRows = [];
        //Organizes all the squares.
        for (let i = 0; i < GRIDHEIGHT; i++) {
            let row = [];
            for (let j = 0; j < GRIDWIDTH; j++) {
                row.push(squaresList[i * GRIDWIDTH + j]);
            }
            squaresRows.push(
                <div key={i} className="boardRow">
                    {row}
                </div>
            );
        }

        return (
            <div className="appBody">
                <div className="board">{squaresRows}</div>
                <div className="statusCaption">{status}</div>
            </div>
        );
    }
}

export default Board;
