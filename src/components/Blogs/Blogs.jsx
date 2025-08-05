/** @format */
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Blogs.module.css';
import blogData from './blog-data.json';
import backIcon from './Blogs-assets/back.svg'; // Placeholder
import redIcon from './Blogs-assets/redIcon.svg'; // Red arrow icon
import image1 from './Blogs-assets/blog1.png';

const BlogCard = ({ id, title, date, excerpt, image }) => {
  return (
    <Link to={`/blogs/${id}`} className={styles.blogCardLink}>
      <div className={styles.blogCard}>
        <img src={image1} alt={title} className={styles.blogImage} />
        <div className={styles.blogContent}>
          <img src={redIcon} alt="Red Arrow" className={styles.redIcon} />
          <p className={styles.recentPosts}>Recent Posts</p>
          <p className={styles.blogDate}>{date}</p>
          <h2 className={styles.blogTitle}>{title}</h2>
          <p className={styles.blogExcerpt}>{excerpt}</p>
        </div>
      </div>
    </Link>
  );
};

const Blogs = () => {
  // Sort by date and take the most recent (only one for now)
  const recentBlog = blogData.sort((a, b) => new Date(b.date) - new Date(a.date))[0];

  return (
    <section className={styles.blogs}>
      <h1 className={styles.blogsTitle}>Blogs</h1>
      <div className={styles.blogsContainer}>
        {recentBlog && <BlogCard key={recentBlog.id} {...recentBlog} />}
      </div>
    </section>
  );
};

export default Blogs;