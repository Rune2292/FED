/** @format */

import CreateAccount from "./account/createAccount";
import { BackToManagerDashboard } from "../components/BackToManagerDashboard";

export default function Account() {
  return (
    <div>
      <BackToManagerDashboard className="m-4" />
      <CreateAccount />
    </div>
  );
}
