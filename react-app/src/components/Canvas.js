import React from 'react';
import { useHistory } from 'react-router';

export default function Canvas() {
    const history = useHistory();

    return (
        <div>
            <h1>blank canvas</h1>
            <button type='button' onClick={() => history.push('/drawing/results')}>SEE RESULTS</button>
        </div>
    )
}