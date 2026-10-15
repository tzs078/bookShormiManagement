

import { FaCheckCircle, FaUndo, FaTrash, FaBookOpen } from 'react-icons/fa';

const BookItem = ({ book, onDelete, onToggleRead }) => {

  const isRead = book.status === 'read';

  return (
   <div className={`flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border transition-all duration-300 ease-in-out hover:shadow-md mb-3 border-l-4 ${
      isRead ? 'border-l-green-500 bg-green-50/20' : 'border-l-blue-500'
    }`}>
      {/* Left Side: Book Info with Icons */}
      <div className="flex items-start space-x-3">
        <div className={`mt-1 p-2 rounded-full transition-colors duration-300 ${
          isRead ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
        }`}>
          {isRead ? <FaCheckCircle className="text-lg" /> : <FaBookOpen className="text-lg" />}
        </div>

        <div>
          <h3 className={`font-semibold text-lg transition-all duration-300 ${
            isRead ? 'line-through text-gray-400' : 'text-gray-800'
          }`}>
            {book.title}
          </h3>
          <p className="text-sm text-gray-600">by {book.author}</p>
          
          <span className={`inline-flex items-center gap-1 mt-1.5 px-2.5 py-0.5 text-xs font-semibold rounded-full transition-colors duration-300 ${
            isRead ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {book.status}
          </span>
        </div>
      </div>

      {/* Right Side: Action Buttons with Icons */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onToggleRead(book.id)}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer shadow-sm ${
            isRead 
              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300' 
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
          title={isRead ? "Mark as Unread" : "Mark as Read"}
        >
          {isRead ? <FaUndo className="text-xs" /> : <FaCheckCircle className="text-xs" />}
          <span className="hidden sm:inline">{isRead ? 'Mark Unread' : 'Mark Read'}</span>
        </button>

        <button
          onClick={() => onDelete(book.id)}
          className="flex items-center gap-1.5 bg-red-500 text-white px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg hover:bg-red-600 transition-all duration-200 cursor-pointer shadow-sm"
          title="Delete Book"
        >
          <FaTrash className="text-xs" />
          <span className="hidden sm:inline">Delete</span>
        </button>
      </div>
    </div>
  );
};

export default BookItem;