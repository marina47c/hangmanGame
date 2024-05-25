export const isAuthenticated = () => {
  return localStorage.getItem('hg-username') ? true : false;
};

export const getUser = () => {
  const username = localStorage.getItem('hg-username');

  if (!username){
    console.error('Username cannot be found in local storrage');
    return '';
  }
  else {
    return username;
  }
}

export const setUser = (username: string) => {
  return localStorage.setItem('hg-username', username) ;
}

export const clearUser = () => {
  localStorage.removeItem('hg-username')
}