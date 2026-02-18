/** @format */

import React from "react";
import editimg from "../../../../../../assets/Dashboard/Edit.svg";
import dom from "../../../../../../assets/Dashboard/dom.svg";
import styles from "./styles.module.css";
import Edit from "./Edit";
import ChangePassword from "./ChangePassword";
import { toast, ToastContainer } from "react-toastify";

export default function EditProfile() {
  const [edit, setEdit] = React.useState(false);
  const [image, setImage] = React.useState(null);

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
  }

  const [password, setPassword] = React.useState(false);

  function handlePassword() {
    setPassword(true);
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
              <span>Sarah Ossai</span>
            </div>

            <div className={styles.name}>
              <label htmlFor=''>Email</label>
              <span>sarahossai@gmail.com</span>
            </div>

            <div className={styles.name}>
              <label htmlFor=''>Role</label>
              <span>Super Admin</span>
            </div>

            <div className={styles.password}>
              <label htmlFor='password'>Password</label>
              <button onClick={handlePassword}>
                Change password{" "}
                <svg
                  className={styles.svg}
                  width='32'
                  height='32'
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
