import { Link } from 'react-router-dom';

function PostItem({ post, onEdit }) {
  const shortDescription = post.body.substring(0, 100) + (post.body.length > 100 ? '...' : '');

  return (
    <div className="post-card">
      {post.isUserCreated && (
        <span className="user-post-badge card-badge">Your Post</span>
      )}
      {post.edited && (
        <span className="edited-badge card-badge">Edited</span>
      )}
      
      <h2 className="post-card-title">{post.title}</h2>
      <p className="post-card-description">{shortDescription}</p>
      
      <div className="post-card-actions">
        <Link to={`/post/${post.id}`} className="view-post-btn">
          Read More
        </Link>
        {onEdit && (
          <button onClick={onEdit} className="edit-post-btn">
            Edit
          </button>
        )}
      </div>
    </div>
  );
}

export default PostItem;