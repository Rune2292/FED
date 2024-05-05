import { Welcome } from "../ui/welcome";
import { ManagerMenu } from "../ui/managerMenu";



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