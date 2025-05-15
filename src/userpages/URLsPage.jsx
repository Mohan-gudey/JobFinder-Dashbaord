import { useState, useEffect } from 'react';
import axios from 'axios';
import URLCard from './URLCard';
import URLForm from './URLForm';


const URLsPage = () => {
  const [urls, setUrls] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingUrl, setEditingUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const API_URL = 'https://jobfinder-backend-kh46.onrender.com/api/urls';

  const fetchURLs = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(API_URL);
      setUrls(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch URLs. Please try again later.');
      console.error('Error fetching URLs:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchURLs();
  }, []);

  const handleAddURL = () => {
    setEditingUrl(null);
    setShowForm(true);
  };

  const handleEditURL = (url) => {
    setEditingUrl(url);
    setShowForm(true);
  };

  const handleDeleteClick = (id) => {
    setConfirmDeleteId(id); // Open modal
  };

  const confirmDeleteURL = async () => {
    try {
      await axios.delete(`${API_URL}/${confirmDeleteId}`);
      setUrls(urls.filter(url => url._id !== confirmDeleteId));
      setConfirmDeleteId(null); // Close modal
    } catch (err) {
      setError('Failed to delete URL. Please try again.');
      console.error('Error deleting URL:', err);
      setConfirmDeleteId(null); // Close modal even on error
    }
  };

  const handleCrawlURL = async (id) => {
    try {
      await axios.post(`${API_URL}/${id}/crawl`);
      fetchURLs();
    } catch (err) {
      setError('Failed to initiate crawling. Please try again.');
      console.error('Error crawling URL:', err);
    }
  };

  const handleSubmit = async (urlData) => {
    try {
      if (editingUrl) {
        const response = await axios.put(`${API_URL}/${editingUrl._id}`, urlData);
        setUrls(urls.map(url => url._id === editingUrl._id ? response.data : url));
      } else {
        const response = await axios.post(API_URL, urlData);
        setUrls([response.data, ...urls]);
      }
      setShowForm(false);
    } catch (err) {
      setError(`Failed to ${editingUrl ? 'update' : 'create'} URL. Please try again.`);
      console.error('Error submitting URL:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="px-5">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">URL Management</h1>
          <button
            onClick={handleAddURL}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add New URL
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : urls.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No URLs found. Add your first URL!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {urls.map(url => (
              <URLCard 
                key={url._id} 
                urlData={url} 
                onEdit={handleEditURL} 
                onDelete={() => handleDeleteClick(url._id)} // Updated here
                onCrawl={handleCrawlURL}
              />
            ))}
          </div>
        )}
      </div>

      {showForm && (
        <URLForm 
          urlData={editingUrl} 
          onSubmit={handleSubmit} 
          onClose={() => setShowForm(false)} 
        />
      )}

      {/* Delete Confirmation Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Delete URL?</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this URL? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteURL}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default URLsPage;
