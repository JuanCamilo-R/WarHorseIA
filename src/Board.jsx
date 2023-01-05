import React from 'react';
import './styles/App.css';
import { Square } from './Square';
import { World } from "./logic/world.js";
import { DepthAlgorithm } from "./logic/depthAlgorithm.js";

const GRIDHEIGHT = 8;
const GRIDWIDTH = 8;

// Initial world
const newWorld = new World();
newWorld.fillWorld();
const initialWorld = newWorld.getWorld()

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: this.setInitialPositions(initialWorld),
            redIsNext: true,
            redHorseId: `${newWorld.redHorse[0]},${newWorld.redHorse[1]}`,
            greenHorseId: `${newWorld.greenHorse[0]},${newWorld.greenHorse[1]}`,
            redScore: 1,
            greenScore: 1,
        };
    }

    gameOver = false;

    // Sets the starting positions of the squares.
    setInitialPositions = (world) => {
        const squares = this.convertWorld(world);
        return squares;
    }


    componentDidMount = () => {
        setTimeout(
            () => this.moveRed(this.state.squares),
            1000
        );
    }

    moveRed = async (list) => {

        const squares = JSON.parse(JSON.stringify(list));

        const world = this.convertToMatrix(squares);
        const algorithm = new DepthAlgorithm(world, this.props.level);
        const solution = await algorithm.start();

        const solutionSquares = this.convertWorld(solution);
        const newRedHorseId = this.searchRedHorse(solution);

        let score = 1;
        const newRedHorsePos = this.idToPos(newRedHorseId);
        if (squares[newRedHorsePos][0] === 'bonus') {
            const posibleSquares = this.adjacentSquares(newRedHorseId, squares);
            score += posibleSquares.length;
        }

        this.setState({
            redHorseId: newRedHorseId, squares: solutionSquares,
            redScore: this.state.redScore + score,
        });

        // Checks if the green player can move.
        if (this.knightMoves(this.state.greenHorseId, solutionSquares, 'free').length > 0) {
            this.setState({ redIsNext: false, });
        }

        // If the green player cannot move, checks if the red player can play again.
        else if (this.knightMoves(newRedHorseId, solutionSquares, 'free').length > 0) {
            setTimeout(
                () => this.moveRed(solutionSquares),
                1000
            );
        }
    }

    // Converts a world matrix to a list with the interface values.
    convertWorld = (world) => {
        const converted = Array(GRIDHEIGHT * GRIDWIDTH);

        const position = {
            0: ['', 'free'],
            1: ['horse', 'red'],
            2: ['horse', 'green'],
            3: ['bonus', 'free'],
            4: ['', 'red'],
            5: ['', 'green'],
            'default': ['', 'free'],
        };

        for (let i = 0; i < GRIDHEIGHT; i++) {
            for (let j = 0; j < GRIDWIDTH; j++) {
                converted[i * GRIDWIDTH + j] = position[world[i][j]] ?? position['default'];
            }
        }

        return converted;
    }

    // Converts a world list to a matrix with the logic values.
    convertToMatrix = (squares) => {
        let world = Array(GRIDHEIGHT).fill(Array(GRIDWIDTH));
        world = JSON.parse(JSON.stringify(world));

        for (let i = 0; i < GRIDHEIGHT; i++) {
            for (let j = 0; j < GRIDWIDTH; j++) {
                const index = i * GRIDWIDTH + j;

                if (squares[index][0] === '' && squares[index][1] === 'free') {
                    world[i][j] = 0;
                }

                else if (squares[index][0] === 'horse' && squares[index][1] === 'red') {
                    world[i][j] = 1;
                }

                else if (squares[index][0] === 'horse' && squares[index][1] === 'green') {
                    world[i][j] = 2;
                }

                else if (squares[index][0] === 'bonus' && squares[index][1] === 'free') {
                    world[i][j] = 3;
                }

                else if (squares[index][0] === '' && squares[index][1] === 'red') {
                    world[i][j] = 4;
                }

                else if (squares[index][0] === '' && squares[index][1] === 'green') {
                    world[i][j] = 5;
                }

                else {
                    world[i][j] = 0;
                }

            }
        }

        return world;
    }

    searchRedHorse = (world) => {
        let id;
        for (let i = 0; i < GRIDHEIGHT; i++) {
            for (let j = 0; j < GRIDWIDTH; j++) {
                if (world[i][j] === 1) {
                    id = `${i},${j}`;
                    return id;
                }
            }
        }
        return id;
    }

    // Executes actions when a square is clicked on.
    playerMove = (i, id) => {

        const squares = JSON.parse(JSON.stringify(this.state.squares));

        if (!this.gameOver && !this.state.redIsNext && squares[i][1] !== 'free') {

            const horseId = this.state.greenHorseId;

            // Horse.
            if (squares[i][0] === 'horse' && squares[i][1] === 'green') {
                squares[i] = ['horse-selected', 'green'];
                const posibleMoves = this.knightMoves(id, squares, 'free');
                for (let a = 0; a < posibleMoves.length; a++) {
                    const index = posibleMoves[a];
                    const type = squares[index][0];
                    squares[index] = [type, 'free-dark'];
                }
                this.setState({ squares: squares });
            }

            // Horse selected.
            else if (squares[i][0] === 'horse-selected' && squares[i][1] === 'green') {
                squares[i] = ['horse', 'green'];
                const posibleMoves = this.knightMoves(id, squares, 'free-dark');
                for (let a = 0; a < posibleMoves.length; a++) {
                    const index = posibleMoves[a];
                    const type = squares[index][0];
                    squares[index] = [type, 'free'];
                }
                this.setState({ squares: squares });
            }

            // Free-dark.
            else if (squares[i][0] === '' && squares[i][1] === 'free-dark') {
                const posibleMoves = this.knightMoves(horseId, squares, 'free-dark');
                for (let a = 0; a < posibleMoves.length; a++) {
                    const index = posibleMoves[a];
                    const type = squares[index][0];
                    squares[index] = [type, 'free'];
                }

                const horsePos = this.idToPos(horseId);
                squares[horsePos] = ['', 'green'];

                squares[i] = ['horse', 'green'];

                this.setState({
                    squares: squares, greenHorseId: id, greenScore: this.state.greenScore + 1,
                });

                // Checks if the red player can move.
                if (this.knightMoves(this.state.redHorseId, squares, 'free').length > 0) {
                    this.setState({ redIsNext: true, });
                    setTimeout(
                        () => this.moveRed(squares),
                        1000
                    );
                }
            }

            // Bonus.
            else if (squares[i][0] === 'bonus' && squares[i][1] === 'free-dark') {
                let score = 1;
                const posibleMoves = this.knightMoves(horseId, squares, 'free-dark');
                for (let a = 0; a < posibleMoves.length; a++) {
                    const index = posibleMoves[a];
                    const type = squares[index][0];
                    squares[index] = [type, 'free'];
                }

                const posibleSquares = this.adjacentSquares(id, squares);
                for (let a = 0; a < posibleSquares.length; a++) {
                    const index = posibleSquares[a];
                    squares[index] = ['', 'green'];
                    score++;
                }

                const horsePos = this.idToPos(horseId);
                squares[horsePos] = ['', 'green'];

                squares[i] = ['horse', 'green'];

                this.setState({
                    squares: squares, greenHorseId: id, greenScore: this.state.greenScore + score,
                });

                // Checks if the red player can move.
                if (this.knightMoves(this.state.redHorseId, squares, 'free').length > 0) {
                    this.setState({ redIsNext: true, });
                    setTimeout(
                        () => this.moveRed(squares),
                        1000
                    );
                }
            }
        }
    }

    idToPos = (id) => {
        const i = parseInt(id.split(',')[0]);
        const j = parseInt(id.split(',')[1]);
        return i * GRIDWIDTH + j;
    }

    // Obtains the possible knight moves in chess for a given position.
    knightMoves = (id, squares, status) => {
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
            const index = row * GRIDWIDTH + column;

            if (row >= 0 && row < GRIDHEIGHT && column >= 0 && column < GRIDWIDTH) {
                if (squares[index][1] === status) {
                    possibleMoves.push(index);
                }
            }
        }

        return possibleMoves;
    }

    // Obtains the adjacent squares of a square. 
    adjacentSquares = (id, squares) => {
        const i = parseInt(id.split(',')[0]);
        const j = parseInt(id.split(',')[1]);

        const adjacent = [];
        adjacent.push([i - 1, j]); // Up.
        adjacent.push([i, j + 1]); // Right.
        adjacent.push([i + 1, j]); // Down.
        adjacent.push([i, j - 1]); // Left.

        const possibleSquares = [];
        for (let i = 0; i < adjacent.length; i++) {
            const row = adjacent[i][0];
            const column = adjacent[i][1];
            const index = row * GRIDWIDTH + column;

            if (row >= 0 && row < GRIDHEIGHT && column >= 0 && column < GRIDWIDTH) {
                if (squares[index][1] === 'free') {
                    possibleSquares.push(index);
                }
            }
        }

        return possibleSquares;
    }

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
        let winner = 'no winner yet';

        const redMoves = this.knightMoves(this.state.redHorseId, squares, 'free');
        if (redMoves.length > 0) {
            return winner;
        }
        const redMoves2 = this.knightMoves(this.state.redHorseId, squares, 'free-dark');
        if (redMoves2.length > 0) {
            return winner;
        }
        const greenMoves = this.knightMoves(this.state.greenHorseId, squares, 'free');
        if (greenMoves.length > 0) {
            return winner;
        }
        const greenMoves2 = this.knightMoves(this.state.greenHorseId, squares, 'free-dark');
        if (greenMoves2.length > 0) {
            return winner;
        }

        const redScore = this.state.redScore;
        const greenScore = this.state.greenScore;

        this.gameOver = true;

        winner =
            redScore === greenScore
                ? 'Game ends in a draw'
                : redScore > greenScore
                    ? 'Red player wins'
                    : 'Green player wins';

        return winner;
    }

    render = () => {

        const winner = this.calculateWinner(this.state.squares);

        // Shows who plays next.
        let status =
            winner === 'no winner yet'
                ? (this.state.redIsNext ? `Red's ` : `Green's `) + 'turn '
                : winner;

        const playAgain =
            winner === 'no winner yet'
                ? <></>
                : <><a className='playAgainCaption' href="./">Play again</a></>;

        const squaresRows = [];
        // Creates and organizes all the squares.
        for (let i = 0; i < GRIDHEIGHT; i++) {
            let row = [];
            for (let j = 0; j < GRIDWIDTH; j++) {
                const squareId = `${i},${j}`;
                const pos = this.idToPos(squareId)

                row.push(
                    this.renderSquare(
                        squareId,
                        () => {
                            this.playerMove(pos, squareId);
                        },
                        pos
                    )
                );
            }
            squaresRows.push(<div key={i} className="boardRow">{row}</div>);
        }

        return (
            <div className="appBody">
                <div>
                    <div className="scoreContainer">
                        <div title='Red' className="redScore">{this.state.redScore}</div>
                        <div title='Green' className="greenScore">{this.state.greenScore}</div>
                    </div>
                    <div className="board">{squaresRows}</div>
                </div>
                <div className="status">
                    <div className="statusCaption">{status}</div>
                    {playAgain}
                </div>
            </div>
        );
    }
}

export default Board;
