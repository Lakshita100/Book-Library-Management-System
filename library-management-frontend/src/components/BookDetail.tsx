import { DialogHeader, DialogTitle } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Book, Calendar, User, Hash, Tag, FileText } from "lucide-react";
import { Book as BookType } from "../types/library";

interface BookDetailProps {
  book: BookType;
}

export function BookDetail({ book }: BookDetailProps) {
  return (
    <div className="space-y-6">
      <DialogHeader>
        <DialogTitle className="text-xl">{book.title}</DialogTitle>
        <p className="text-muted-foreground">by {book.author}</p>
      </DialogHeader>

      <div className="flex items-center gap-2">
        <Badge variant={book.availableCopies > 0 ? "default" : "secondary"}>
          {book.availableCopies > 0 ? "Available" : "Out of Stock"}
        </Badge>
        <Badge variant="outline">{book.category}</Badge>
      </div>

      <Separator />

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Hash className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">ISBN:</span>
            <span className="text-sm">{book.isbn}</span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Published:</span>
            <span className="text-sm">{book.publishedYear}</span>
          </div>

          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Category:</span>
            <span className="text-sm">{book.category}</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Book className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Total Copies:</span>
            <span className="text-sm">{book.totalCopies}</span>
          </div>

          <div className="flex items-center gap-2">
            <Book className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Available:</span>
            <span className="text-sm">{book.availableCopies}</span>
          </div>

          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Borrowed:</span>
            <span className="text-sm">{book.totalCopies - book.availableCopies}</span>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Description:</span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {book.description}
        </p>
      </div>

      {book.coverImage && (
        <>
          <Separator />
          <div className="space-y-2">
            <span className="text-sm font-medium">Cover Image:</span>
            <img
              src={book.coverImage}
              alt={`Cover of ${book.title}`}
              className="rounded-lg border max-w-48 h-auto"
            />
          </div>
        </>
      )}

      <Separator />

      <div className="flex gap-2">
        <Button
          className="flex-1"
          disabled={book.availableCopies === 0}
        >
          {book.availableCopies > 0 ? "Borrow Book" : "Currently Unavailable"}
        </Button>
        <Button variant="outline">
          View Borrowing History
        </Button>
      </div>

      <div className="text-xs text-muted-foreground space-y-1">
        <p>Added: {book.createdAt.toLocaleDateString()}</p>
        <p>Last Updated: {book.updatedAt.toLocaleDateString()}</p>
      </div>
    </div>
  );
}