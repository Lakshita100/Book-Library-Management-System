import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Book } from "../types/library";
import { bookCategories } from "../data/mockData";

interface BookFormProps {
  initialData?: Book;
  onSubmit: (data: Omit<Book, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

export function BookForm({ initialData, onSubmit }: BookFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    author: initialData?.author || "",
    isbn: initialData?.isbn || "",
    category: initialData?.category || "",
    description: initialData?.description || "",
    publishedYear: initialData?.publishedYear || new Date().getFullYear(),
    totalCopies: initialData?.totalCopies || 1,
    availableCopies: initialData?.availableCopies || 1,
    coverImage: initialData?.coverImage || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="author">Author</Label>
          <Input
            id="author"
            value={formData.author}
            onChange={(e) => handleInputChange("author", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="isbn">ISBN</Label>
          <Input
            id="isbn"
            value={formData.isbn}
            onChange={(e) => handleInputChange("isbn", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={formData.category} onValueChange={(value: string) => handleInputChange("category", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {bookCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="publishedYear">Published Year</Label>
          <Input
            id="publishedYear"
            type="number"
            value={formData.publishedYear}
            onChange={(e) => handleInputChange("publishedYear", parseInt(e.target.value))}
            min="1000"
            max={new Date().getFullYear()}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="totalCopies">Total Copies</Label>
          <Input
            id="totalCopies"
            type="number"
            value={formData.totalCopies}
            onChange={(e) => handleInputChange("totalCopies", parseInt(e.target.value))}
            min="1"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="availableCopies">Available Copies</Label>
          <Input
            id="availableCopies"
            type="number"
            value={formData.availableCopies}
            onChange={(e) => handleInputChange("availableCopies", parseInt(e.target.value))}
            min="0"
            max={formData.totalCopies}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="coverImage">Cover Image URL (optional)</Label>
        <Input
          id="coverImage"
          type="url"
          value={formData.coverImage}
          onChange={(e) => handleInputChange("coverImage", e.target.value)}
          placeholder="https://example.com/book-cover.jpg"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          rows={4}
          required
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="submit">
          {initialData ? "Update Book" : "Add Book"}
        </Button>
      </div>
    </form>
  );
}