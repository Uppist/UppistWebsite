/** @format */
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './Blogs.module.css';
import backIcon from './Blogs-assets/back.svg';

const BlogDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <section className={styles.blogDetail}>
      <button className={styles.backButton} onClick={() => navigate('/blogs')}>
        <img src={backIcon} alt="Back" className={styles.backIcon} />
      </button>
      <h1 className={styles.blogDetailTitle}>Blog ID: {id}</h1>
      <p className={styles.blogDetailContent}>Hello blog</p>
    </section>
  );
};

export default BlogDetail;