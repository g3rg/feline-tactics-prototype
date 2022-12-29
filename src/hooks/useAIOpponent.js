import {useEffect, useState} from 'react';

export const useAIOpponent = (turn, player2, playerTwoHealth, playerTwoPower) => {
    const [aiChoice, setAIChoice] = useState('');

    useEffect(() => {
        if (turn === 1) {
            const options = ['attack', 'defend'];

            if (playerTwoHealth < player2.maxHealth && playerTwoPower > 0) {
                options.push('heal');
            }

            if (playerTwoPower >= player2.maxPower) {
                options.push('special')
            }

            // TODO: If full power and already defending, don't defend?
            
            setAIChoice(options[Math.floor(Math.random() * options.length)]);
        }
    }, [turn, playerTwoHealth, playerTwoPower]);

    return aiChoice;
};
