/** @format */
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import styles from './Blogs.module.css';
import blogData from './blog-data.json';
import backIcon from './Blogs-assets/back.svg';
import redIcon from './Blogs-assets/redIcon.svg'; // Red arrow icon
import blog1Cover from '../Blogs/Blogs-assets/blog1-cover.jpg';
import blog2Cover from '../Blogs/Blogs-assets/blog2-cover.jpg';
import blog3Cover from '../Blogs/Blogs-assets/blog3-cover.jpg';
import blog4Cover from '../Blogs/Blogs-assets/blog4-cover.jpg';

const importImage = (imageName) => {
  try {
    return import(/* @vite-ignore */ `./Blogs-assets/${imageName}`);
  } catch (e) {
    console.error(`Failed to import image: ${imageName}`, e);
    return null;
  }
};

const BlogDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [detailImage, setDetailImage] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      const blog = blogData.find((blog) => blog.id === parseInt(id));
      if (blog) {
        const imageModule = await importImage(blog.image);
        setDetailImage(imageModule ? imageModule.default : null);
      }
    };
    loadImage();
    // Scroll to top on mount or id change
    window.scrollTo(0, 0);
  }, [id]);

  const blog = blogData.find((blog) => blog.id === parseInt(id));

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

  // Get the three most recent posts (highest IDs)
  const recentPosts = [...blogData]
    .sort((a, b) => b.id - a.id)
    .filter((b) => b.id !== parseInt(id))
    .slice(0, 3);

  const markdownComponents = {
    // Apply the blogDetailContent class to the root wrapper (e.g., div)
    div: ({ node, ...props }) => <div className={styles.blogDetailContent} {...props} />,
    // Apply styling to paragraphs and list items
    p: ({ node, ...props }) => <p className={styles.blogDetailText} {...props} />,
    li: ({ node, ...props }) => <li className={styles.blogDetailText} {...props} />,
    // Apply styling to subheadings
    h2: ({ node, ...props }) => <h2 className={styles.blogDetailSubheading} {...props} />,
    // Custom component for hyperlinks to remove underline and prevent red visited state
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
      {detailImage && (
        <img
          src={detailImage}
          alt={blog.title}
          className={styles.blogDetailImage}
        />
      )}
      <ReactMarkdown components={markdownComponents}>{blog.content}</ReactMarkdown>
      <h1 className={styles.blogsTitleMorePost}>Read more posts</h1>
      <div className={styles.allPostsContainer}>
        {recentPosts.map((blog) => (
          <Link to={`/blogs/${blog.id}`} key={blog.id} className={styles.blogCardLink}>
            <div className={styles.blogCardAllPosts}>
              <img src={blog.coverImage === 'blog1-cover.jpg' ? blog1Cover : blog.coverImage === 'blog2-cover.jpg' ? blog2Cover : blog.coverImage === 'blog3-cover.jpg' ? blog3Cover : blog4Cover} alt={blog.title} className={styles.blogImageAllPosts} />
              <div className={styles.blogContent}>
                <img src={redIcon} alt="Red Arrow" className={styles.redIconAllposts} />
                <p className={styles.blogDateAllPosts}>{blog.date}</p>
                <h2 className={styles.titleAllPosts}>{blog.title}</h2>
                <p className={styles.blogExcerptAllPosts}>{blog.excerpt}</p>
              </div>
            </div>
          </Link>
        )).slice(0, Math.ceil(recentPosts.length / 3) * 3).reduce((rows, item, index) => {
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

export default BlogDetail;