import {
    wait,
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
                    turn === 0
                        ? setPlayerTwoDefenseBonus(1)
                        : setPlayerOneDefenseBonus(1);

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
                            ? setPlayerOnePower(playerOnePower + 10)
                            : setPlayerTwoPower(playerTwoPower + 10)

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
                            ? setPlayerOnePower(playerOnePower + 25)
                            : setPlayerTwoPower(playerTwoPower + 25)

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

                        const origAnimation = turn === 0 ? playerOneAnimation : playerTwoAnimation

                        turn === 0
                            ? setPlayerOneAnimation('magic')
                            : setPlayerTwoAnimation('magic');
                        await wait(1000);

                        turn === 0
                            ? setPlayerOneAnimation(origAnimation)
                            : setPlayerTwoAnimation(origAnimation);
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

                case 'special': {
                    const damage = special({attacker, receiver, receiverDefenseBonus});

                    turn === 0
                        ? setPlayerTwoDefenseBonus(1)
                        : setPlayerOneDefenseBonus(1);

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
