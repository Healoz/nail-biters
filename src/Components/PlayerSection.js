import PlayerSprite from '../Images/player-placeholder.png';
import CharacterInfo from './CharacterInfo';

export default function PlayerSection(props) {

    return (
        <div className='player-section'>
            <div className='player'>
                <CharacterInfo />
                <div className='player-sprite'>
                    <img src={PlayerSprite}></img>
                </div>
            </div>
            <div className='player-speech-bubble'>
                <div className='speech-bubble-container'>
                    <div className='speech-bubble'>
                        <p>Lorem ipsum dolor sit amet consectetur.</p>
                    </div>
                </div>
            </div>
        </div>
    )

}