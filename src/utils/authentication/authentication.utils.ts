export const isAuthenticated = () => {
  return localStorage.getItem('authenticated') === 'true';
};