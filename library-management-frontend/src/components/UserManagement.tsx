import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Search, Plus, Edit, Trash2, UserCheck, UserX } from "lucide-react";
import { mockUsers } from "../data/mockData";
import { User } from "../types/library";

export function UserManagement() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newUserData, setNewUserData] = useState<{
    name: string;
    email: string;
    membershipId: string;
    role: "member" | "admin" | "librarian";
  }>({
    name: "",
    email: "",
    membershipId: "",
    role: "member",
  });

  const filteredUsers = users.filter((user) => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.membershipId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  const handleAddUser = () => {
    const newUser: User = {
      ...newUserData,
      id: Date.now().toString(),
      joinedAt: new Date(),
      isActive: true,
    };
    
    setUsers([...users, newUser]);
    setIsAddDialogOpen(false);
    setNewUserData({ name: "", email: "", membershipId: "", role: "member" });
  };

  const handleEditUser = () => {
    if (selectedUser) {
      const updatedUser = {
        ...selectedUser,
        ...newUserData,
      };
      setUsers(users.map(user => user.id === selectedUser.id ? updatedUser : user));
      setIsEditDialogOpen(false);
      setSelectedUser(null);
      setNewUserData({ name: "", email: "", membershipId: "", role: "member" });
    }
  };

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setNewUserData({
      name: user.name,
      email: user.email,
      membershipId: user.membershipId,
      role: user.role,
    });
    setIsEditDialogOpen(true);
  };

  const toggleUserStatus = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, isActive: !user.isActive }
        : user
    ));
  };

  const deleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const generateMembershipId = () => {
    const prefix = "LIB";
    const number = String(users.length + 1).padStart(3, '0');
    return `${prefix}${number}`;
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin': return 'destructive';
      case 'librarian': return 'default';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2>User Management</h2>
          <p className="text-muted-foreground">
            Manage library members and staff
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={newUserData.name}
                  onChange={(e) => setNewUserData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newUserData.email}
                  onChange={(e) => setNewUserData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter email address"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="membershipId">Membership ID</Label>
                <div className="flex gap-2">
                  <Input
                    id="membershipId"
                    value={newUserData.membershipId}
                    onChange={(e) => setNewUserData(prev => ({ ...prev, membershipId: e.target.value }))}
                    placeholder="Enter membership ID"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setNewUserData(prev => ({ ...prev, membershipId: generateMembershipId() }))}
                  >
                    Generate
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={newUserData.role} onValueChange={(value: "admin" | "librarian" | "member") => 
                  setNewUserData(prev => ({ ...prev, role: value }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="member">Member</SelectItem>
                    <SelectItem value="librarian">Librarian</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleAddUser}
                  disabled={!newUserData.name || !newUserData.email || !newUserData.membershipId}
                >
                  Add User
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
            placeholder="Search by name, email, or membership ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Roles" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="member">Members</SelectItem>
            <SelectItem value="librarian">Librarians</SelectItem>
            <SelectItem value="admin">Admins</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Membership ID</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="font-medium">{user.name}</div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {user.email}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.membershipId}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getRoleBadgeVariant(user.role)}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.isActive ? "default" : "secondary"}>
                      {user.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {user.joinedAt.toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditClick(user)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleUserStatus(user.id)}
                      >
                        {user.isActive ? <UserX className="h-3 w-3" /> : <UserCheck className="h-3 w-3" />}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteUser(user.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No users found.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="editName">Full Name</Label>
              <Input
                id="editName"
                value={newUserData.name}
                onChange={(e) => setNewUserData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="editEmail">Email</Label>
              <Input
                id="editEmail"
                type="email"
                value={newUserData.email}
                onChange={(e) => setNewUserData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="editMembershipId">Membership ID</Label>
              <Input
                id="editMembershipId"
                value={newUserData.membershipId}
                onChange={(e) => setNewUserData(prev => ({ ...prev, membershipId: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="editRole">Role</Label>
              <Select value={newUserData.role} onValueChange={(value: "admin" | "librarian" | "member") => 
                setNewUserData(prev => ({ ...prev, role: value }))
              }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="librarian">Librarian</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditUser}>
                Update User
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}