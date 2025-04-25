import { useState } from 'react';
import PostItem from '../components/PostItem';
import PostForm from '../components/PostForm';

function Home({ posts, loading, onAddPost, onEditPost }) {
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  const handleStartEdit = (post) => {
    setEditingPost(post);
    setShowForm(true);
    // Scroll to the form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFormSubmit = (post) => {
    if (editingPost) {
      onEditPost({ 
        ...post, 
        id: editingPost.id, 
        userId: editingPost.userId,
        isUserCreated: true,
        edited: true
      });
      setEditingPost(null);
    } else {
      onAddPost(post);
    }
    setShowForm(false);
  };

  return (
    <div className="home-container">
      <div className="posts-header">
        <h1>Posts</h1>
        <button 
          className="add-post-btn"
          onClick={() => {
            setEditingPost(null);
            setShowForm(!showForm);
          }}
        >
          {showForm ? 'Cancel' : 'Add New Post'}
        </button>
      </div>

      {showForm && (
        <PostForm 
          onSubmit={handleFormSubmit} 
          initialData={editingPost} 
        />
      )}

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading posts...</p>
        </div>
      ) : (
        <div className="posts-grid">
          {posts.length > 0 ? (
            posts.map(post => (
              <PostItem 
                key={post.id} 
                post={post} 
                onEdit={post.isUserCreated ? () => handleStartEdit(post) : null}
              />
            ))
          ) : (
            <div className="no-posts-message">
              <p>No posts found matching your search.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;