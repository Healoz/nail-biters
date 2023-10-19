import PlayerSprite from '../Images/player-placeholder.png';
import CharacterInfo from './CharacterInfo';
import SpeechBubble from './SpeechBubble';

export default function PlayerSection(props) {

    return (
        <div className='player-section'>
            <div className='player'>
                <CharacterInfo character={props.player}/>
                <div className='player-sprite'>
                    <img src={PlayerSprite}></img>
                </div>
            </div>
            <SpeechBubble isPlayerSpeechBubble={true} bubbleText={props.player.speechBubble}/>
        </div>
    )

}