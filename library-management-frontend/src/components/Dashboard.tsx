import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Book, Users, BookOpen, AlertTriangle, TrendingUp } from "lucide-react";
import { mockLibraryStats, mockBorrowRecords, mockUsers } from "../data/mockData";

export function Dashboard() {
  const stats = mockLibraryStats;
  const recentBorrows = mockBorrowRecords.slice(0, 5);
  const recentMembers = mockUsers.slice(0, 3);

  return (
    <div className="space-y-6">
      <div>
        <h2>Library Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of your library management system
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Books</CardTitle>
            <Book className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBooks}</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.availableBooks}</div>
            <p className="text-xs text-muted-foreground">
              Ready to borrow
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Borrowed</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.borrowedBooks}</div>
            <p className="text-xs text-muted-foreground">
              Currently out
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalMembers}</div>
            <p className="text-xs text-muted-foreground">
              Active users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{stats.overdueBooks}</div>
            <p className="text-xs text-muted-foreground">
              Need attention
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Recent Borrowings */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Borrowings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBorrows.map((record) => (
                <div key={record.id} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Book ID: {record.bookId}</p>
                    <p className="text-xs text-muted-foreground">
                      User ID: {record.userId}
                    </p>
                  </div>
                  <Badge variant={record.status === 'borrowed' ? 'default' : 'secondary'}>
                    {record.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Members */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMembers.map((user) => (
                <div key={user.id} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {user.membershipId}
                    </p>
                  </div>
                  <Badge variant={user.role === 'admin' ? 'destructive' : 'default'}>
                    {user.role}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}