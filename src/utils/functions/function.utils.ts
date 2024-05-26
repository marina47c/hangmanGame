export const scoreCalculation = (quoteLength: number, uniqueLettersCount: number, errorsCount: number, solvingTime: number) => {
  const baseScore = quoteLength * 10 + uniqueLettersCount * 100;
  const errorPenalty = errorsCount * 1000;
  const timeBonus = Math.max(0, 600 - solvingTime); // Assuming a max time bonus for solving under 10 minutes
  const result = baseScore + timeBonus - errorPenalty;

  return Math.max(result, 0);
}

export const camelCaseToTitle = (camelCase: string): string => {
  // Add a space before each uppercase letter and trim the result
  const withSpaces = camelCase.replace(/([a-z])([A-Z])/g, '$1 $2').trim();

  // Capitalize the first letter and join it with the rest of the string
  const titleCase = withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);

  return titleCase;
}