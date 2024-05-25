import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@radix-ui/themes";
import { getQuote } from "../../utils/axios/axios.utils";
import { getUser } from "../../utils/authentication/authentication.utils";

import { clearChosenLetters, setErrorsCount, setQuote } from "../../store/game/game.action";
import { selectQuote } from "../../store/game/game.selector";
import { GameStatus, Loading, GameBoard } from "../../components";
import { ReactComponent as HangmanImage } from '../../assets/hangman_logo.svg'
import './gameContainer.styles.scss';

const GameContainer = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const quote = useSelector(selectQuote);
    const currentUser = getUser();
    const dispatch = useDispatch();

    useEffect(() => {
        let ignore = false;

        const fetchQuote = async () => {
            if (quote) {
                return;
            }

            setLoading(true);

            try {
                const fetchedQuote = await getQuote();
                if (!ignore && fetchedQuote) {
                    dispatch(setQuote(fetchedQuote));
                }
            } catch (error) {
                console.error("Failed to fetch quote:", error);
            } finally {
                if (!ignore) {
                    setLoading(false);
                }
            }
        };

        fetchQuote();

        return () => {
            ignore = true;
        }
    }, [quote, dispatch]);

    const handleGetNewQuoteButtonClick = async () => {
        setLoading(true);

        try {
            const fetchedQuote = await getQuote();
            if (fetchedQuote) {
                dispatch(setQuote(fetchedQuote));
                // dispatch(clearChosenLetters());
                // dispatch(setErrorsCount(0));
            }
        } catch (error) {
            console.error("Failed to fetch quote:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        quote ? (
            <div className='game-container' >
                <div className='game-container-left'>
                    <div className="hello-div">
                        <div className="name-div">Hello, {currentUser || ''}</div>
                        <div>This is your quote:</div>
                    </div>
                    <GameBoard />
                    <Button
                        onClick={handleGetNewQuoteButtonClick}
                        variant='surface'
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Get New Quote"}
                    </Button>
                </div>
                <div className='game-container-right'>
                    <GameStatus />
                    <HangmanImage className='hangman-image' />
                </div>
            </div >
        ) :
            <Loading size='large' />
    )
}

export default GameContainer;