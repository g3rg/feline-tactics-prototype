import styles from './styles.module.css';
import {PlayerSummary} from "../PlayerSummary";
import {useState} from 'react';
import {opponentStats, playerStats} from 'shared';

export const BattleMode = () => {
    const [playerHealth, setPlayerHealth] = useState(playerStats.maxHealth)
    const [opponentHealth, setOpponentHealth] = useState(opponentStats.maxHealth)
    return (
        <div className={styles.main}>
            <div className={styles.opponent}>
                <div className={styles.summary}>
                    <PlayerSummary health={opponentHealth}
                                   maxHealth={opponentStats.maxHealth}
                                   level={opponentStats.level}
                                   name={opponentStats.name}/>
                </div>
            </div>
            <div className={styles.user}>
                <div className={styles.summary}>
                    <PlayerSummary
                        main
                        health={playerHealth}
                        maxHealth={playerStats.maxHealth}
                        level={playerStats.level}
                        name={playerStats.name}/>
                </div>
            </div>

        </div>
    );
}
