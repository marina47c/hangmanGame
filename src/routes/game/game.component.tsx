import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@radix-ui/themes";
import { getQuote, postHighscore } from "../../utils/axios/axios.utils";
import { getUser } from "../../utils/authentication/authentication.utils";

import { clearChosenLetters, setErrorsCount, setGameStartTime, setGameStatus, setQuote } from "../../store/game/game.action";
import { selectChosenLetters, selectErrorsCount, selectGameStartTime, selectGameStatus } from "../../store/game/game.selector";
import { GameStatus, Loading, Quote as QuoteComponent, Dialog } from "../../components";
import { ReactComponent as HangmanImage } from '../../assets/hangman_logo.svg'
import { GameStatusEnum, HighscoreData, PostHighscoreData, Quote } from "../../types/globalTypes";
import { useFetchQuote } from "../../hooks/useFetchQuote";
import { errorsBrakepoint, specialCharacters } from "../../types/constants";
import { calculateGameScore } from "../../utils/functions/function.utils";
import './game.styles.scss';

const Game = () => {
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [gameDuration, setGameDuration] = useState<number>(0);
    const { loading, quote } = useFetchQuote();

    const gameStatus = useSelector(selectGameStatus);
    const errorsCount = useSelector(selectErrorsCount);
    const chosenLetters = useSelector(selectChosenLetters);
    const gameStartTime = useSelector(selectGameStartTime);
    const currentUser = getUser();
    const dispatch = useDispatch();

    const blindQuote = useMemo(() => {
        if (!quote) return;

        return quote.content.split(' ').map((word: string) => {
            return word.split('').map((mark: string) => {
                const markIsSpecialCharacter: boolean = specialCharacters.some((character: string) => character === mark);
                const markISInChosenLetters: boolean = chosenLetters.some((letter: string) => letter.toLowerCase() === mark.toLowerCase());
                return (markIsSpecialCharacter || markISInChosenLetters) ? mark : '_';
            });
        });
    }, [quote, chosenLetters]);

    const uniqueCharacters = useMemo(() => {
        if (!quote) {
            return 0;
        }

        const uniqueCharacters = new Set(quote.content);
        return uniqueCharacters.size;
    }, [quote]);

    useEffect(() => {
        if (gameStatus === GameStatusEnum.Fail || gameStatus === GameStatusEnum.Success) {
            const duration = gameStartTime ? Date.now() - gameStartTime : 0;
            setGameDuration(duration);

            console.info('call post');
            const data: PostHighscoreData = {
                quoteId: quote._id,
                length: quote.content.length,
                uniqueCharacters: uniqueCharacters,
                userName: getUser(),
                errors: errorsCount,
                duration: duration
            }

            const postResult = async (data: HighscoreData) => {
                await postHighscore(data);
            }

            postResult(data);
        }
    }, [gameStatus]);

    useEffect(() => {
        if (!blindQuote || blindQuote.length === 0) {
            return;
        }

        const isGameSuccessful = blindQuote.flat().every((char: string) => char !== '_');
        if (isGameSuccessful) {
            dispatch(setGameStatus(GameStatusEnum.Success));
            setShowDialog(true);
        }
    }, [blindQuote]);

    useEffect(() => {
        if (errorsCount > errorsBrakepoint) {
            dispatch(setGameStatus(GameStatusEnum.Fail));
            setShowDialog(true);
        }
    }, [errorsCount]);

    const resetGame = () => {
        dispatch(clearChosenLetters());
        dispatch(setErrorsCount(0));
        dispatch(setGameStatus(GameStatusEnum.Playing));
        dispatch(setGameStartTime(Date.now()))
        setGameDuration(0);
    }

    const handleGetNewQuoteButtonClick = async () => {
        try {
            const fetchedQuote = await getQuote();
            if (fetchedQuote) {
                dispatch(setQuote(fetchedQuote));
                resetGame();
            }
        } catch (error) {
            console.error("Failed to fetch quote:", error);
        }
    }

    const handleDialogButtonClick = () => {
        setShowDialog(false);
    }

    const score = () => {
        const quoteLength: number = quote.content.length;
        return calculateGameScore(quoteLength, uniqueCharacters, errorsCount, gameDuration);
    }

    if (!quote) {
        return <Loading size='large' />
    }

    return (
        <>
            <div className='game-container' >
                <div className='game-container-left'>
                    <div className="hello-div">
                        <div className="name-div">Hello, {currentUser || ''}</div>
                        <div>This is your quote:</div>
                    </div>
                    <QuoteComponent blindQuote={blindQuote} />
                    <Button
                        onClick={handleGetNewQuoteButtonClick}
                        variant='surface'
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Get New Quote"}
                    </Button>
                </div>
                <div className='game-container-right'>
                    <GameStatus
                        gameStatus={gameStatus}
                        errors={errorsCount}
                        duration={gameDuration}
                        score={score()}
                    />
                    <HangmanImage className='hangman-image' />
                </div>
            </div >

            <Dialog
                isOpen={showDialog}
                title={gameStatus === GameStatusEnum.Success ? "Game Success" : "Game Over"}
                description={gameStatus === GameStatusEnum.Success ? "You won!" : "You fail!"}
                onClick={handleDialogButtonClick}
            />
        </>
    )
}

export default Game;