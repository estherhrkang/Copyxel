import React from 'react';
import { useHistory } from 'react-router';
import styles from '../css-modules/Results.module.css';

export default function Results() {
    const history = useHistory();

    return (
        <div className={styles.resultsContainer}>
            <h1>Show sample drawing and user's drawing</h1>
            <div className={styles.results}>two drawings</div>
            <button type='button' onClick={() => history.push('/')}>See friends' drawings</button>
            <button type='button' onClick={() => history.push('/drawing')}>Draw again?</button>
        </div>
    )
}