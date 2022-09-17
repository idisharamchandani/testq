export default function authHeader() {
    const user = JSON.parse(localStorage.getItem("user"));
  
    if (user && user.jwtoken) {
      // return { Authorization: 'Bearer ' + user.accessToken };
      return { "authorization": user.jwtoken };
    } else {
      return {};
    }
  }