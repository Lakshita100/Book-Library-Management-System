import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { BookOpen, Users, BarChart3, BookCopy, LogOut, Settings, Bell } from 'lucide-react';
import { Dashboard } from './Dashboard';
import { BookCatalog } from './BookCatalog';
import { BorrowingManagement } from './BorrowingManagement';
import { UserManagement } from './UserManagement';

interface AdminDashboardProps {
  userEmail: string;
  onLogout: () => void;
}

export function AdminDashboard({ userEmail, onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const userName = userEmail.split('@')[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Enhanced Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 text-white rounded-xl shadow-lg">
                <BookOpen className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  EduLibrary
                </h1>
                <p className="text-sm text-gray-600">Administrative Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </Button>
              
              <div className="flex items-center gap-3">
                <Avatar className="border-2 border-white shadow-sm">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                    {userName.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 capitalize">{userName}</p>
                  <Badge variant="destructive" className="text-xs">Administrator</Badge>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
                <Button variant="outline" onClick={onLogout} className="text-sm">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-4">
            <BarChart3 className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Admin Control Center</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Library Management Hub</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive tools to manage your library's books, users, and operations efficiently.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          {/* Enhanced Tab Navigation */}
          <div className="flex justify-center">
            <TabsList className="grid grid-cols-4 bg-white/70 backdrop-blur-sm p-1 shadow-lg rounded-2xl border-0">
              <TabsTrigger 
                value="dashboard" 
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-xl transition-all duration-300"
              >
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Analytics</span>
              </TabsTrigger>
              <TabsTrigger 
                value="books" 
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-xl transition-all duration-300"
              >
                <BookCopy className="h-4 w-4" />
                <span className="hidden sm:inline">Books</span>
              </TabsTrigger>
              <TabsTrigger 
                value="borrowing" 
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-xl transition-all duration-300"
              >
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Loans</span>
              </TabsTrigger>
              <TabsTrigger 
                value="users" 
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-xl transition-all duration-300"
              >
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Users</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Tab Content with Enhanced Styling */}
          <div className="space-y-6">
            <TabsContent value="dashboard" className="space-y-6">
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl">
                <CardContent className="p-6">
                  <Dashboard />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="books" className="space-y-6">
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl">
                <CardContent className="p-6">
                  <BookCatalog />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="borrowing" className="space-y-6">
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl">
                <CardContent className="p-6">
                  <BorrowingManagement />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl">
                <CardContent className="p-6">
                  <UserManagement />
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}