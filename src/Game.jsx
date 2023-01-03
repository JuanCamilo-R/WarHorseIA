import React from 'react';
import './styles/App.css';
import './styles/game.css';
import Board from './Board';
import { useState } from 'react';

export const Game = () => {

  const showBoard = (level) => {
    setBoard(<Board level={level} />);
  };

  const ButtonSelectLevel = ({ title, icon, color, level }) => {
    return (
      <div
        className="buttonSelectLevel"
        onClick={() => { showBoard(level); }}
        style={{ background: color }}
      >
        {title}
        <div className="buttonSelectLevelIcon">{icon}</div>
      </div>
    );
  }

  const [board, setBoard] = useState(
    <>
      <br /><br />
      <div className='statusCaption'>Select a difficulty level:</div>
      <br />
      <div className='gameBody'>
        <ButtonSelectLevel title='Beginner' icon='🪅' color='#C5EAFF' level='2' />
        <ButtonSelectLevel title='Amateur' icon='🎠' color='#CBD6FF' level='4' />
        <ButtonSelectLevel title='Expert' icon='🏇' color='#FFCCE4' level='6' />
      </div>
    </>
  );

  return <>{board}</>;
};
