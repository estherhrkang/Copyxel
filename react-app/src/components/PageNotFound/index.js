import styles from '../../css-modules/PageNotFound.module.css';

export default function PageNotFound() {
    <h1>404! Page does not exist</h1>

    return(
        <div className={styles.cardContainer}>
            <div className={styles.card}>
                <div className={styles.card__front}>
                    <div className={styles.canvas}>
                        <div className={styles.pixels}>
                            ?
                        </div>
                    </div>
                </div>
                <div className={styles.card__back}>
                    <div className={styles.canvas}>
                        <div className={styles.pixels}>
                            !
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};