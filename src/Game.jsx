import React from 'react';
import './styles/App.css';
import './styles/game.css';
import Board from './Board';
import { useState } from 'react';
import beginnerIcon from './assets/beginner.svg';
import amateurIcon from './assets/amateur.svg';
import expertIcon from './assets/expert.svg';
import swordsIcon from './assets/swords.svg';
import horseIcon from './assets/horse.svg';

export const Game = () => {

  const showBoard = (level, icon) => {
    setIcon(icon);
    setBoard(<Board level={level} />);
  };

  const [icon, setIcon] = useState(horseIcon);

  const ButtonSelectLevel = ({ title, icon, color, level }) => {
    return (
      <div
        className="buttonSelectLevel"
        onClick={() => { showBoard(level, icon); }}
        style={{ background: color }}
      >
        {title}
        <img className="buttonSelectLevelIcon" alt={title} src={icon} /></div>

    );
  }

  const [board, setBoard] = useState(
    <>
      <br /><br />
      <div className='selectDifficultyCaption'>Select a difficulty level:</div>
      <br />
      <div className='gameBody'>
        <ButtonSelectLevel title='Beginner' icon={beginnerIcon} color='#C5EAFF' level='2' />
        <ButtonSelectLevel title='Amateur' icon={amateurIcon} color='#CBD6FF' level='4' />
        <ButtonSelectLevel title='Expert' icon={expertIcon} color='#FFCCE4' level='6' />
      </div>
    </>
  );

  return (
    <>
      <div className='titleContainer'>
        <img className="tittleIcon" alt="Hourse" src={swordsIcon} />
        <h1 className="title"> War horses </h1>
        <img className="tittleIcon" alt="Hourse" src={icon} />
      </div>
      {board}
    </>
  );
};
