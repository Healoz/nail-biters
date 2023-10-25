export default function FightOverMenu(props) {

    return (

        <section className='fight-over-menu'>
          <div className='screen-overlay'>
            <div className='menu'>
              <h2>{props.battleWon ? 'Battle Won' : 'Game Over'}</h2>
              <div className='menu-grid'>
                <p>XP gained: 000</p>
                <p>Best: 00</p>
                <p>Level: 0</p>
                <p>Best: 00</p>
                <p>Fights won: 1</p>
                <p>Best: 00</p>
                <p>Damage dealt: 0</p>
                <p>Best: 00</p >
              </div>
              <div className='menu-buttons'>
                <button onClick={props.nextBattle}>{props.battleWon ? 'Next Battle' : 'Play Again'}</button>
                <button>Quit</button>
              </div>
            </div>
          </div>
        </section>
    )


}