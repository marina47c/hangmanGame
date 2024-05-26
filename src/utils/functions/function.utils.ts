export const calculateGameScore = (quoteLength: number, uniqueLettersCount: number, errorsCount: number, solvingTime: number) => {
  const INITIAL_SCORE = 10000;
  const ERROR_PENALTY_UNIT = 200;
  const MAX_BONUS = ERROR_PENALTY_UNIT / 3;
  const MAX_TIME = 300; // 300 s = 5 min 

  // Validate input parameters
  if (quoteLength < 0 || uniqueLettersCount < 0 || errorsCount < 0 || solvingTime < 0) {
    console.error("Invalid input values");
    return 0;
  }

  // Calculate error penalty
  const errorPenalty = errorsCount * ERROR_PENALTY_UNIT;
  let score = INITIAL_SCORE - errorPenalty;

  // Calculate bonuses
  const uniqueLettersBonus = (uniqueLettersCount / 100) * MAX_BONUS;
  const quoteLengthBonus = (quoteLength / 100) * MAX_BONUS;

  const timeInSeconds = solvingTime / 1000; // convert to seconds
  const timeDifference = MAX_TIME - timeInSeconds;
  const adjustedTimeDifference = Math.max(0, timeDifference)
  const timeBonus = (adjustedTimeDifference / 100) * MAX_BONUS;

  // Add bonuses to the score
  score += uniqueLettersBonus + quoteLengthBonus + timeBonus;

  return Math.round(score)
}

export const camelCaseToTitle = (camelCase: string): string => {
  // Add a space before each uppercase letter and trim the result
  const withSpaces = camelCase.replace(/([a-z])([A-Z])/g, '$1 $2').trim();

  // Capitalize the first letter and join it with the rest of the string
  const titleCase = withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);

  return titleCase;
}