import { GameStatusEnum } from 'src/types/globalTypes';
import './gameStatus.styles.scss';

interface GameStatusProps {
  gameStatus: GameStatusEnum,
  errors: number,
  score: number;
  duration: number
}

const GameStatus = (props: GameStatusProps) => {
  const {gameStatus, errors, duration, score} = props;

  return (
    <div className="game-status-container">
      <h3>Game status</h3>
      <div className='game-results'>
        <div>Game status: <span>{gameStatus}</span></div>
        <div>Errors: <span>{errors}</span></div>
        <div>Game duration: <span>{duration}</span></div>
        <div>Your score: <span>{score}</span></div>
      </div>
    </div>
  )
}

export default GameStatus;