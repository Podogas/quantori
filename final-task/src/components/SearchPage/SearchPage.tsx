import { getAuth } from "firebase/auth";
import { Header } from "../Header/Header";
const SearchPage = () => {
   

    const auth = getAuth();
    const user = auth.currentUser;
    console.log(user)
    return(
        <Header/>
    )
}
export {SearchPage};