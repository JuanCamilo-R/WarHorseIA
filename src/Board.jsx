import React from 'react';
import './styles/App.css';
import { Square } from './Square';

const GRIDHEIGHT = 8;
const GRIDWIDTH = 8;

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: this.setInitialPositions(),
            redIsNext: true,
        };
    }

    // Gets random positions.
    getRandomPos = () => {
        let pos = Math.floor(Math.random() * (GRIDHEIGHT * GRIDWIDTH));
        return pos;
    };

    // Creates the bonuses positions.
    createBonusesPositions = (greenPlayerPos, redPlayerPos) => {
        let firstBonusPos = this.getRandomPos();
        let secondBonusPos = this.getRandomPos();
        let thirdBonusPos = this.getRandomPos();

        // Checks that the first bonus position is not the same position of one of the players.
        while (
            (firstBonusPos === greenPlayerPos) |
            (firstBonusPos === redPlayerPos)
        ) {
            firstBonusPos = this.getRandomPos();
        }

        /* Checks that the position of the second bonus is not the same position of the first bonus
         or one of the players.*/
        while (
            (secondBonusPos === firstBonusPos) |
            (secondBonusPos === greenPlayerPos) |
            (secondBonusPos === redPlayerPos)
        ) {
            secondBonusPos = this.getRandomPos();
        }

        /* Checks that the position of the third bonus is not the same position of the first bonus, 
         the second bonus, or one of the players.*/
        while (
            (thirdBonusPos === firstBonusPos) |
            (thirdBonusPos === secondBonusPos) |
            (thirdBonusPos === greenPlayerPos) |
            (thirdBonusPos === redPlayerPos)
        ) {
            thirdBonusPos = this.getRandomPos();
        }
        return [firstBonusPos, secondBonusPos, thirdBonusPos];
    };

    // Sets the starting positions of the squares.
    setInitialPositions = () => {
        const greenPlayerPos = this.getRandomPos();
        let redPlayerPos = this.getRandomPos();

        while (redPlayerPos === greenPlayerPos) {
            redPlayerPos = this.getRandomPos();
        }

        const bonusesPositions = this.createBonusesPositions(greenPlayerPos, redPlayerPos);

        const squares = Array(GRIDHEIGHT * GRIDWIDTH).fill(['', 'free']);
        squares[greenPlayerPos] = ['horse', 'green'];
        squares[redPlayerPos] = ['horse', 'green'];
        squares[bonusesPositions[0]] = ['bonus', 'free'];
        squares[bonusesPositions[1]] = ['bonus', 'free'];
        squares[bonusesPositions[2]] = ['bonus', 'free'];

        return squares;
    };

    // Executes actions when a square is clicked on.
    playerMove = (i, id) => {
        const squares = this.state.squares.slice();
        console.log(i, id);
        squares[i] = this.state.redIsNext ? ['', 'red'] : ['', 'green'];
        this.setState({ squares: squares, redIsNext: !this.state.redIsNext, });
    }

    renderSquare = (squareId, onClick, pos) => {
        return (
            <Square
                key={squareId}
                id={squareId}
                type={this.state.squares[pos][0]}
                status={this.state.squares[pos][1]}
                onClick={onClick}
            />
        );
    }

    render = () => {
        // Shows who plays next.
        const status = (this.state.redIsNext ? `  Red's ` : `Green's `) + 'turn ';

        const squaresList = [];
        // Creates all the squares.
        for (let i = 0; i < GRIDHEIGHT; i++) {
            for (let j = 0; j < GRIDWIDTH; j++) {
                const squareId = `${i},${j}`;
                const pos = i * GRIDWIDTH + j;

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
