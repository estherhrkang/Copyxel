import React from 'react';
import { useHistory } from 'react-router';

export default function Results() {
    const history = useHistory();

    return (
        <div>
            <h1>Show sample drawing and user's drawing</h1>
            <button type='button' onClick={() => history.push('/')}>SEE FRIENDS' DRAWINGS</button>
            <button type='button' onClick={() => history.push('/drawing')}>DRAW AGAIN?</button>
        </div>
    )
}