/** @format */
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Blogs.module.css';
import blogData from './blog-data.json';
// import backIcon from '../../../public/Blogs-assets/back.svg';
import redIcon from './Blogs-assets/redIcon.svg'; // Red arrow icon
import blog1Cover from '../Blogs/Blogs-assets/blog1-cover.png';
import blog2Cover from '../Blogs/Blogs-assets/blog2-cover.png';
import blog3Cover from '../Blogs/Blogs-assets/blog3-cover.png';
import blog4Cover from '../Blogs/Blogs-assets/blog4-cover.png';

const BlogCard = ({ id, title, date, excerpt, coverImage }) => {
  const coverImageMap = {
    'blog1-cover.png': blog1Cover,
    'blog2-cover.png': blog2Cover,
    'blog3-cover.png': blog3Cover,
    'blog4-cover.png': blog4Cover,
  };

  return (
    <Link to={`/blogs/${id}`} className={styles.blogCardLink}>
      <div className={styles.blogCard}>
        <img src={coverImageMap[coverImage]} alt={title} className={styles.blogImage} />
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
      <h1 className={styles.blogsTitle}>All posts</h1>
      <div className={styles.allPostsContainer}>
        {blogData.map((blog) => (
          <Link to={`/blogs/${blog.id}`} key={blog.id} className={styles.blogCardLink}>
            <div className={styles.blogCardAllPosts}>
              <img src={blog.coverImage === 'blog1-cover.png' ? blog1Cover : blog.coverImage === 'blog2-cover.png' ? blog2Cover : blog.coverImage === 'blog3-cover.png' ? blog3Cover : blog4Cover} alt={blog.title} className={styles.blogImageAllPosts} />
              <div className={styles.blogContent}>
                <img src={redIcon} alt="Red Arrow" className={styles.redIconAllposts} />
                <p className={styles.blogDateAllPosts}>{blog.date}</p>
                <h2 className={styles.titleAllPosts}>{blog.title}</h2>
                <p className={styles.blogExcerptAllPosts}>{blog.excerpt}</p>
              </div>
            </div>
          </Link>
        )).slice(0, Math.ceil(blogData.length / 3) * 3).reduce((rows, item, index) => {
          if (index % 3 === 0) rows.push([]);
          rows[rows.length - 1].push(item);
          return rows;
        }, []).map((row, rowIndex) => (
          <div key={rowIndex} className={styles.allPostsRow}>
            {row}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blogs;