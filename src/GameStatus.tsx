import React from 'react';
import * as Snake from 'jsunconf-snake';

export const GameStatus = ({ game }) => (<div className="gameStatus">
  <span>{Snake.getStatus(game)}</span>
  <span>{Snake.getScore(game)}</span>
</div>);
