import { useState, useEffect } from 'react';

function PostForm({ onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    title: '',
    body: ''
  });

  // If initialData is provided, it means we're editing an existing post
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        body: initialData.body
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim() && formData.body.trim()) {
      onSubmit(formData);
      // Reset form if it's not for editing
      if (!initialData) {
        setFormData({ title: '', body: '' });
      }
    }
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <h2 className="form-title">{initialData ? 'Edit Post' : 'Create New Post'}</h2>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter post title"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="body">Content</label>
        <textarea
          id="body"
          name="body"
          value={formData.body}
          onChange={handleChange}
          placeholder="Write your post content here"
          required
          rows="6"
        />
      </div>
      <div className="form-actions">
        <button type="submit" className="submit-btn">
          {initialData ? 'Update Post' : 'Publish Post'}
        </button>
      </div>
    </form>
  );
}

export default PostForm;
