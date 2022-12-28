import {
    wait,
    limitToMax,
    special,
    heal,
    attack,
    defend
} from 'shared';
import {useEffect, useState} from 'react';

export const useBattleSequence = (sequence, player1, player2) => {
    const [turn, setTurn] = useState(0);
    const [inSequence, setInSequence] = useState(false);

    const [playerOneHealth, setPlayerOneHealth] = useState(player1.maxHealth);
    const [playerOnePower, setPlayerOnePower] = useState(0)
    const [playerTwoHealth, setPlayerTwoHealth] = useState(player2.maxHealth);
    const [playerTwoPower, setPlayerTwoPower] = useState(0);
    const [playerOneDefenseBonus, setPlayerOneDefenseBonus] = useState(1);
    const [playerTwoDefenseBonus, setPlayerTwoDefenseBonus] = useState(1);
    const [announcerMessage, setAnnouncerMessage] = useState('');

    const [playerOneAnimation, setPlayerOneAnimation] = useState('static');
    const [playerTwoAnimation, setPlayerTwoAnimation] = useState('static');

    useEffect(() => {
        const {mode, turn} = sequence;

        if (mode) {
            const attacker = turn === 0 ? player1 : player2;
            const receiver = turn === 0 ? player2 : player1;
            const receiverDefenseBonus = turn === 0 ? playerTwoDefenseBonus : playerOneDefenseBonus

            switch (mode) {
                case 'attack': {
                    const damage = attack({attacker, receiver, receiverDefenseBonus});

                    (async () => {
                        setInSequence(true);
                        setAnnouncerMessage(`${attacker.name} has chosen to attack!`);
                        await wait(1000);

                        const origAnimation = turn === 0 ? playerOneAnimation : playerTwoAnimation

                        turn === 0
                            ? setPlayerOneAnimation('attack')
                            : setPlayerTwoAnimation('attack');
                        await wait(100);

                        turn === 0
                            ? setPlayerOneAnimation(origAnimation)
                            : setPlayerTwoAnimation(origAnimation);
                        await wait(500);

                        turn === 0
                            ? setPlayerTwoAnimation('damage')
                            : setPlayerOneAnimation('damage');
                        await wait(750);

                        turn === 0
                            ? setPlayerOnePower(limitToMax(playerOnePower + 10, player1.maxPower))
                            : setPlayerTwoPower(limitToMax(playerTwoPower + 10, player2.maxPower));

                        turn === 0
                            ? setPlayerTwoDefenseBonus(1)
                            : setPlayerOneDefenseBonus(1);

                        turn === 0
                            ? setPlayerTwoAnimation('static')
                            : setPlayerOneAnimation('static');

                        const msg = turn === 0
                            ? (playerTwoDefenseBonus > 1 ? ' defended well!' : "felt that!")
                            : (playerOneDefenseBonus > 1 ? ' defended well!' : "felt that!")

                        setAnnouncerMessage(
                            `${receiver.name} ${msg}`,
                        );

                        turn === 0
                            ? setPlayerTwoHealth(h => (h - damage > 0 ? h - damage : 0))
                            : setPlayerOneHealth(h => (h - damage > 0 ? h - damage : 0)); // We don't want a negative HP.
                        await wait(2000);


                        setAnnouncerMessage(`Now it's ${receiver.name} turn!`);
                        await wait(1500);

                        setTurn(turn === 0 ? 1 : 0);
                        setInSequence(false);
                    })();

                    break;
                }


                case 'defend': {
                    const recovered = defend({attacker});

                    (async () => {
                        setInSequence(true);
                        setAnnouncerMessage(`${attacker.name} has chosen to defend!`);
                        await wait(1000);

                        turn === 0
                            ? setPlayerOneAnimation('defend')
                            : setPlayerTwoAnimation('defend');
                        // await wait(1000);

                        /*
                        turn === 0
                            ? setPlayerOneAnimation('static')
                            : setPlayerTwoAnimation('static');
                        await wait(500);
                        */
                        setAnnouncerMessage(`${attacker.name} is ready!`);
                        turn === 0
                            ? setPlayerOneDefenseBonus(2)
                            : setPlayerTwoDefenseBonus(2)

                        turn === 0
                            ? setPlayerOnePower(limitToMax(playerOnePower + 25, player1.maxPower))
                            : setPlayerTwoPower(limitToMax(playerTwoPower + 25, player2.maxPower))

                        await wait(2500);

                        setAnnouncerMessage(`Now it's ${receiver.name}'s turn!`);
                        await wait(1500);

                        setTurn(turn === 0 ? 1 : 0);
                        setInSequence(false);
                    })();

                    break;
                }


                case 'heal': {
                    const receiverPower = turn === 0 ? playerOnePower : playerTwoPower;
                    const [recovered, powerUsed] = heal({receiver: attacker, receiverPower});

                    if (recovered > 0) {
                        (async () => {
                            setInSequence(true);
                            setAnnouncerMessage(`${attacker.name} has chosen to heal!`);
                            await wait(1000);

                            const origAnimation = turn === 0 ? playerOneAnimation : playerTwoAnimation

                            turn === 0
                                ? setPlayerOneAnimation('magic')
                                : setPlayerTwoAnimation('magic');
                            await wait(1000);

                            turn === 0
                                ? setPlayerOneAnimation(origAnimation)
                                : setPlayerTwoAnimation(origAnimation);
                            await wait(500);

                            turn === 0
                                ? setPlayerOnePower(playerOnePower - powerUsed)
                                : setPlayerTwoPower(playerTwoPower - powerUsed)

                            setAnnouncerMessage(`${attacker.name} has recovered health.`);
                            turn === 0
                                ? setPlayerOneHealth(h =>
                                    h + recovered <= attacker.maxHealth
                                        ? h + recovered
                                        : attacker.maxHealth,
                                )
                                : setPlayerTwoHealth(h =>
                                    h + recovered <= attacker.maxHealth
                                        ? h + recovered
                                        : attacker.maxHealth,
                                ); // We don't want to set HP more than the max
                            await wait(2500);

                            setAnnouncerMessage(`Now it's ${receiver.name}'s turn!`);
                            await wait(1500);

                            setTurn(turn === 0 ? 1 : 0);
                            setInSequence(false);
                        })();
                    } else {
                        (async () => {
                            setInSequence(true);
                            setAnnouncerMessage(`${attacker.name} couldn't heal!`);
                            await wait(1000);
                            setTurn(turn === 0 ? 1 : 0)
                            setInSequence(false)
                        })();
                    }

                    break;
                }

                case 'special': {
                    const attackerPower = turn === 0 ? playerOnePower : playerTwoPower
                    const damage = special({attacker, receiver, receiverDefenseBonus, attackerPower});

                    if (damage > 0) {


                        (async () => {
                            setInSequence(true);
                            setAnnouncerMessage(`${attacker.name} has used their special attack!`);
                            await wait(1000);

                            const origAnimation = turn === 0 ? playerOneAnimation : playerTwoAnimation

                            turn === 0
                                ? setPlayerOneAnimation('special')
                                : setPlayerTwoAnimation('special');
                            await wait(1000);

                            turn === 0
                                ? setPlayerOneAnimation(origAnimation)
                                : setPlayerTwoAnimation(origAnimation);
                            await wait(500);

                            turn === 0
                                ? setPlayerTwoAnimation('damage')
                                : setPlayerOneAnimation('damage');
                            await wait(750);

                            turn === 0
                                ? setPlayerTwoAnimation('static')
                                : setPlayerOneAnimation('static');

                            const msg = turn === 0
                                ? (playerTwoDefenseBonus > 1 ? ' defended well!' : "doesn't know what hit them!")
                                : (playerOneDefenseBonus > 1 ? ' defended well!' : "doesn't know what hit them!")

                            setAnnouncerMessage(
                                `${receiver.name} ${msg}`,
                            );

                            turn === 0
                                ? setPlayerTwoDefenseBonus(1)
                                : setPlayerOneDefenseBonus(1);

                            turn === 0
                                ? setPlayerTwoHealth(h => (h - damage > 0 ? h - damage : 0))
                                : setPlayerOneHealth(h => (h - damage > 0 ? h - damage : 0)); // We don't want a negative HP.

                            turn === 0
                                ? setPlayerOnePower(0)
                                : setPlayerTwoPower(0)

                            await wait(2500);

                            setAnnouncerMessage(`Now it's ${receiver.name}'s turn!`);
                            await wait(1500);

                            setTurn(turn === 0 ? 1 : 0);
                            setInSequence(false);
                        })();
                    } else {
                        (async () => {
                            setInSequence(true);
                            setAnnouncerMessage(`${attacker.name} couldn't use their Special Power!`);
                            await wait(1000);
                            setTurn(turn === 0 ? 1 : 0)
                            setInSequence(false)
                        })();
                    }

                    break;
                }

                default:
                    break;
            }
        }
    }, [sequence, player1, player2]);

    return {
        turn,
        inSequence,
        playerOneHealth,
        playerOnePower,
        playerTwoHealth,
        playerOneAnimation,
        playerTwoPower,
        playerTwoAnimation,
        announcerMessage,
    };
};
