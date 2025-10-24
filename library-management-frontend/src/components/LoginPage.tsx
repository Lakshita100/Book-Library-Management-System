import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { BookOpen, Users, Shield, Eye, EyeOff, Sparkles } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface LoginPageProps {
  onLogin: (email: string, role: 'admin' | 'user') => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({ 
    name: "", 
    email: "", 
    password: "", 
    confirmPassword: "",
    membershipId: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication logic
    const role = loginData.email.includes('admin') ? 'admin' : 'user';
    onLogin(loginData.email, role);
    
    setIsLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Auto-login after signup
    onLogin(signupData.email, 'user');
    
    setIsLoading(false);
  };

  const generateMembershipId = () => {
    const id = `LIB${Math.floor(Math.random() * 9000) + 1000}`;
    setSignupData(prev => ({ ...prev, membershipId: id }));
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1580699228119-7be487b3137f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWJyYXJ5JTIwYm9va3MlMjBzdHVkeXxlbnwxfHx8fDE3NTg2OTgxMzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Library"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-purple-900/80 to-indigo-900/80"></div>
        
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl">
                <BookOpen className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">EduLibrary</h1>
                <p className="text-blue-100">Digital Learning Hub</p>
              </div>
            </div>
            
            <h2 className="text-4xl font-bold mb-4 leading-tight">
              Welcome to the Future of
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
                Library Management
              </span>
            </h2>
            
            <p className="text-lg text-blue-100 mb-8 leading-relaxed">
              Streamline your library operations with our comprehensive digital platform. 
              Manage books, track borrowings, and engage with your community like never before.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-blue-100">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <span>Smart book catalog management</span>
            </div>
            <div className="flex items-center gap-3 text-blue-100">
              <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
              <span>Real-time borrowing tracking</span>
            </div>
            <div className="flex items-center gap-3 text-blue-100">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Advanced user management</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="w-full max-w-md space-y-6">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-xl">
                <BookOpen className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">EduLibrary</h1>
                <p className="text-sm text-gray-600">Digital Learning Hub</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-yellow-500" />
              <h2 className="text-2xl font-bold text-gray-900">Get Started</h2>
              <Sparkles className="h-5 w-5 text-yellow-500" />
            </div>
            <p className="text-gray-600">Access your digital library experience</p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Sign In
              </TabsTrigger>
              <TabsTrigger value="signup" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Sign Up
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
                <CardHeader className="text-center pb-4">
                  <CardTitle>Welcome Back!</CardTitle>
                  <CardDescription>Sign in to your library account</CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={loginData.email}
                        onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                        className="bg-white/80"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={loginData.password}
                          onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                          className="bg-white/80 pr-10"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-3 pt-2">
                      <div className="grid gap-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Badge variant="outline" className="text-xs">Demo Accounts</Badge>
                        </div>
                        <div className="text-xs text-gray-500 space-y-1">
                          <p>📚 <strong>User:</strong> user@library.com</p>
                          <p>⚡ <strong>Admin:</strong> admin@library.com</p>
                          <p className="text-gray-400">Password: any text</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing In..." : "Sign In"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="signup">
              <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
                <CardHeader className="text-center pb-4">
                  <CardTitle>Join Our Library!</CardTitle>
                  <CardDescription>Create your library member account</CardDescription>
                </CardHeader>
                <form onSubmit={handleSignup}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={signupData.name}
                        onChange={(e) => setSignupData(prev => ({ ...prev, name: e.target.value }))}
                        className="bg-white/80"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email Address</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="Enter your email"
                        value={signupData.email}
                        onChange={(e) => setSignupData(prev => ({ ...prev, email: e.target.value }))}
                        className="bg-white/80"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="membership">Membership ID</Label>
                      <div className="flex gap-2">
                        <Input
                          id="membership"
                          placeholder="Your membership ID"
                          value={signupData.membershipId}
                          onChange={(e) => setSignupData(prev => ({ ...prev, membershipId: e.target.value }))}
                          className="bg-white/80"
                          required
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={generateMembershipId}
                          className="shrink-0"
                        >
                          Generate
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="Create a password"
                        value={signupData.password}
                        onChange={(e) => setSignupData(prev => ({ ...prev, password: e.target.value }))}
                        className="bg-white/80"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="Confirm your password"
                        value={signupData.confirmPassword}
                        onChange={(e) => setSignupData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className="bg-white/80"
                        required
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating Account..." : "Create Account"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}