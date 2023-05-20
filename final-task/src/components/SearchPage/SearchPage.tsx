import { getAuth } from "firebase/auth";
const SearchPage = () => {
   

    const auth = getAuth();
    const user = auth.currentUser;
    console.log(user)
    return(
        <h2>Hi! I am Search Page</h2>
    )
}
export {SearchPage};