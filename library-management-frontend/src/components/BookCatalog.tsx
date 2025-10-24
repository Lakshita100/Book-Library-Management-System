import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Search, Plus, Edit, Eye } from "lucide-react";
import { mockBooks, bookCategories } from "../data/mockData";
import { Book } from "../types/library";
import { BookForm } from "./BookForm";
import { BookDetail } from "./BookDetail";

export function BookCatalog() {
  const [books, setBooks] = useState<Book[]>(mockBooks);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.isbn.includes(searchTerm);
    const matchesCategory = selectedCategory === "all" || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddBook = (bookData: Omit<Book, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newBook: Book = {
      ...bookData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setBooks([...books, newBook]);
    setIsAddDialogOpen(false);
  };

  const handleEditBook = (bookData: Omit<Book, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (selectedBook) {
      const updatedBook: Book = {
        ...selectedBook,
        ...bookData,
        updatedAt: new Date(),
      };
      setBooks(books.map(book => book.id === selectedBook.id ? updatedBook : book));
      setIsEditDialogOpen(false);
      setSelectedBook(null);
    }
  };

  const handleViewDetails = (book: Book) => {
    setSelectedBook(book);
    setIsDetailDialogOpen(true);
  };

  const handleEditClick = (book: Book) => {
    setSelectedBook(book);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2>Book Catalog</h2>
          <p className="text-muted-foreground">
            Manage your library's book collection
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Book
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Book</DialogTitle>
            </DialogHeader>
            <BookForm onSubmit={handleAddBook} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search books by title, author, or ISBN..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48">
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

      {/* Books Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredBooks.map((book) => (
          <Card key={book.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <CardTitle className="text-lg line-clamp-1">{book.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">by {book.author}</p>
                </div>
                <Badge variant={book.availableCopies > 0 ? "default" : "secondary"}>
                  {book.availableCopies > 0 ? "Available" : "Out of Stock"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-sm">
                  <p><span className="font-medium">ISBN:</span> {book.isbn}</p>
                  <p><span className="font-medium">Category:</span> {book.category}</p>
                  <p><span className="font-medium">Year:</span> {book.publishedYear}</p>
                  <p><span className="font-medium">Copies:</span> {book.availableCopies}/{book.totalCopies}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewDetails(book)}
                    className="flex-1"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditClick(book)}
                    className="flex-1"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No books found matching your criteria.</p>
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Book</DialogTitle>
          </DialogHeader>
          {selectedBook && (
            <BookForm
              initialData={selectedBook}
              onSubmit={handleEditBook}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-2xl">
          {selectedBook && <BookDetail book={selectedBook} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}