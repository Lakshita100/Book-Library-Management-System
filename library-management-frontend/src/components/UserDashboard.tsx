import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { 
  BookOpen, 
  Search, 
  Calendar, 
  Clock, 
  Star, 
  TrendingUp, 
  Award,
  Heart,
  Filter,
  Eye
} from "lucide-react";
import { mockBooks, mockBorrowRecords, bookCategories } from "../data/mockData";
import { Book, BorrowRecord } from "../types/library";
import { BookDetail } from "./BookDetail";

interface UserDashboardProps {
  userEmail: string;
  onLogout: () => void;
}

export function UserDashboard({ userEmail, onLogout }: UserDashboardProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  // Mock user data
  const userName = userEmail.split('@')[0];
  const userBorrowings = mockBorrowRecords.filter(record => record.status === 'borrowed').slice(0, 3);
  const recentBooks = mockBooks.slice(0, 6);

  const filteredBooks = mockBooks.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleViewDetails = (book: Book) => {
    setSelectedBook(book);
    setIsDetailDialogOpen(true);
  };

  const stats = {
    booksRead: 24,
    currentBorrowings: 3,
    favoriteGenre: "Science Fiction",
    memberSince: "Jan 2024"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-xl">
                <BookOpen className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">EduLibrary</h1>
                <p className="text-sm text-gray-600">Member Portal</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                    {userName.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 capitalize">{userName}</p>
                  <p className="text-xs text-gray-600">Library Member</p>
                </div>
              </div>
              <Button variant="outline" onClick={onLogout} className="text-sm">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full">
            <Star className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium text-gray-700">Welcome back, {userName}!</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Your Reading Journey</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover new books, track your reading progress, and manage your library experience.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Books Read</CardTitle>
              <BookOpen className="h-4 w-4 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.booksRead}</div>
              <p className="text-xs opacity-80">This year</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Current Loans</CardTitle>
              <Clock className="h-4 w-4 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.currentBorrowings}</div>
              <p className="text-xs opacity-80">Active borrowings</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Favorite Genre</CardTitle>
              <Heart className="h-4 w-4 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">{stats.favoriteGenre}</div>
              <p className="text-xs opacity-80">Most read</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Member Since</CardTitle>
              <Award className="h-4 w-4 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">{stats.memberSince}</div>
              <p className="text-xs opacity-80">Active member</p>
            </CardContent>
          </Card>
        </div>

        {/* Current Borrowings */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              Current Borrowings
            </CardTitle>
          </CardHeader>
          <CardContent>
            {userBorrowings.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-3">
                {userBorrowings.map((borrowing) => {
                  const book = mockBooks.find(b => b.id === borrowing.bookId);
                  if (!book) return null;
                  
                  return (
                    <div key={borrowing.id} className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border">
                      <h4 className="font-medium text-gray-900 mb-1">{book.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">Due: {borrowing.dueDate.toLocaleDateString()}</span>
                        <Badge variant="outline" className="text-xs">
                          <Calendar className="h-3 w-3 mr-1" />
                          Borrowed
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <BookOpen className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>No current borrowings</p>
                <p className="text-sm">Browse books below to start reading!</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Book Search and Catalog */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-blue-600" />
              Discover Books
            </CardTitle>
            
            {/* Search and Filter */}
            <div className="flex gap-4 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search books by title or author..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/80"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48 bg-white/80">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {bookCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredBooks.slice(0, 9).map((book) => (
                <div key={book.id} className="group">
                  <Card className="hover:shadow-lg transition-all duration-300 bg-white/80 border-0 group-hover:scale-105">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant={book.availableCopies > 0 ? "default" : "secondary"} className="text-xs">
                          {book.availableCopies > 0 ? "Available" : "Checked Out"}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {book.category}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg leading-tight line-clamp-2">{book.title}</CardTitle>
                      <p className="text-sm text-gray-600">by {book.author}</p>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        <p className="text-sm text-gray-600 line-clamp-2">{book.description}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>Published: {book.publishedYear}</span>
                          <span>{book.availableCopies}/{book.totalCopies} available</span>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewDetails(book)}
                            className="flex-1"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View Details
                          </Button>
                          <Button
                            size="sm"
                            disabled={book.availableCopies === 0}
                            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                          >
                            {book.availableCopies > 0 ? "Borrow" : "Unavailable"}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>

            {filteredBooks.length === 0 && (
              <div className="text-center py-12">
                <Search className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No books found</h3>
                <p className="text-gray-600">Try adjusting your search terms or filters.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Book Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-2xl">
          {selectedBook && <BookDetail book={selectedBook} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}