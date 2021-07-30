import styles from '../css-modules/Footer.module.css';
import linkedin from '../assets/linkedin.png';
import github from '../assets/github.png';

export default function Footer() {

    return(
        <div className={styles.footer}>
            <div><h4>About Esther</h4></div>
            <div>
                <img src={linkedin} alt='LinkedIn' onClick={()=> window.open("https://www.linkedin.com/in/estherhrkang/")}/>
            </div>
            <div>
                <img src={github} alt='GitHub' onClick={()=> window.open("https://github.com/estherhrkang")}/>
            </div>
        </div>
    )
}