import styles from './styles.module.css';

export const EndGame = ({onRestart}) => {
    return (
        <div className={styles.main}>
            <h1>PLACEHOLDER has won!</h1>
            <button className={styles.startButton} onClick={onRestart}>
                Play Again
            </button>
        </div>
    );
}
