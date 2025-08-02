/** @format */

import React from "react";
import Content from "./Content";
import Navbar from "../Navbar/Navbar";
import MobileTransaction from "./Transaction/MobileTransaction";

export default function MobileDashboard({
  handleSeeMore,
  Programme,
  title,
  resetDashboard,
  transactionLog,
  handlechatBot,
  visitors,
  logs,
}) {
  return (
    <div>
      <Navbar resetDashboard={resetDashboard} handlechatBot={handlechatBot} />
      {transactionLog ? (
        <MobileTransaction logs={logs} />
      ) : (
        <Content
          handleSeeMore={handleSeeMore}
          Programme={Programme}
          title={title}
          visitors={visitors}
        />
      )}
    </div>
  );
}
