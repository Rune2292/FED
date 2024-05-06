/** @format */

import { Welcome } from "./dashboard/welcome";
import { ManagerMenu } from "./dashboard/managerMenu";

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
