export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  description: string;
  publishedYear: number;
  totalCopies: number;
  availableCopies: number;
  coverImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BorrowRecord {
  id: string;
  bookId: string;
  userId: string;
  borrowedAt: Date;
  dueDate: Date;
  returnedAt?: Date;
  status: 'borrowed' | 'returned' | 'overdue';
}

export interface User {
  id: string;
  name: string;
  email: string;
  membershipId: string;
  role: 'admin' | 'librarian' | 'member';
  joinedAt: Date;
  isActive: boolean;
}

export interface LibraryStats {
  totalBooks: number;
  availableBooks: number;
  borrowedBooks: number;
  totalMembers: number;
  overdueBooks: number;
}