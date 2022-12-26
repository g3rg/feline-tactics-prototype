import styles from './styles.module.css';
import {useEffect, useState} from 'react';
import {useAIOpponent, useBattleSequence} from 'hooks';
import {wait} from 'shared';
import {BattleMenu, PlayerSummary, BattleAnnouncer} from 'components';

export const Battle = ({onGameEnd, player1, player2}) => {
    const [sequence, setSequence] = useState({});

    const {
        turn,
        inSequence,
        playerOneHealth,
        playerTwoHealth,
        playerOneAnimation,
        playerTwoAnimation,
        announcerMessage,
    } = useBattleSequence(sequence, player1, player2);

    const aiChoice = useAIOpponent(turn);

    useEffect(() => {
        if (aiChoice && turn === 1 && !inSequence) {
            setSequence({turn, mode: aiChoice});
        }
    }, [turn, aiChoice, inSequence]);

    useEffect(() => {
        if (playerOneHealth === 0 || playerTwoHealth === 0) {
            (async () => {
                await wait(1000);
                onGameEnd(playerOneHealth === 0 ? player2 : player1);
            })();
        }
    }, [playerOneHealth, playerTwoHealth, player1, player2, onGameEnd]);

    return (
        <>
            <div className={styles.playerTwo}>
                <div className={styles.summary}>
                    <PlayerSummary
                        main={false}
                        health={playerTwoHealth}
                        name={player2.name}
                        level={player2.level}
                        maxHealth={player2.maxHealth}
                    />
                </div>
            </div>

            <div className={styles.characters}>
                <div className={styles.gameHeader}>
                    {player1.name} vs {player2.name}
                </div>
                <div className={styles.gameImages}>
                    <div className={styles.playerOneSprite}>
                        <img
                            alt={player1.name}
                            src={player1.img}
                            className={styles[playerOneAnimation]}
                        />
                    </div>
                    <div className={styles.playerTwoSprite}>
                        <img
                            alt={player1.name}
                            src={player2.img}
                            className={styles[playerTwoAnimation]}
                        />
                    </div>
                </div>
            </div>

            <div className={styles.playerOne}>
                <div className={styles.summary}>
                    <PlayerSummary
                        main={true}
                        health={playerOneHealth}
                        name={player1.name}
                        level={player1.level}
                        maxHealth={player1.maxHealth}
                    />
                </div>

                <div className={styles.hud}>
                    <div className={styles.hudChild}>
                        <BattleAnnouncer
                            message={
                                announcerMessage || `What will ${player1.name} do?`
                            }
                        />
                    </div>
                    {!inSequence && turn === 0 && (
                        <div className={styles.hudChild}>
                            <BattleMenu
                                onHeal={() => setSequence({mode: 'heal', turn})}
                                onMagic={() => setSequence({mode: 'magic', turn})}
                                onAttack={() => setSequence({mode: 'attack', turn})}
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};
