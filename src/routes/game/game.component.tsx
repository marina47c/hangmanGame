import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuote } from "../../utils/axios/axios.utils";
import { Button } from "@radix-ui/themes";
import { setQuote } from "../../store/game/game.action";
import { selectQuote } from "../../store/game/game.selector";
import { Loading, Quote } from "../../components";
import './game.styles.scss';

const Game = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const quote = useSelector(selectQuote);
    const dispatch = useDispatch();

    useEffect(() => {
        let ignore = false;

        const fetchQuote = async () => {
            if (quote){
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
            if (fetchedQuote){
                dispatch(setQuote(fetchedQuote));
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
                <div className='game-container__left'>
                    <Quote />
                    <Button 
                        onClick={handleGetNewQuoteButtonClick} 
                        variant='soft' 
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Get New Quote"}
                    </Button>
                </div>
                <div className='game-container__right'>place for hangman image</div>
            </div >
        ) : 
        <Loading size='large'/>    
    )
}

export default Game;