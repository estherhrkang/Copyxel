import { useHistory } from 'react-router-dom';
import styles from '../../css-modules/PageNotFound.module.css';

export default function PageNotFound() {
    const history = useHistory();
    
    return(
        <div className={styles.cardContainer}>
            <div className={styles.card}>
                <div className={styles.card__front}>
                    <div className={styles.canvas}>
                        <h2>404<br/><br/>Page Not Found!</h2>
                    </div>
                </div>
                <div className={styles.card__back}  onClick={() => history.push('/')}>
                    <div className={styles.canvas}>
                        <h2>Back to Home?</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};