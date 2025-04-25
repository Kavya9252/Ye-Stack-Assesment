import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PostDetails from './pages/PostDetails';
import Header from './components/Header';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userPosts, setUserPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleAddPost = (newPost) => {
    // Create a new post with a unique ID and add it to userPosts
    const postWithId = {
      ...newPost,
      id: Date.now(), // Use timestamp as unique ID
      userId: 999, // Arbitrary userId for user-created posts
      isUserCreated: true
    };
    setUserPosts([postWithId, ...userPosts]);
  };

  const handleEditPost = (updatedPost) => {
    // Only user-created posts can be edited
    setUserPosts(userPosts.map(post => 
      post.id === updatedPost.id ? updatedPost : post
    ));
  };

  // Combine API posts and user-created posts
  const allPosts = [...userPosts, ...posts];
  
  // Filter posts based on search term
  const filteredPosts = allPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Routes>
        <Route 
          path="/" 
          element={
            <Home 
              posts={filteredPosts} 
              loading={loading} 
              onAddPost={handleAddPost} 
              onEditPost={handleEditPost} 
            />
          } 
        />
        <Route 
          path="/post/:id" 
          element={<PostDetails posts={allPosts} />} 
        />
      </Routes>
    </div>
  );
}

export default App;