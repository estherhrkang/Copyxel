import React from 'react';
import { useHistory } from 'react-router';
import styles from '../css-modules/SampleDrawing.module.css';

export default function SampleDrawing() {
    const history = useHistory();

    return(
        <div>
            <h1>Sample Drawing</h1>
            <button type='button' onClick={() => history.push('/drawing/new')}>BEGIN DRAWING</button>
        </div>
    )
}