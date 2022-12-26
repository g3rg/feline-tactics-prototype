import {
    wait,
    magic,
    heal,
    attack,
} from 'shared';
import {useEffect, useState} from 'react';

export const useBattleSequence = (sequence, player1, player2) => {
    const [turn, setTurn] = useState(0);
    const [inSequence, setInSequence] = useState(false);

    const [playerOneHealth, setPlayerOneHealth] = useState(player1.maxHealth);
    const [playerTwoHealth, setPlayerTwoHealth] = useState(player2.maxHealth);

    const [announcerMessage, setAnnouncerMessage] = useState('');

    const [playerOneAnimation, setPlayerOneAnimation] = useState('static');
    const [playerTwoAnimation, setPlayerTwoAnimation] = useState('static');

    useEffect(() => {
        const {mode, turn} = sequence;

        if (mode) {
            const attacker = turn === 0 ? player1 : player2;
            const receiver = turn === 0 ? player2 : player1;

            switch (mode) {
                case 'attack': {
                    const damage = attack({attacker, receiver});

                    (async () => {
                        setInSequence(true);
                        setAnnouncerMessage(`${attacker.name} has chosen to attack!`);
                        await wait(1000);

                        turn === 0
                            ? setPlayerOneAnimation('attack')
                            : setPlayerTwoAnimation('attack');
                        await wait(100);

                        turn === 0
                            ? setPlayerOneAnimation('static')
                            : setPlayerTwoAnimation('static');
                        await wait(500);

                        turn === 0
                            ? setPlayerTwoAnimation('damage')
                            : setPlayerOneAnimation('damage');
                        await wait(750);

                        turn === 0
                            ? setPlayerTwoAnimation('static')
                            : setPlayerOneAnimation('static');
                        setAnnouncerMessage(`${receiver.name} felt that!`);
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

                case 'magic': {
                    const damage = magic({attacker, receiver});

                    (async () => {
                        setInSequence(true);
                        setAnnouncerMessage(`${attacker.name} has cast a spell!`);
                        await wait(1000);

                        turn === 0
                            ? setPlayerOneAnimation('magic')
                            : setPlayerTwoAnimation('magic');
                        await wait(1000);

                        turn === 0
                            ? setPlayerOneAnimation('static')
                            : setPlayerTwoAnimation('static');
                        await wait(500);

                        turn === 0
                            ? setPlayerTwoAnimation('damage')
                            : setPlayerOneAnimation('damage');
                        await wait(750);

                        turn === 0
                            ? setPlayerTwoAnimation('static')
                            : setPlayerOneAnimation('static');
                        setAnnouncerMessage(
                            `${receiver.name} doesn't know what hit them!`,
                        );
                        turn === 0
                            ? setPlayerTwoHealth(h => (h - damage > 0 ? h - damage : 0))
                            : setPlayerOneHealth(h => (h - damage > 0 ? h - damage : 0)); // We don't want a negative HP.
                        await wait(2500);

                        setAnnouncerMessage(`Now it's ${receiver.name}'s turn!`);
                        await wait(1500);

                        setTurn(turn === 0 ? 1 : 0);
                        setInSequence(false);
                    })();

                    break;
                }

                case 'heal': {
                    const recovered = heal({receiver: attacker});

                    (async () => {
                        setInSequence(true);
                        setAnnouncerMessage(`${attacker.name} has chosen to heal!`);
                        await wait(1000);

                        turn === 0
                            ? setPlayerOneAnimation('magic')
                            : setPlayerTwoAnimation('magic');
                        await wait(1000);

                        turn === 0
                            ? setPlayerOneAnimation('static')
                            : setPlayerTwoAnimation('static');
                        await wait(500);

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
        playerTwoHealth,
        playerOneAnimation,
        playerTwoAnimation,
        announcerMessage,
    };
};
