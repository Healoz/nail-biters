import CharacterInfo from './CharacterInfo';
import EnemySprite from '../Images/enemy-placeholder.png';

export default function EnemySection(props) {

    return (
        <div className='enemy-section'>
            <div className='enemy-speech-bubble'>
                <p>{props.enemy.speechBubble}</p>
            </div>
            <div className='enemy'>
                <CharacterInfo character={props.enemy}/>
                <div className='enemy-sprite'>
                    <img src={EnemySprite}></img>
                </div>
            </div>
        </div>
    )
}