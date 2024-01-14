import './SpeechBubble.css';

export default function SpeechBubble(props) {

    return (
        props.isPlayerSpeechBubble ? (
          <div className={`player-speech-bubble bubble ${props.bubbleText.length === 0 ? 'bubble-hidden' : ''}`}>
            <div className='speech-bubble-container'>
              <div className='speech-bubble'>
                <p>{props.bubbleText}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className={`enemy-speech-bubble bubble ${props.bubbleText.length === 0 ? 'bubble-hidden' : ''}`}>
            <p>{props.bubbleText}</p>
          </div>
        )
      )
      

}