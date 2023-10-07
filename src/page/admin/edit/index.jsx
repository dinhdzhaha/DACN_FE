import React from "react";
import { Link } from "react-router-dom";

import timedot from "../../../assets/icon/TimelineDot.svg";
import "../../../assets/style/admin/accounts/accounts.scss";
import EnhancedTable from "../../../components/table";
function UpdateAccount() {
  return (
    <div className="css-table">
      <EnhancedTable></EnhancedTable>
    </div>
  );
}

export default UpdateAccount;
