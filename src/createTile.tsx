import React from 'react';
import { Tile } from './App';
import join from 'ramda/es/join';

export const createTile = (width: number, height: number) => ({ className, pos }: Tile) => {
    const [x, y] = pos;
    const percentageX = 100 * x / width;
    const percentageY = 100 * y / height;
    const percentageWidth = 100 / width;
    const percentageHeight = 100 / height;

    return <div className={join(' ', [className, 'tile'])} style={{
        top: percentageY + '%',
        left: percentageX + '%',
        width: percentageWidth + '%',
        height: percentageHeight + '%'
    }}></div>;
};
