
import { useSelector } from 'react-redux';

import { selectErrorsCount } from '../../store/game/game.selector';
import './gameStatus.styles.scss';

const GameStatus = () => {
  const errorsCount = useSelector(selectErrorsCount);

  return (
    <div className="game-status-container">
      <h3>Game status</h3>
      <div className='game-results'>
        <div className='game-errors'>Errors: <span>{errorsCount}</span></div>
        <div className='game-score'>Your score: <span></span></div>
      </div>
    </div>
  )
}

export default GameStatus;