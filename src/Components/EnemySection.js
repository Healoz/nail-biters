import CharacterInfo from './CharacterInfo';
import EnemySprite from '../Images/enemy-placeholder.png';
import SpeechBubble from './SpeechBubble';
import DamageFeedback from './DamageFeedback';

export default function EnemySection(props) {

    return (
        <div className='enemy-section'>
            <SpeechBubble isPlayerSpeechBubble={false} bubbleText={props.enemy.speechBubble}/>
            <div className='enemy'>
                <CharacterInfo character={props.enemy}/>
                <div className='enemy-sprite'>
                    <DamageFeedback 
                        currentDamageDealt={props.currentDamageDealt} 
                        character={props.enemy}
                        playDamageAnimation={props.playDamageAnimation}
                    />
                    <img src={EnemySprite}></img>
                </div>
            </div>
        </div>
    )
}