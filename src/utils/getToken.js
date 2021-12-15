const getToken = () => {
    const token = localStorage.getItem('token');
    if (!token) return { token: null };
    return token;
  };
  
  export default getToken;
  