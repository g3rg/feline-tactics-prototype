import styles from './styles.module.css';

export const CharacterSelect = ({onClick}) => {
    return (
        <div className={styles.main}>
            <div>Select Your Character!</div>
            <div>
                <button className={styles.startButton} onClick={onClick}>Start!</button>
            </div>
        </div>
    )
}