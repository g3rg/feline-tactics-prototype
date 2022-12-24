import styles from './styles.module.css';

export const EndGame = ({onRestart}) => {
    return (
        <div className={styles.main}>
            Game over!
            <button onClick={onRestart}>Return to Start</button>
        </div>
    );
}
