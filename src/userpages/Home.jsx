
import { useState, useEffect } from 'react';
import JobCard from './JobCard';
import JobForm from './JobForm';
import axios from 'axios';

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null); // For confirmation dialog

  const API_URL = 'https://jobfinder-backend-kh46.onrender.com/api/jobs';

  const fetchJobs = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(API_URL);
      setJobs(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch jobs. Please try again later.');
      console.error('Error fetching jobs:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleAddJob = () => {
    setEditingJob(null);
    setShowForm(true);
  };

  const handleEditJob = (job) => {
    setEditingJob(job);
    setShowForm(true);
  };

  const handleDeleteClick = (id) => {
    setConfirmDeleteId(id);
  };

  const confirmDeleteJob = async () => {
    try {
      await axios.delete(`${API_URL}/${confirmDeleteId}`);
      setJobs(jobs.filter((job) => job._id !== confirmDeleteId));
      setConfirmDeleteId(null);
    } catch (err) {
      setError('Failed to delete job. Please try again.');
      console.error('Error deleting job:', err);
      setConfirmDeleteId(null);
    }
  };

  const handleSubmit = async (jobData) => {
    try {
      if (editingJob) {
        // Update existing job
        const response = await axios.put(`${API_URL}/${editingJob._id}`, jobData);
        setJobs(jobs.map((job) => (job._id === editingJob._id ? response.data : job)));
      } else {
        // Add new job
        const response = await axios.post(API_URL, jobData);
        setJobs([response.data, ...jobs]);
      }
      setShowForm(false);
      setEditingJob(null);
    } catch (err) {
      setError(`Failed to ${editingJob ? 'update' : 'create'} job. Please try again.`);
      console.error('Error submitting job:', err);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="px-5">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-semibold text-gray-900">Dashboard</h1>
          <button
            onClick={handleAddJob}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-lg shadow-md flex items-center transition-transform transform hover:scale-105"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Post New Job
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6 animate-fade-in">
            <p>{error}</p>
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="mt-4 text-xl font-medium text-gray-700">No jobs found</h3>
            <p className="text-gray-500 mt-1">Post your first job to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 max-h-[80vh] overflow-y-scroll">
            {jobs.map((job) => (
              <JobCard
                key={job._id}
                job={job}
                onEdit={handleEditJob}
                onDelete={() => handleDeleteClick(job._id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Delete Job?</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this job post? This action cannot be undone.</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteJob}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Job Form Modal */}
      {showForm && (
        <JobForm
          job={editingJob}
          onSubmit={handleSubmit}
          onClose={() => {
            setShowForm(false);
            setEditingJob(null);
          }}
        />
      )}
    </div>
  );
};

export default Home;