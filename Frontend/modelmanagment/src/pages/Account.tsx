/** @format */

import CreateAccount from "./account/CreateAccount";
import { BackToManagerDashboard } from "../components/BackToManagerDashboard";

export default function Account() {
  return (
    <div>
      <BackToManagerDashboard className="m-4" />
      <CreateAccount />
    </div>
  );
}
