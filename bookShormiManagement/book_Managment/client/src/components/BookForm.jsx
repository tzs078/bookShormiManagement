import  { useState } from 'react';
import toast from 'react-hot-toast';

const BookForm = ({onAddBook}) => {

    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")


        const handleSubmit = (e) => {
            e.preventDefault()

            if(!title.trim()  || !author.trim()) return
           
            onAddBook({title, author})

            toast.success("book saved successfully")
            setTitle("")
            setAuthor("")
        }

    return (
     <form onSubmit={handleSubmit} className="bg-white p-2 rounded-xl shadow-md border border-gray-100">

      <div className="space-y-3">
        {/* Book Title */}
        <div>
          <label className="block text-gray-700 text-xs font-semibold mb-1">
            Book Title <span className="text-red-500">*</span>
          </label>
          <input 
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter book title"
            required
            className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Book Author */}
        <div>
          <label className="block text-gray-700 text-xs font-semibold mb-1">
            Book Author <span className="text-red-500">*</span>
          </label>
          <input 
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Enter book author"
            required
            className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 transition-colors text-white font-medium text-sm py-2 px-4 rounded-lg shadow-sm mt-2"
        >
          Add Book
        </button>
      </div>
    </form>
    );
};

export default BookForm;