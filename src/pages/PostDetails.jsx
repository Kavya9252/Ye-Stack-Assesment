import { useParams, Link, useNavigate } from 'react-router-dom';

function PostDetails({ posts }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const numericId = parseInt(id);
  const post = posts.find(p => p.id === numericId);

  if (!post) {
    return (
      <div className="post-details not-found">
        <h2>Post not found</h2>
        <p>The post you're looking for doesn't exist.</p>
        <Link to="/" className="back-btn">Back to Posts</Link>
      </div>
    );
  }

  return (
    <div className="post-details-card">
      <button onClick={() => navigate(-1)} className="back-btn">
        &larr; Back to Posts
      </button>
      
      <div className="post-details-header">
        <h1 className="post-details-title">{post.title}</h1>
        <div className="post-details-badges">
          {post.isUserCreated && (
            <span className="user-post-badge">Your Post</span>
          )}
          {post.edited && (
            <span className="edited-badge">Edited</span>
          )}
        </div>
      </div>
      
      <div className="post-details-content">
        <p>{post.body}</p>
      </div>
    </div>
  );
}

export default PostDetails;