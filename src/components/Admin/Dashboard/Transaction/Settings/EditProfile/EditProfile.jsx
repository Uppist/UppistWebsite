/** @format */

import React, { useContext, useState } from "react";
import editimg from "../../../../../../assets/Dashboard/Edit.svg";
import dom from "../../../../../../assets/Dashboard/dom.svg";
import styles from "./styles.module.css";
import Edit from "./Edit";
import ChangePassword from "./ChangePassword";
import { toast, ToastContainer } from "react-toastify";
import { UserDataContext } from "../../../../UserDataContext";
import green from "../../../../../../assets/circle.svg";
import red from "../../../../../../assets/offline.svg";
import offline from "../../../../../../assets/busy.svg";
import axios from "axios";

export default function EditProfile() {
  const { userData } = useContext(UserDataContext);

  const [edit, setEdit] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const [selectDropdown, setSelectDropdown] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("Offline");

  function handleImage(e) {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setImage(selectedFile);
      console.log("Selected file:", selectedFile);
      toast.success("Image uploaded successfully!");
    }
  }

  function handleEdit() {
    setEdit(true);
    // setActive("edit");
  }

  const [password, setPassword] = React.useState(false);

  function handlePassword() {
    setPassword(true);
  }

  console.log(userData);

  const roleMap = {
    superadmin: "Super Admin",
    admin: "Admin",
    user: "User",
    liveagent: "Live Agent",
  };

  function SplitNameFromEmail(email) {
    const username = email?.split("@")[0];

    return username;
  }

  const status = [
    { label: "Online", value: "online", img: green },
    { label: "Busy", value: "busy", img: offline },
    { label: "Offline", value: "offline", img: red },
  ];

  function handleStatusChange(label) {
    setSelectedLabel(label);
    setSelectDropdown(false);
    console.log("Selected status:", label);

    const data = {
      is_online: label === "Online",
      is_busy: label === "Busy",
      is_offline: label === "Offline",
    };

    axios
      .put("http://139.162.173.87:2005/api/agent/status", data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("Token")}` },
      })
      .then((res) => {
        console.log("Status updated successfully:", res.data);
      });
  }
  return (
    <>
      {edit ? (
        <Edit onClose={() => setEdit(false)} />
      ) : (
        <div className={styles.edit}>
          <div className={styles.profile}>
            <div className={styles.image}>
              {image ? (
                <img src={URL.createObjectURL(image)} alt='' />
              ) : (
                <>
                  {" "}
                  <img src={dom} alt='' />
                </>
              )}

              <label htmlFor='img_upload'>
                <svg
                  width='12'
                  height='12'
                  viewBox='0 0 12 12'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M1.33333 10.6667H2.28333L8.8 4.15L7.85 3.2L1.33333 9.71667V10.6667ZM0 12V9.16667L8.8 0.383333C8.93333 0.261111 9.08067 0.166667 9.242 0.1C9.40333 0.0333334 9.57267 0 9.75 0C9.92778 0 10.1 0.0333334 10.2667 0.1C10.4333 0.166667 10.5778 0.266667 10.7 0.4L11.6167 1.33333C11.75 1.45556 11.8473 1.6 11.9087 1.76667C11.97 1.93333 12.0004 2.1 12 2.26667C12 2.44444 11.9693 2.614 11.908 2.77533C11.8467 2.93667 11.7496 3.08378 11.6167 3.21667L2.83333 12H0ZM8.31667 3.68333L7.85 3.2L8.8 4.15L8.31667 3.68333Z'
                    fill='white'
                  />
                </svg>
                <input
                  type='file'
                  name=''
                  onChange={handleImage}
                  id='img_upload'
                  accept='image/png, image/jpeg, image/img'
                />
              </label>
            </div>

            <p>Accepted file types: img, png, jpeg. Max size: 5mb</p>

            <button onClick={handleEdit}>
              {" "}
              <img src={editimg} alt='' />
              Edit Profile
            </button>
          </div>

          <div className={styles.info}>
            <div className={styles.name}>
              <label htmlFor=''>Full Name</label>
              <span>{SplitNameFromEmail(userData?.user?.email)}</span>
            </div>

            <div className={styles.name}>
              <label htmlFor=''>Email</label>
              <span>{userData?.user?.email}</span>
            </div>

            <div className={styles.name}>
              <label htmlFor=''>Role</label>
              <span>
                {roleMap[userData?.user?.role] || userData?.user?.role}
              </span>{" "}
            </div>
            {userData?.user?.role === "Live Agent" && (
              <div className={styles.name} style={{ position: "relative" }}>
                <label htmlFor=''>Status</label>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                  }}
                  onClick={() => setSelectDropdown(!selectDropdown)}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    {selectedLabel === "Online" && <img src={green} alt='' />}
                    {selectedLabel === "Busy" && <img src={offline} alt='' />}
                    {selectedLabel === "Offline" && <img src={red} alt='' />}
                    <span>{selectedLabel || "Online"}</span>
                  </div>
                  <svg
                    width='20'
                    height='20'
                    viewBox='0 0 20 20'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M2.34521 7.27367L8.8574 13.4028C9.49915 14.0068 10.5002 14.0068 11.142 13.4028L17.6541 7.27367C17.9893 6.95824 18.0053 6.43084 17.6898 6.0957C17.3744 5.76055 16.847 5.74457 16.5119 6.06L9.99968 12.1891L3.48748 6.06C3.15234 5.74457 2.62494 5.76055 2.30951 6.09569C1.99408 6.43084 2.01006 6.95823 2.34521 7.27367Z'
                      fill='#2B2B2B'
                      fill-opacity='0.8'
                    />
                  </svg>
                </div>
              </div>
            )}
            {selectDropdown && (
              <div className={styles.status}>
                {status.map((option) => (
                  <div
                    key={option.value}
                    className={styles.option}
                    onClick={() => handleStatusChange(option.label)}
                  >
                    <img src={option.img} alt='' />
                    <span>{option.label}</span>
                  </div>
                ))}
              </div>
            )}

            <div className={styles.password}>
              <label htmlFor='password'>Password</label>
              <button onClick={handlePassword}>
                Change password{" "}
                <svg
                  className={styles.svg}
                  width='24'
                  height='24'
                  viewBox='0 0 20 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M10.2329 4.18414C10.4626 4.423 10.4551 4.80282 10.2163 5.0325L7.06605 8L10.2163 10.9675C10.4551 11.1972 10.4626 11.577 10.2329 11.8159C10.0032 12.0547 9.62339 12.0622 9.38452 11.8325L5.78452 8.4325C5.66688 8.31938 5.60039 8.16321 5.60039 8C5.60039 7.83679 5.66688 7.68062 5.78452 7.5675L9.38452 4.1675C9.62339 3.93782 10.0032 3.94527 10.2329 4.18414Z'
                    fill='currentColor'
                    fill-opacity='0.8'
                  />
                </svg>
              </button>

              {password && (
                <ChangePassword onClose={() => setPassword(false)} />
              )}
            </div>
          </div>
          <ToastContainer className={styles.toast} />
        </div>
      )}
    </>
  );
}
