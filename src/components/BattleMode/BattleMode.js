import styles from './styles.module.css';
import {PlayerSummary} from "../PlayerSummary";

export const BattleMode = ({onEnd}) => {
    return (
        <div className={styles.main}>
            <PlayerSummary main={true} health={30} maxHealth={50} level={1} name={'Test'}/>
            <PlayerSummary health={25} maxHealth={50} level={1} name={'Test'}/>

            <button onClick={onEnd}>End Game</button>
        </div>
    );
}
