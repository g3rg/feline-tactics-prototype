import styles from './styles.module.css';
import {useEffect, useState} from 'react';
import {Battle, CharacterSelect, EndMenu, StartMenu} from 'components';
import {characters} from "shared";
import {getRandomFromArray} from "shared";

export const App = () => {
    const [winner, setWinner] = useState();
    const [mode, setMode] = useState('start');
    const [selectedChar, setSelectedChar] = useState()
    const [aiChar, setAIChar] = useState()

    useEffect(() => {
        if (mode === 'battle') {
            setWinner(undefined);
        }
    }, [mode]);

    const startBattle = (selectedChar) => {
        setSelectedChar(selectedChar);
        setAIChar(getRandomFromArray(Object.keys(characters)))
        setMode('battle');
    }

    return (
        <div className={styles.main}>
            <div className={styles.mainBody}>
                {mode === 'start' && (
                    <StartMenu onStartClick={() => setMode('characterSelect')}/>
                )}

                {mode === 'characterSelect' && (
                    <CharacterSelect onClick={(selectedChar) => {
                        startBattle(selectedChar);
                    }}/>
                )}

                {mode === 'battle' && (
                    <Battle
                        onGameEnd={winner => {
                            setWinner(winner);
                            setMode('gameOver');
                        }}
                        player1={characters[selectedChar]}
                        player2={characters[aiChar]}
                    />
                )}

                {mode === 'gameOver' && !!winner && (
                    <EndMenu winner={winner} onStartClick={() => setMode('characterSelect')}/>
                )}
            </div>
        </div>
    );
};
