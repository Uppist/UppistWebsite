/** @format */
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Blogs.module.css';
import blogData from './blog-data.json';
import redIcon from './Blogs-assets/redIcon.svg';

import blog1Cover from './Blogs-assets/blog1-cover.jpg';
import blog2Cover from './Blogs-assets/blog2-cover.jpg';
import blog3Cover from './Blogs-assets/blog3-cover.jpg';
import blog4Cover from './Blogs-assets/blog4-cover.jpg';
import blog5Cover from './Blogs-assets/blog5-cover.jpg';
import blog6Cover from './Blogs-assets/blog6-cover.jpg';
import blog7Cover from './Blogs-assets/blog7-cover.jpg';

// ---- helpers ----
const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];
const parseDMY = (dmy) => {
  // Expect: "DD Month YYYY" (e.g., "02 August 2025")
  if (!dmy) return new Date(0);
  const parts = dmy.trim().split(/\s+/);
  if (parts.length !== 3) return new Date(0);
  const [dd, monthName, yyyy] = parts;
  const m = MONTHS.indexOf(monthName);
  const day = parseInt(dd, 10);
  const year = parseInt(yyyy, 10);
  if (m < 0 || isNaN(day) || isNaN(year)) return new Date(0);
  return new Date(year, m, day);
};

const coverImageMap = {
  'blog1-cover.jpg': blog1Cover,
  'blog2-cover.jpg': blog2Cover,
  'blog3-cover.jpg': blog3Cover,
  'blog4-cover.jpg': blog4Cover,
  'blog5-cover.jpg': blog5Cover,
  'blog6-cover.jpg': blog6Cover,
  'blog7-cover.jpg': blog7Cover,
};

const BlogCard = ({ id, title, date, excerpt, coverImage }) => {
  const src = coverImageMap[coverImage] ?? blog1Cover;
  return (
    <Link to={`/blogs/${id}`} className={styles.blogCardLink}>
      <div className={styles.blogCard}>
        <img src={src} alt={title} className={styles.blogImage} />
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

const chunk = (arr, size) => {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
};

const Blogs = () => {
  // Never mutate blogData. Sort a copy by date desc.
  const sortedByDate = [...blogData].sort((a, b) => parseDMY(b.date) - parseDMY(a.date));
  const recentBlog = sortedByDate[0];

  // Keep "All posts" also in date order so the latest (possibly Blog 6) is consistent.
  const allPostCards = sortedByDate.map((blog) => (
    <Link to={`/blogs/${blog.id}`} key={blog.id} className={styles.blogCardLink}>
      <div className={styles.blogCardAllPosts}>
        <img
          src={coverImageMap[blog.coverImage] ?? blog1Cover}
          alt={blog.title}
          className={styles.blogImageAllPosts}
        />
        <div className={styles.blogContent}>
          <img src={redIcon} alt="Red Arrow" className={styles.redIconAllposts} />
          <p className={styles.blogDateAllPosts}>{blog.date}</p>
          <h2 className={styles.titleAllPosts}>{blog.title}</h2>
          <p className={styles.blogExcerptAllPosts}>{blog.excerpt}</p>
        </div>
      </div>
    </Link>
  ));

  const rows = chunk(allPostCards, 3);

  return (
    <section className={styles.blogs}>
      <h1 className={styles.blogsTitle}>Blogs</h1>

      <div className={styles.blogsContainer}>
        {recentBlog && <BlogCard key={recentBlog.id} {...recentBlog} />}
      </div>

      <h1 className={styles.blogsTitle}>All posts</h1>
      <div className={styles.allPostsContainer}>
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.allPostsRow}>
            {row}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blogs;
