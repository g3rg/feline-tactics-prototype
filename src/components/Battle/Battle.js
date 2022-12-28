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
        playerOnePower,
        playerTwoHealth,
        playerTwoPower,
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
                        maxHealth={player2.maxHealth}
                        power={playerTwoPower}
                        maxPower={player2.maxPower}
                        name={player2.name}
                        level={player2.level}
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
                        maxHealth={player1.maxHealth}
                        power={playerOnePower}
                        maxPower={player1.maxPower}
                        name={player1.name}
                        level={player1.level}

                    />
                </div>

                <div className={styles.hud}>
                    {inSequence && (
                        <div className={styles.hudChild}>
                            <BattleAnnouncer
                                message={
                                    announcerMessage || `What will ${player1.name} do?`
                                }
                            />
                        </div>
                    )}
                    {!inSequence && turn === 0 && (
                        <div className={styles.hudChild}>
                            <BattleMenu
                                onHeal={() => setSequence({mode: 'heal', turn})}
                                onDefend={() => setSequence({mode: 'defend', turn})}
                                onAttack={() => setSequence({mode: 'attack', turn})}
                                onSpecial={() => setSequence({mode: 'special', turn})}
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};
