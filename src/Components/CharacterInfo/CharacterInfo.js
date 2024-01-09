export default function CharacterInfo(props) {

    function calculatePercentage(total, currentVal) {
        return (currentVal / total) * 100 + '%'
    }

    const stylesHealth = {
        width: calculatePercentage(props.character.maxHealth, props.character.currentHealth)
    }

    const stylesMana = {
        width: calculatePercentage(props.character.maxMana, props.character.currentMana)
    }

    return (
        <div className='player-info'>
            <h3>{props.character.name}</h3>
            <div className='bar-and-number'>
                <p className='health-count bar-count'>{props.character.currentHealth}</p>
                <div className='bar'>
                    <div className='player-health' style={stylesHealth}></div>
                </div>
            </div>
            <div className='bar-and-number'>
                <p className='mana-count bar-count'>{props.character.currentMana}</p>
                <div className='bar'>
                    <div className='player-mana' style={stylesMana}></div>
                </div>
            </div>
        </div>
    )

}