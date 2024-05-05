import CreateAccount from "../components/stuff/createAccount";
import { BackToDashboard } from "../components/stuff/backToDashboard";

export default function Account() {  
    return (
        <div>
            <BackToDashboard className="fixed top-10 left-10 m-4 " />
            <CreateAccount />
        </div>
    );
}