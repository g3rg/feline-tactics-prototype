import styles from './styles.module.css';

export const BattleMode = ({onEnd}) => {
    return (
        <div className={styles.main}>Battle mode
            <button onClick={onEnd}>End Game</button>
        </div>
    );
}
