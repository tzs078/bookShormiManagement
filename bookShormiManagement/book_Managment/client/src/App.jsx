import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import './App.css';
import BookForm from './components/BookForm';
import BookList from './components/BookList';

const API_URL = 'https://server-gamma-two-70.vercel.app/books';

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all books (GET /api/books)
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setBooks(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching books:', error);
        toast.error("Failed to load books");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Add Book (POST /api/books)
  const handleAddBook = async (bookData) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookData)
      });
      const newBook = await response.json();
      
      if (response.ok) {
        setBooks((prevBooks) => [newBook, ...prevBooks]);
        toast.success("Book added successfully!");
      } else {
        toast.error(newBook.error || "Failed to add book");
      }
    } catch (error) {
      console.error('Error adding book:', error);
      toast.error("Failed to add book");
    }
  };

  // Delete Book (DELETE /api/books/:id)
  const handleDeleteBook = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
        toast.success("Book deleted successfully!");
      } else {
        toast.error("Failed to delete book");
      }
    } catch (error) {
      console.error('Error deleting book:', error);
      toast.error("Failed to delete book");
    }
  };

  // Toggle Read Status (PUT /api/books/:id)
  const handleToggleRead = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT'
      });
      const updatedBook = await response.json();
      
      if (response.ok) {
        setBooks((prevBooks) =>
          prevBooks.map((book) => (book.id === id ? updatedBook : book))
        );
        toast.success("Status updated!");
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.error('Error updating book status:', error);
      toast.error("Failed to update status");
    }
  };

  return (
   <div className="min-h-screen bg-gray-100 pb-12">
      {/* Chotto Navbar */}
      <nav className="bg-white shadow-sm mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">📚</span>
            <span className="font-bold text-lg text-gray-900">BookShelf</span>
          </div>
          <div className="text-sm text-gray-600">
            Personal Reading Journey
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">BookShelf Manager</h1>
          <p className="text-gray-600 mt-1">Keep track of your personal reading journey</p>
        </header>

        {/* Responsive Grid Layout: Left side form, Right side list (Desktop-e 2 columns, Mobile-e 1 column) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Side: Book Form (1 column span on desktop) */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 lg:sticky lg:top-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Book</h2>
            <BookForm onAddBook={handleAddBook} />
          </div>

          {/* Right Side: Book List (2 columns span on desktop) */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Books</h2>
            {loading ? (
              <div className="text-center py-12 text-gray-500">Loading books...</div>
            ) : (
              <BookList 
                books={books} 
                onDelete={handleDeleteBook} 
                onToggleRead={handleToggleRead} 
              />
            )}
          </div>

        </div>
      </div>

      <Toaster />
    </div>
  );
}

export default App;