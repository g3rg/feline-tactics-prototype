import styles from './styles.module.css';
import {useEffect, useState} from 'react';
import {Battle, CharacterSelect, EndMenu, StartMenu} from 'components';
import {characters} from "shared";

export const App = () => {
    const [winner, setWinner] = useState();
    const [mode, setMode] = useState('start');

    useEffect(() => {
        if (mode === 'battle') {
            setWinner(undefined);
        }
    }, [mode]);

    return (
        <div className={styles.main}>
            {mode === 'start' && (
                <StartMenu onStartClick={() => setMode('characterSelect')}/>
            )}

            {mode === 'characterSelect' && (
                <CharacterSelect onClick={() => setMode('battle')}/>
            )}

            {mode === 'battle' && (
                <Battle
                    onGameEnd={winner => {
                        setWinner(winner);
                        setMode('gameOver');
                    }}
                    player1={characters.Bobinia}
                    player2={characters.Charlie}
                />
            )}

            {mode === 'gameOver' && !!winner && (
                <EndMenu winner={winner} onStartClick={() => setMode('characterSelect')}/>
            )}
        </div>
    );
};
