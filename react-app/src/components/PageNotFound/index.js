import { useHistory } from 'react-router-dom';
import styles from '../../css-modules/PageNotFound.module.css';

export default function PageNotFound() {
    const history = useHistory();
    
    return(
        <div className={styles.cardContainer}>
            <div className={styles.card}>
                <div className={styles.card__front}>
                    404
                    <div className={styles.canvas}>
                        Page Not Found!
                    </div>
                </div>
                <div className={styles.card__back}  onClick={() => history.push('/')}>
                    <div className={styles.canvas}>
                        Back to Home?
                    </div>
                </div>
            </div>
        </div>
    );
};