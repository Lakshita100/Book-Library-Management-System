// API Configuration and Base URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// Helper function to get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Helper function to create headers
const getHeaders = (includeAuth = true) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  
  if (includeAuth) {
    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  
  return headers;
};

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || `HTTP error! status: ${response.status}`);
  }
  
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }
  return response.text();
};

// ============================================
// Authentication API
// ============================================

export const authAPI = {
  // Login
  login: async (username, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify({ username, password }),
    });
    const data = await handleResponse(response);
    
    // Store token in localStorage
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', username);
    }
    
    return data;
  },

  // Register
  register: async (username, password, role = 'USER') => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify({ username, password, role }),
    });
    return handleResponse(response);
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userRole');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!getAuthToken();
  },

  // Get current user info
  getCurrentUser: () => {
    return {
      username: localStorage.getItem('username'),
      token: getAuthToken(),
    };
  },
};

// ============================================
// Books API
// ============================================

export const booksAPI = {
  // Get all books
  getAllBooks: async () => {
    const response = await fetch(`${API_BASE_URL}/books`, {
      headers: getHeaders(false), // Books are public
    });
    return handleResponse(response);
  },

  // Get book by ID
  getBookById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/books/${id}`, {
      headers: getHeaders(false),
    });
    return handleResponse(response);
  },

  // Search books
  searchBooks: async (query) => {
    const response = await fetch(`${API_BASE_URL}/books/search?query=${encodeURIComponent(query)}`, {
      headers: getHeaders(false),
    });
    return handleResponse(response);
  },

  // Get available books
  getAvailableBooks: async () => {
    const response = await fetch(`${API_BASE_URL}/books/available`, {
      headers: getHeaders(false),
    });
    return handleResponse(response);
  },

  // Add book (Admin only)
  addBook: async (book) => {
    const response = await fetch(`${API_BASE_URL}/books`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(book),
    });
    return handleResponse(response);
  },

  // Update book (Admin only)
  updateBook: async (id, book) => {
    const response = await fetch(`${API_BASE_URL}/books/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(book),
    });
    return handleResponse(response);
  },

  // Delete book (Admin only)
  deleteBook: async (id) => {
    const response = await fetch(`${API_BASE_URL}/books/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true),
    });
    return handleResponse(response);
  },
};

// ============================================
// Borrow API
// ============================================

export const borrowAPI = {
  // Borrow a book
  borrowBook: async (userId, bookId) => {
    const response = await fetch(`${API_BASE_URL}/borrow/${userId}/${bookId}`, {
      method: 'POST',
      headers: getHeaders(true),
    });
    return handleResponse(response);
  },

  // Return a book
  returnBook: async (borrowId) => {
    const response = await fetch(`${API_BASE_URL}/borrow/return/${borrowId}`, {
      method: 'PUT',
      headers: getHeaders(true),
    });
    return handleResponse(response);
  },

  // Get all borrow records
  getAllBorrowRecords: async () => {
    const response = await fetch(`${API_BASE_URL}/borrow`, {
      headers: getHeaders(true),
    });
    return handleResponse(response);
  },
};

// ============================================
// Users API (Admin only)
// ============================================

export const usersAPI = {
  // Get all users
  getAllUsers: async () => {
    const response = await fetch(`${API_BASE_URL}/users`, {
      headers: getHeaders(true),
    });
    return handleResponse(response);
  },

  // Get user by ID
  getUserById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      headers: getHeaders(true),
    });
    return handleResponse(response);
  },

  // Delete user
  deleteUser: async (id) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true),
    });
    return handleResponse(response);
  },
};

// Export API base URL for other uses
export const API_URL = API_BASE_URL;

export default {
  auth: authAPI,
  books: booksAPI,
  borrow: borrowAPI,
  users: usersAPI,
};
