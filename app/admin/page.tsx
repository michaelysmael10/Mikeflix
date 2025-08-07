'use client';

import { useState } from 'react';
import { Upload, Plus, Edit, Trash2, Users, BarChart3, Settings } from 'lucide-react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('content');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    title: '',
    description: '',
    category: '',
    language: 'en',
    thumbnail: '',
    videoUrl: '',
  });

  const tabs = [
    { id: 'content', name: 'Content Management', icon: Upload },
    { id: 'users', name: 'User Management', icon: Users },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  const mockContent = [
    {
      id: 1,
      title: 'Stranger Things',
      category: 'series',
      language: 'en',
      status: 'published',
      views: '1.2M',
      createdAt: '2024-01-15',
    },
    {
      id: 2,
      title: 'The Dark Knight',
      category: 'movie',
      language: 'en',
      status: 'published',
      views: '890K',
      createdAt: '2024-01-10',
    },
  ];

  const mockUsers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      subscription: 'premium',
      status: 'active',
      joinDate: '2024-01-01',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      subscription: 'free',
      status: 'active',
      joinDate: '2024-01-05',
    },
  ];

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Content uploaded successfully!');
    setIsUploadOpen(false);
    setUploadForm({
      title: '',
      description: '',
      category: '',
      language: 'en',
      thumbnail: '',
      videoUrl: '',
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setUploadForm(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const renderContentManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Content Management</h2>
        <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
          <DialogTrigger asChild>
            <Button className="netflix-gradient">
              <Plus className="mr-2 h-4 w-4" />
              Add Content
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl bg-gray-900 border-gray-800">
            <DialogHeader>
              <DialogTitle className="text-white">Upload New Content</DialogTitle>
              <DialogDescription className="text-gray-400">
                Add a new movie or series to the platform using Cloudinary
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleUpload} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-white">Title</Label>
                  <Input
                    id="title"
                    value={uploadForm.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-white">Category</Label>
                  <Select value={uploadForm.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="movie">Movie</SelectItem>
                      <SelectItem value="series">Series</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description" className="text-white">Description</Label>
                <Textarea
                  id="description"
                  value={uploadForm.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                  rows={3}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="language" className="text-white">Caption Language</Label>
                  <Select value={uploadForm.language} onValueChange={(value) => handleInputChange('language', value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="tl">Filipino</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="thumbnail" className="text-white">Thumbnail URL (Cloudinary)</Label>
                  <Input
                    id="thumbnail"
                    value={uploadForm.thumbnail}
                    onChange={(e) => handleInputChange('thumbnail', e.target.value)}
                    placeholder="https://res.cloudinary.com/..."
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="videoUrl" className="text-white">Video URL (Cloudinary)</Label>
                <Input
                  id="videoUrl"
                  value={uploadForm.videoUrl}
                  onChange={(e) => handleInputChange('videoUrl', e.target.value)}
                  placeholder="https://res.cloudinary.com/..."
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" type="button" onClick={() => setIsUploadOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="netflix-gradient">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Content
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-800">
                <TableHead className="text-gray-400">Title</TableHead>
                <TableHead className="text-gray-400">Category</TableHead>
                <TableHead className="text-gray-400">Language</TableHead>
                <TableHead className="text-gray-400">Status</TableHead>
                <TableHead className="text-gray-400">Views</TableHead>
                <TableHead className="text-gray-400">Created</TableHead>
                <TableHead className="text-gray-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockContent.map((content) => (
                <TableRow key={content.id} className="border-gray-800">
                  <TableCell className="text-white font-medium">{content.title}</TableCell>
                  <TableCell>
                    <Badge variant={content.category === 'movie' ? 'default' : 'secondary'}>
                      {content.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-300">{content.language.toUpperCase()}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-green-400 border-green-400">
                      {content.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-300">{content.views}</TableCell>
                  <TableCell className="text-gray-300">{content.createdAt}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="ghost">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  const renderUserManagement = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">User Management</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardDescription className="text-gray-400">Total Users</CardDescription>
            <CardTitle className="text-2xl text-white">12,456</CardTitle>
          </CardHeader>
        </Card>
        
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardDescription className="text-gray-400">Premium Users</CardDescription>
            <CardTitle className="text-2xl text-white">8,234</CardTitle>
          </CardHeader>
        </Card>
        
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardDescription className="text-gray-400">Free Users</CardDescription>
            <CardTitle className="text-2xl text-white">4,222</CardTitle>
          </CardHeader>
        </Card>
      </div>
      
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-800">
                <TableHead className="text-gray-400">Name</TableHead>
                <TableHead className="text-gray-400">Email</TableHead>
                <TableHead className="text-gray-400">Subscription</TableHead>
                <TableHead className="text-gray-400">Status</TableHead>
                <TableHead className="text-gray-400">Joined</TableHead>
                <TableHead className="text-gray-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockUsers.map((user) => (
                <TableRow key={user.id} className="border-gray-800">
                  <TableCell className="text-white font-medium">{user.name}</TableCell>
                  <TableCell className="text-gray-300">{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.subscription === 'premium' ? 'default' : 'secondary'}>
                      {user.subscription}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-green-400 border-green-400">
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-300">{user.joinDate}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="ghost">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Analytics Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardDescription className="text-gray-400">Total Views</CardDescription>
            <CardTitle className="text-2xl text-white">2.4M</CardTitle>
          </CardHeader>
        </Card>
        
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardDescription className="text-gray-400">Revenue</CardDescription>
            <CardTitle className="text-2xl text-white">₱1.2M</CardTitle>
          </CardHeader>
        </Card>
        
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardDescription className="text-gray-400">Watch Time</CardDescription>
            <CardTitle className="text-2xl text-white">145K hrs</CardTitle>
          </CardHeader>
        </Card>
        
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardDescription className="text-gray-400">Active Users</CardDescription>
            <CardTitle className="text-2xl text-white">8,456</CardTitle>
          </CardHeader>
        </Card>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Platform Settings</h2>
      
      <div className="grid gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Cloudinary Configuration</CardTitle>
            <CardDescription className="text-gray-400">
              Configure your Cloudinary settings for video storage
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white">Cloud Name</Label>
                <Input className="bg-gray-800 border-gray-700 text-white" placeholder="your-cloud-name" />
              </div>
              <div className="space-y-2">
                <Label className="text-white">API Key</Label>
                <Input className="bg-gray-800 border-gray-700 text-white" placeholder="your-api-key" />
              </div>
            </div>
            <Button className="netflix-gradient">Update Settings</Button>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Payment Configuration</CardTitle>
            <CardDescription className="text-gray-400">
              Configure GCash and Bank Transfer settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white">GCash Merchant ID</Label>
                <Input className="bg-gray-800 border-gray-700 text-white" placeholder="merchant-id" />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Bank Account Number</Label>
                <Input className="bg-gray-800 border-gray-700 text-white" placeholder="account-number" />
              </div>
            </div>
            <Button className="netflix-gradient">Update Payment Settings</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'content':
        return renderContentManagement();
      case 'users':
        return renderUserManagement();
      case 'analytics':
        return renderAnalytics();
      case 'settings':
        return renderSettings();
      default:
        return renderContentManagement();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
            <p className="text-gray-400">Manage your streaming platform</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-64">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-red-600 text-white'
                          : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{tab.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {renderContent()}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}