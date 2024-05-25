
export const camelCaseToTitle = (camelCase: string): string => {
  // Add a space before each uppercase letter and trim the result
  const withSpaces = camelCase.replace(/([a-z])([A-Z])/g, '$1 $2').trim();

  // Capitalize the first letter and join it with the rest of the string
  const titleCase = withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);

  return titleCase;
}