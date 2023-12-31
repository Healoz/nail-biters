import CharacterInfo from './CharacterInfo';
import EnemySprite from '../Images/enemy-placeholder.png';
import SpeechBubble from './SpeechBubble';
import NumberFeedback from './NumberFeedback';

export default function EnemySection(props) {

    return (
        <div className='enemy-section'>
            <SpeechBubble isPlayerSpeechBubble={false} bubbleText={props.enemy.speechBubble}/>
            <div className='enemy'>
                <CharacterInfo character={props.enemy}/>
                <div className='enemy-sprite'>
                    <NumberFeedback 
                        currentPointIndicator={props.currentPointIndicator} 
                        character={props.enemy}
                        playNumberAnimation={props.playNumberAnimation}
                    />
                    <img src={EnemySprite}></img>
                </div>
            </div>
        </div>
    )
}