/** @format */
import React, { useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import styles from './Blogs.module.css';
import blogData from './blog-data.json';
import backIcon from './Blogs-assets/back.svg';
import redIcon from './Blogs-assets/redIcon.svg';

// Detail images
import blog1Detail from './Blogs-assets/blog1-detail.jpg';
import blog2Detail from './Blogs-assets/blog2-detail.jpg';
import blog3Detail from './Blogs-assets/blog3-detail.jpg';
import blog4Detail from './Blogs-assets/blog4-detail.jpg';
import blog5Detail from './Blogs-assets/blog5-detail.jpg';
import blog6Detail from './Blogs-assets/blog6-detail.jpg';
import blog7Detail from './Blogs-assets/blog7-detail.jpg';

// Cover images
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

const detailImageMap = {
  'blog1-detail.jpg': blog1Detail,
  'blog2-detail.jpg': blog2Detail,
  'blog3-detail.jpg': blog3Detail,
  'blog4-detail.jpg': blog4Detail,
  'blog5-detail.jpg': blog5Detail,
  'blog6-detail.jpg': blog6Detail,
  'blog7-detail.jpg': blog7Detail,
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

const BlogDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const currentId = Number(id);

  const blog = blogData.find((b) => b.id === currentId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentId]);

  if (!blog) {
    return (
      <section className={styles.blogDetailSection}>
        <button className={styles.blogDetailBackButton} onClick={() => navigate('/blogs')}>
          <img src={backIcon} alt="Back" className={styles.blogDetailBackIcon} />
        </button>
        <h1 className={styles.blogDetailTitle}>Blog Not Found</h1>
      </section>
    );
  }

  // Truly "recent" by date, exclude current
  const recentPosts = [...blogData]
    .filter((b) => b.id !== currentId)
    .sort((a, b) => parseDMY(b.date) - parseDMY(a.date))
    .slice(0, 3);

  const markdownComponents = {
    p: ({ node, ...props }) => <p className={styles.blogDetailText} {...props} />,
    li: ({ node, ...props }) => <li className={styles.blogDetailText} {...props} />,
    h2: ({ node, ...props }) => <h2 className={styles.blogDetailSubheading} {...props} />,
    a: ({ node, href, ...props }) => (
      <a href={href} target="_blank" rel="noopener noreferrer" className={styles.blogDetailLink} {...props} />
    ),
  };

  return (
    <section className={styles.blogDetailSection}>
      <button className={styles.blogDetailBackButton} onClick={() => navigate('/blogs')}>
        <img src={backIcon} alt="Back" className={styles.blogDetailBackIcon} />
      </button>

      <h1 className={styles.blogDetailTitle}>{blog.title}</h1>
      <p className={styles.blogDetailDate}>{blog.date}</p>

      {blog.image && (
        <img
          src={detailImageMap[blog.image] ?? blog1Detail}
          alt={blog.title}
          className={styles.blogDetailImage}
        />
      )}

      <ReactMarkdown components={markdownComponents}>{blog.content}</ReactMarkdown>

      <h1 className={styles.blogsTitleMorePost}>Read more posts</h1>
      <div className={styles.readMorePostsContainer}>
        {recentPosts.map((post) => (
          <Link to={`/blogs/${post.id}`} key={post.id} className={styles.blogCardLink}>
            <div className={styles.blogCardAllPosts}>
              <img
                src={coverImageMap[post.coverImage] ?? blog1Cover}
                alt={post.title}
                className={styles.blogImageAllPosts}
              />
              <div className={styles.blogContent}>
                <img src={redIcon} alt="Red Arrow" className={styles.redIconAllposts} />
                <p className={`${styles.blogDateAllPosts} ${styles.blogDateMorePosts}`}>{post.date}</p>
                <h2 className={styles.titleAllPosts}>{post.title}</h2>
                <p className={styles.blogExcerptAllPosts}>{post.excerpt}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default BlogDetail;
