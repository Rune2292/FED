import { Welcome } from "../components/ui/welcome";
import { ManagerMenu } from "../components/ui/managerMenu";



export default function Dashboard() {
    return (
        <>
            <h1>Dashboard</h1>
            <Welcome />
            <div className="mt-4"></div>
            <ManagerMenu /> 
        </>
    );
}