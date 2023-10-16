export default function CharacterInfo(props) {

    return (
        <div className='player-info'>
            <h3>Player name</h3>
            <div className='bar-and-number'>
                <p className='health-count'>24</p>
                <div className='bar'>
                    <div className='player-health'></div>
                </div>
            </div>
            <div className='bar-and-number'>
                <p className='mana-count'>30</p>
                <div className='bar'>
                    <div className='player-mana'></div>
                </div>
            </div>
        </div>
    )

}