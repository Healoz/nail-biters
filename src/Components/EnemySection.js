import CharacterInfo from './CharacterInfo';
import EnemySprite from '../Images/enemy-placeholder.png';

export default function PlayerSection(props) {

    return (
        <div className='enemy-section'>
            <div className='enemy-speech-bubble'>
                <p>Lorem ipsum dolor sit amet consectetur.</p>
            </div>
            <div className='enemy'>
                <CharacterInfo />
                <div className='enemy-sprite'>
                    <img src={EnemySprite}></img>
                </div>
            </div>
        </div>
    )
}