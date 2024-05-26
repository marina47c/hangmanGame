import { calculateGameScore } from "../function.utils";

describe('scoreCalculation specific rules', () => {

  it('should score higher for fewer errors', () => {
    const scoreWithFewerErrors = calculateGameScore(20, 5, 1, 300);
    const scoreWithMoreErrors = calculateGameScore(20, 5, 2, 300);
    expect(scoreWithFewerErrors).toBeGreaterThan(scoreWithMoreErrors);
  });

  it('should score higher for larger numbers of unique letters given the same number of errors', () => {
    const scoreWithMoreUniqueLetters = calculateGameScore(20, 6, 2, 300);
    const scoreWithFewerUniqueLetters = calculateGameScore(20, 4, 2, 300);
    expect(scoreWithMoreUniqueLetters).toBeGreaterThan(scoreWithFewerUniqueLetters);
  });

  it('should score higher for longer solutions given the same number of errors and unique letters', () => {
    const longerSolutionScore = calculateGameScore(25, 5, 2, 300);
    const shorterSolutionScore = calculateGameScore(20, 5, 2, 300);
    expect(longerSolutionScore).toBeGreaterThan(shorterSolutionScore);
  });

  it('should score higher for faster solutions given the same number of errors, unique letters, and quote length', () => {
    const fasterSolutionScore = calculateGameScore(20, 5, 2, 2000);
    const slowerSolutionScore = calculateGameScore(20, 5, 2, 4000);
    expect(fasterSolutionScore).toBeGreaterThan(slowerSolutionScore);
  });
});