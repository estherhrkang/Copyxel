import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import styles from '../css-modules/Home.module.css';

export default function Home() {
    const history = useHistory();
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        
    }, [])

    const handlePlayBtn = (e) => {
        e.preventDefault();
        if (user) {
            history.push('/drawing')
        } else {
            history.push('/login');
        }
    };

    return (
        <div className={styles.home}>
            <h1>home: display list of drawing results by all users</h1>
            <button type='button' onClick={handlePlayBtn}>PLAY?</button>
        </div>
    );
};