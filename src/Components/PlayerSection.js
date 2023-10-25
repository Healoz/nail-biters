import PlayerSprite from '../Images/player-placeholder.png';
import CharacterInfo from './CharacterInfo';
import SpeechBubble from './SpeechBubble';
import DamageFeedback from './DamageFeedback';

export default function PlayerSection(props) {

    const randomNumber = Math.floor(Math.random() * 4) + 1;

    return (
        <div className='player-section'>
            <div className='player'>
                <CharacterInfo character={props.player}/>
                <div className='player-sprite'>
                    <DamageFeedback 
                        currentDamageDealt={props.currentDamageDealt} 
                        character={props.player}
                        randomNumber={randomNumber}
                        playDamageAnimation={props.playDamageAnimation}
                    />
                    <img src={PlayerSprite}></img>
                </div>
            </div>
            <SpeechBubble isPlayerSpeechBubble={true} bubbleText={props.player.speechBubble}/>
        </div>
    )

}