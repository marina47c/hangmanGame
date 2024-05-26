import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGameStartTime, setQuote } from "../store/game/game.action";
import { selectQuote } from "../store/game/game.selector";
import { getQuote } from "../utils/axios/axios.utils";

export const useFetchQuote = () => {
  const dispatch = useDispatch();
  const quote = useSelector(selectQuote);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      if (quote) return;

      let ignore = false;
      setLoading(true);

      const fetchQuote = async () => {
          try {
              const fetchedQuote = await getQuote();
              if (!ignore && fetchedQuote) {
                dispatch(setQuote(fetchedQuote));
                dispatch(setGameStartTime(Date.now()));
              }
          } catch (error) {
              console.error("Failed to fetch quote:", error);
          } finally {
              if (!ignore) setLoading(false);
          }
      };

      fetchQuote();

      return () => {
          ignore = true;
      };
  }, [quote, dispatch]);

  return { loading, quote };
};
