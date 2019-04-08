import React, { useState, useEffect } from 'react';
import './App.css';
import * as Snake from 'jsunconf-snake';
import * as R from 'ramda';
import { createTile } from './createTile';
import { GameStatus } from './GameStatus';
import { useInterval } from './useInterval';
import { id, withIndex, getSeed } from './utils';

export interface Tile {
  pos: [number, number],
  className: string
}

const App = () => {
  // == Init
  const [game, setGame] = useState(Snake.newGame({
    seed: getSeed(), 
    width: 20, 
    height: 20
  }));
  const [action, setAction] = useState({ fn: id });

  // == Controller (handle key press)
  const keyPressHandler = R.compose(R.cond([
    [R.equals('ArrowUp'), () => setAction({ fn: Snake.moveUp })],
    [R.equals('ArrowDown'), () => setAction({ fn: Snake.moveDown })],
    [R.equals('ArrowLeft'), () => setAction({ fn: Snake.moveLeft })],
    [R.equals('ArrowRight'), () => setAction({ fn: Snake.moveRight })]
  ]), R.prop('key'));

  useEffect(() => {
    document.addEventListener('keydown', keyPressHandler);
    return () => {
      document.removeEventListener('keydown', keyPressHandler)
    };
  }, []);

  // Start game loop
  useInterval(() => {
    setGame(Snake.tick(action.fn(game)));
  }, 50);

  // == View
  const width = Snake.getWidth(game);
  const height = Snake.getHeight(game);
  const ratio = height / width;
  const ratioHeight = 500;
  const ratioWidth = ratioHeight / ratio;

  const Tile = createTile(width, height);

  return (
    <>
    <GameStatus game={game} />

    <div className="container" style={{height: ratioHeight, width: ratioWidth}}>

      {R.map(([index, vector]) =>
        <Tile key={index} className='wallTile' pos={vector} />,
        withIndex(Snake.getWalls(game)))}

      {R.map(([index, vector]) =>
        <Tile key={index} className='snakeTile' pos={vector} />,
        withIndex(Snake.getSnake(game)))}

      {R.map((vector) =>
        <Tile key={R.toString(vector)} className='appleTile' pos={vector} />,
        Snake.getApples(game))}

    </div>
    </>
  );
};

export default App;