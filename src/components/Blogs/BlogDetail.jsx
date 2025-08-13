/** @format */
import React, { useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import styles from './Blogs.module.css';
import blogData from './blog-data.json';
import backIcon from './Blogs-assets/back.svg';
import redIcon from './Blogs-assets/redIcon.svg';

// Import ALL images so Vite includes them in build
import blog1Detail from './Blogs-assets/blog1-detail.jpg';
import blog2Detail from './Blogs-assets/blog2-detail.jpg';
import blog3Detail from './Blogs-assets/blog3-detail.jpg';
import blog4Detail from './Blogs-assets/blog4-detail.jpg';

import blog1Cover from './Blogs-assets/blog1-cover.jpg';
import blog2Cover from './Blogs-assets/blog2-cover.jpg';
import blog3Cover from './Blogs-assets/blog3-cover.jpg';
import blog4Cover from './Blogs-assets/blog4-cover.jpg';

// Map file names from JSON → imported images
const detailImageMap = {
  'blog1-detail.jpg': blog1Detail,
  'blog2-detail.jpg': blog2Detail,
  'blog3-detail.jpg': blog3Detail,
  'blog4-detail.jpg': blog4Detail,
};

const coverImageMap = {
  'blog1-cover.jpg': blog1Cover,
  'blog2-cover.jpg': blog2Cover,
  'blog3-cover.jpg': blog3Cover,
  'blog4-cover.jpg': blog4Cover,
};

const BlogDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const blog = blogData.find((b) => b.id === parseInt(id));

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when page loads
  }, [id]);

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

  // Get the three most recent posts excluding the current one
  const recentPosts = [...blogData]
    .sort((a, b) => b.id - a.id)
    .filter((b) => b.id !== parseInt(id))
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
          src={detailImageMap[blog.image]} // ✅ Load from static map
          alt={blog.title}
          className={styles.blogDetailImage}
        />
      )}
      <ReactMarkdown components={markdownComponents}>{blog.content}</ReactMarkdown>
      <h1 className={styles.blogsTitleMorePost}>Read more posts</h1>
      <div className={styles.allPostsContainer}>
        {recentPosts.map((recent) => (
          <Link to={`/blogs/${recent.id}`} key={recent.id} className={styles.blogCardLink}>
            <div className={styles.blogCardAllPosts}>
              <img
                src={coverImageMap[recent.coverImage]}
                alt={recent.title}
                className={styles.blogImageAllPosts}
              />
              <div className={styles.blogContent}>
                <img src={redIcon} alt="Red Arrow" className={styles.redIconAllposts} />
                <p className={styles.blogDateAllPosts}>{recent.date}</p>
                <h2 className={styles.titleAllPosts}>{recent.title}</h2>
                <p className={styles.blogExcerptAllPosts}>{recent.excerpt}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default BlogDetail;
