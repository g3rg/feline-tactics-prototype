import styles from './styles.module.css';

import {useState} from 'react';

import {StartMenu, BattleMode} from 'components';

export const App = () => {
    const [mode, setMode] = useState('start');

    return (
        <div className={styles.main}>
            {mode === 'start' && (
                <StartMenu onStartClick={() => setMode('battle')}/>
            )}

            {mode === 'battle' && (
                <BattleMode onEnd={() => setMode('endgame')}/>
            )}

            {mode === 'endgame' && (
                <>Game Over!</>
            )}

        </div>
    );
}
