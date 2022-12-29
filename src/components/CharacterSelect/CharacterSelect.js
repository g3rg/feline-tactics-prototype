import {useEffect, useState} from "react";
import styles from './styles.module.css';
import {characters} from "shared";
import {CharacterSummary} from "components";

export const CharacterSelect = ({onClick}) => {
    const [selectedCharacter, setSelectedCharacter] = useState(0)
    const [selectedCharDetails, setSelectedCharDetails] = useState()

    useEffect(() => {
        setSelectedCharDetails(getCharacter(selectedCharacter))
    }, [selectedCharacter])

    const setPrevChar = () => {
        if (selectedCharacter > 0) {
            setSelectedCharacter(selectedCharacter - 1)
        } else {
            setSelectedCharacter(Object.keys(characters).length - 1)
        }
    }

    const setNextChar = () => {
        if (selectedCharacter === (Object.keys(characters).length - 1)) {
            setSelectedCharacter(0)
        } else {
            setSelectedCharacter(selectedCharacter + 1)
        }
    }

    const getCharacter = (idx) => {
        const charKey = Object.keys(characters)[idx]
        return characters[charKey]
    }

    return selectedCharDetails ? (
            <>
                <div className={styles.gameHeader}>Select Your Character!</div>
                <div className={styles.characterSelection}>
                    <CharacterSummary selectedCharDetails={selectedCharDetails}/>
                </div>
                <div className={styles.controlPanel}>
                    <button className={styles.prevCharacter} onClick={setPrevChar}>&lt;</button>
                    <button className={styles.startButton}
                            onClick={() => onClick(selectedCharDetails.name)}>Start!
                    </button>
                    <button className={styles.nextCharacter} onClick={setNextChar}>&gt;</button>
                </div>
            </>
        )
        : (<div>loading...</div>)
}