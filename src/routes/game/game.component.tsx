import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuote } from "../../utils/axios/axios.utils";
import { Button } from "@radix-ui/themes";
import { setQuote } from "../../store/game/game.action";
import { selectQuote } from "../../store/game/game.selector";
import { Loading, Quote } from "../../components";
import './game.styles.scss';

const Game = () => {
    const quote = useSelector(selectQuote);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!quote) {
            getQuoteLocal();
        }
    }, []);

    const getQuoteLocal = async () => {
        const fetchedQuote = await getQuote();
        console.log(fetchedQuote);
        if (fetchedQuote) {
            dispatch(setQuote(fetchedQuote));
        }
    }

    const handleGetNewQuoteButtonClick = () => {
        getQuoteLocal();
    }

    return (
        quote ? (
            <div className='game-container' >
                <div className='game-left-container'>
                    <Quote />
                    <Button onClick={handleGetNewQuoteButtonClick} variant='soft'>Get New Quote</Button>
                </div>
                <div className='game-right-container'>place for hangman image</div>
            </div >
        ) : 
        <Loading size='large'/>    
    )
}

export default Game;