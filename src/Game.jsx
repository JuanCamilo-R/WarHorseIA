import React from 'react';
import './styles/App.css';
import Board from './Board';

class Game extends React.Component {
    render = () => {
        return (
            <div className="app">
                <h1 className="title">⚔️ War horses 🐎</h1>
                <Board />
            </div>
        );
    }
}

export default Game;
