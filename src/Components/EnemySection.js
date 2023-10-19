import CharacterInfo from './CharacterInfo';
import EnemySprite from '../Images/enemy-placeholder.png';
import SpeechBubble from './SpeechBubble';

export default function EnemySection(props) {

    return (
        <div className='enemy-section'>
            <SpeechBubble isPlayerSpeechBubble={false} bubbleText={props.enemy.speechBubble}/>
            <div className='enemy'>
                <CharacterInfo character={props.enemy}/>
                <div className='enemy-sprite'>
                    <img src={EnemySprite}></img>
                </div>
            </div>
        </div>
    )
}