import PlayerSprite from '../../Images/mc-sprite.png';
import CharacterInfo from '../CharacterInfo/CharacterInfo';
import SpeechBubble from '../SpeechBubble/SpeechBubble';
import NumberFeedback from '../NumberFeedback/NumberFeedback';
import './PlayerSection.css';

export default function PlayerSection(props) {

    const randomNumber = Math.floor(Math.random() * 4) + 1;

    return (
        <div className='player-section'>
            <div className='player'>
                <CharacterInfo character={props.player}/>
                <div className='player-sprite'>
                    <NumberFeedback 
                        currentPointIndicator={props.currentPointIndicator} 
                        character={props.player}
                        randomNumber={randomNumber}
                        playNumberAnimation={props.playNumberAnimation}
                    />
                    <img src={PlayerSprite}></img>
                </div>
            </div>
            <SpeechBubble isPlayerSpeechBubble={true} bubbleText={props.player.speechBubble}/>
        </div>
    )

}