import { useState } from 'react';

const URLCard = ({ urlData, onEdit, onDelete, onCrawl }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleCrawl = async () => {
    setIsLoading(true);
    try {
      await onCrawl(urlData._id);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{urlData.company}</h2>
            <a 
              href={urlData.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline break-all"
            >
              {urlData.url}
            </a>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => onEdit(urlData)}
              className="text-blue-600 hover:text-blue-800"
              aria-label="Edit"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
            <button 
              onClick={() => onDelete(urlData._id)}
              className="text-red-600 hover:text-red-800"
              aria-label="Delete"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">URL Status</p>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              urlData.urlStatus === 'active' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {urlData.urlStatus}
            </span>
          </div>
          <div>
            <p className="text-sm text-gray-500">Crawling Status</p>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              urlData.crawlingStatus === 'completed' 
                ? 'bg-green-100 text-green-800' 
                : urlData.crawlingStatus === 'in-progress'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-gray-100 text-gray-800'
            }`}>
              {urlData.crawlingStatus}
            </span>
          </div>
          <div>
            <p className="text-sm text-gray-500">Last Crawled</p>
            <p className="text-sm text-gray-800">
              {urlData.lastCrawledAt ? new Date(urlData.lastCrawledAt).toLocaleString() : 'Never'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Last Updated</p>
            <p className="text-sm text-gray-800">
              {urlData.updatedAt ? new Date(urlData.updatedAt).toLocaleString() : 'Never'}
            </p>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleCrawl}
            disabled={isLoading || urlData.crawlingStatus === 'in-progress'}
            className={`px-3 py-1 text-sm rounded-md ${
              isLoading || urlData.crawlingStatus === 'in-progress'
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : urlData.crawlingStatus === 'in-progress' ? (
              'Crawling in progress'
            ) : (
              'Crawl Now'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default URLCard;