/** @format */

import React, { useContext } from "react";
import styles from "./style.module.css";
import Menu from "./Menu";
import EditProfile from "./EditProfile/EditProfile";
import { UserDataContext } from "../../../UserDataContext";

export default function MobileSettings({ menu, handleClick, setMenu, active }) {
  function SplitNameFromEmail(email) {
    const username = email.split("@")[0];

    return username;
  }
  const [seeMore, setSeeMore] = React.useState(false);
  function handleMore() {
    setSeeMore((prev) => !prev);
  }

  const roleMap = {
    superadmin: "Super Admin",
    admin: "Admin",
    user: "User",
    liveagent: "Live Agent",
  };

  const { liveAgents, SetLiveAgents } = useContext(UserDataContext);

  return (
    <>
      {active === "users" && (
        <div className={styles.mobileSettings}>
          {liveAgents?.agents?.length === 0 ? (
            <span style={{ fontFamily: "Inter", fontSize: "12px" }}>
              No agent added yet
            </span>
          ) : (
            liveAgents?.agents?.map((agent) => (
              <div className={styles.header}>
                <div className={styles.user}>
                  <span>{SplitNameFromEmail(agent.email)}</span>
                  <Menu
                    menu={menu}
                    handleClick={handleClick}
                    setMenu={setMenu}
                    active={active}
                  />
                </div>
                {seeMore && (
                  <div className={styles.userDetails}>
                    <div className={styles.detail}>
                      <p>Username:</p>
                      <span>{agent.username}</span>
                    </div>
                    <div className={styles.detail}>
                      <p>Email:</p>
                      <span>{agent.email}</span>
                    </div>
                    <div className={styles.detail}>
                      <p>Role:</p>
                      <span> {roleMap[agent.role] || agent.role}</span>
                    </div>
                    <div className={styles.detail}></div>
                  </div>
                )}
                <button type='button' onClick={handleMore}>
                  See {seeMore ? " Less" : " More"}
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {active === "profile" && <EditProfile />}
    </>
  );
}
