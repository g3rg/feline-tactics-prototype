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
                    <div className={styles.prevCharacter}>
                        <button className={styles.startButton} onClick={setPrevChar}>&lt;</button>
                    </div>
                    <CharacterSummary selectedCharDetails={selectedCharDetails}/>
                    <div className={styles.nextCharacter}>
                        <button className={styles.startButton} onClick={setNextChar}>&gt;</button>
                    </div>
                </div>
                <div>
                    <button className={styles.startButton}
                            onClick={() => onClick(selectedCharDetails.name)}>Start!
                    </button>
                </div>
            </>
        )
        : (<div>loading...</div>)
}