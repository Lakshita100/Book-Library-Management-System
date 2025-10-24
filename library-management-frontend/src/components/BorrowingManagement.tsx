import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Search, Plus, Calendar, User, Book } from "lucide-react";
import { mockBorrowRecords, mockBooks, mockUsers } from "../data/mockData";
import { BorrowRecord } from "../types/library";

export function BorrowingManagement() {
  const [borrowRecords, setBorrowRecords] = useState<BorrowRecord[]>(mockBorrowRecords);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isNewBorrowDialogOpen, setIsNewBorrowDialogOpen] = useState(false);
  const [newBorrowData, setNewBorrowData] = useState({
    bookId: "",
    userId: "",
    dueDate: "",
  });

  const filteredRecords = borrowRecords.filter((record) => {
    const book = mockBooks.find(b => b.id === record.bookId);
    const user = mockUsers.find(u => u.id === record.userId);
    
    const matchesSearch = 
      book?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book?.isbn.includes(searchTerm) ||
      user?.membershipId.includes(searchTerm);
    
    const matchesStatus = statusFilter === "all" || record.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleNewBorrow = () => {
    const newRecord: BorrowRecord = {
      id: Date.now().toString(),
      bookId: newBorrowData.bookId,
      userId: newBorrowData.userId,
      borrowedAt: new Date(),
      dueDate: new Date(newBorrowData.dueDate),
      status: 'borrowed',
    };
    
    setBorrowRecords([...borrowRecords, newRecord]);
    setIsNewBorrowDialogOpen(false);
    setNewBorrowData({ bookId: "", userId: "", dueDate: "" });
  };

  const handleReturn = (recordId: string) => {
    setBorrowRecords(records =>
      records.map(record =>
        record.id === recordId
          ? { ...record, status: 'returned' as const, returnedAt: new Date() }
          : record
      )
    );
  };

  const getBookTitle = (bookId: string) => {
    const book = mockBooks.find(b => b.id === bookId);
    return book?.title || "Unknown Book";
  };

  const getUserName = (userId: string) => {
    const user = mockUsers.find(u => u.id === userId);
    return user?.name || "Unknown User";
  };

  const getUserMembershipId = (userId: string) => {
    const user = mockUsers.find(u => u.id === userId);
    return user?.membershipId || "Unknown ID";
  };

  const getStatusBadgeVariant = (status: string, dueDate: Date) => {
    if (status === 'returned') return 'secondary';
    if (status === 'overdue' || new Date() > dueDate) return 'destructive';
    return 'default';
  };

  const getStatusText = (status: string, dueDate: Date) => {
    if (status === 'returned') return 'Returned';
    if (new Date() > dueDate) return 'Overdue';
    return 'Borrowed';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2>Borrowing Management</h2>
          <p className="text-muted-foreground">
            Track book borrowings and returns
          </p>
        </div>
        <Dialog open={isNewBorrowDialogOpen} onOpenChange={setIsNewBorrowDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Borrowing
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Book Borrowing</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="book">Book</Label>
                <Select value={newBorrowData.bookId} onValueChange={(value: string) => 
                  setNewBorrowData(prev => ({ ...prev, bookId: value }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a book" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockBooks.filter(book => book.availableCopies > 0).map((book) => (
                      <SelectItem key={book.id} value={book.id}>
                        {book.title} - {book.author}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="user">Member</Label>
                <Select value={newBorrowData.userId} onValueChange={(value: string) => 
                  setNewBorrowData(prev => ({ ...prev, userId: value }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a member" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockUsers.filter(user => user.role === 'member').map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name} ({user.membershipId})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newBorrowData.dueDate}
                  onChange={(e) => setNewBorrowData(prev => ({ ...prev, dueDate: e.target.value }))}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsNewBorrowDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleNewBorrow}
                  disabled={!newBorrowData.bookId || !newBorrowData.userId || !newBorrowData.dueDate}
                >
                  Create Borrowing
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by book title, member name, ISBN, or membership ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="borrowed">Borrowed</SelectItem>
            <SelectItem value="returned">Returned</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Borrowing Records Table */}
      <Card>
        <CardHeader>
          <CardTitle>Borrowing Records</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Book</TableHead>
                <TableHead>Member</TableHead>
                <TableHead>Borrowed Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="font-medium">{getBookTitle(record.bookId)}</p>
                      <p className="text-xs text-muted-foreground">
                        <Book className="h-3 w-3 inline mr-1" />
                        ID: {record.bookId}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="font-medium">{getUserName(record.userId)}</p>
                      <p className="text-xs text-muted-foreground">
                        <User className="h-3 w-3 inline mr-1" />
                        {getUserMembershipId(record.userId)}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="h-3 w-3" />
                      {record.borrowedAt.toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="h-3 w-3" />
                      {record.dueDate.toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(record.status, record.dueDate)}>
                      {getStatusText(record.status, record.dueDate)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {record.status === 'borrowed' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleReturn(record.id)}
                      >
                        Mark Returned
                      </Button>
                    )}
                    {record.returnedAt && (
                      <p className="text-xs text-muted-foreground">
                        Returned: {record.returnedAt.toLocaleDateString()}
                      </p>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredRecords.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No borrowing records found.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}