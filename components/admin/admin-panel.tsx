"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Shield,
  Users,
  BarChart3,
  Server,
  Settings,
  AlertTriangle,
  CheckCircle,
  Clock,
  MoreHorizontal,
  UserCheck,
  UserX,
  Activity,
} from 'lucide-react';
import { format } from 'date-fns';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  status: 'active' | 'inactive' | 'suspended';
  joinDate: string;
  lastActive: string;
  transcriptions: number;
  usage: number; // hours
}

interface SystemMetric {
  name: string;
  value: string;
  change: string;
  status: 'healthy' | 'warning' | 'critical';
  icon: any;
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    status: 'active',
    joinDate: '2024-01-10T00:00:00Z',
    lastActive: '2024-01-15T14:30:00Z',
    transcriptions: 45,
    usage: 23.5,
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@company.com',
    role: 'user',
    status: 'active',
    joinDate: '2024-01-05T00:00:00Z',
    lastActive: '2024-01-15T09:15:00Z',
    transcriptions: 78,
    usage: 45.2,
  },
  {
    id: '3',
    name: 'Mike Chen',
    email: 'mike@startup.io',
    role: 'user',
    status: 'inactive',
    joinDate: '2023-12-20T00:00:00Z',
    lastActive: '2024-01-08T16:45:00Z',
    transcriptions: 12,
    usage: 8.7,
  },
];

const systemMetrics: SystemMetric[] = [
  {
    name: 'API Uptime',
    value: '99.9%',
    change: '+0.1%',
    status: 'healthy',
    icon: CheckCircle,
  },
  {
    name: 'Processing Queue',
    value: '23',
    change: '-12',
    status: 'healthy',
    icon: Clock,
  },
  {
    name: 'Error Rate',
    value: '0.02%',
    change: '-0.01%',
    status: 'healthy',
    icon: AlertTriangle,
  },
  {
    name: 'Active Users',
    value: '1,247',
    change: '+89',
    status: 'healthy',
    icon: Users,
  },
];

export function AdminPanel() {
  const [users, setUsers] = useState(mockUsers);
  const [selectedTab, setSelectedTab] = useState('overview');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-700 dark:text-green-300';
      case 'inactive': return 'bg-gray-500/20 text-gray-700 dark:text-gray-300';
      case 'suspended': return 'bg-red-500/20 text-red-700 dark:text-red-300';
      default: return 'bg-gray-500/20 text-gray-700 dark:text-gray-300';
    }
  };

  const getMetricStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const suspendUser = (id: string) => {
    setUsers(prev => prev.map(user => 
      user.id === id ? { ...user, status: 'suspended' as const } : user
    ));
  };

  const activateUser = (id: string) => {
    setUsers(prev => prev.map(user => 
      user.id === id ? { ...user, status: 'active' as const } : user
    ));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center">
          <Shield className="mr-3 h-8 w-8" />
          Admin Panel
        </h1>
        <p className="text-muted-foreground">
          Manage users, monitor system health, and view analytics.
        </p>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {systemMetrics.map((metric) => (
              <Card key={metric.name}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
                  <metric.icon className={`h-4 w-4 ${getMetricStatusColor(metric.status)}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className={getMetricStatusColor(metric.status)}>
                      {metric.change}
                    </span>{' '}
                    from last hour
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest user actions and system events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { user: 'Sarah Johnson', action: 'Completed transcription', time: '2 minutes ago' },
                    { user: 'John Doe', action: 'Uploaded audio file', time: '5 minutes ago' },
                    { user: 'System', action: 'Daily backup completed', time: '1 hour ago' },
                    { user: 'Mike Chen', action: 'Account suspended', time: '2 hours ago' },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Activity className="h-4 w-4 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.user}</p>
                        <p className="text-xs text-muted-foreground">{activity.action}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
                <CardDescription>Real-time system status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>CPU Usage</span>
                    <span>34%</span>
                  </div>
                  <Progress value={34} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Memory</span>
                    <span>67%</span>
                  </div>
                  <Progress value={67} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Storage</span>
                    <span>45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>API Rate Limit</span>
                    <span>23%</span>
                  </div>
                  <Progress value={23} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                User Management
              </CardTitle>
              <CardDescription>
                Manage user accounts, permissions, and activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead>Usage</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(user.status)} capitalize`}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {format(new Date(user.joinDate), 'MMM dd, yyyy')}
                        </TableCell>
                        <TableCell>
                          {format(new Date(user.lastActive), 'MMM dd, HH:mm')}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{user.transcriptions} transcriptions</div>
                            <div className="text-muted-foreground">{user.usage}h</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {user.status === 'suspended' ? (
                                <DropdownMenuItem onClick={() => activateUser(user.id)}>
                                  <UserCheck className="mr-2 h-4 w-4" />
                                  Activate
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem onClick={() => suspendUser(user.id)}>
                                  <UserX className="mr-2 h-4 w-4" />
                                  Suspend
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem>
                                <Settings className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Total Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">1,247</div>
                <p className="text-sm text-muted-foreground">+89 this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Transcriptions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">8,934</div>
                <p className="text-sm text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">$24,567</div>
                <p className="text-sm text-muted-foreground">+18% from last month</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="mr-2 h-5 w-5" />
                Usage Analytics
              </CardTitle>
              <CardDescription>
                Detailed analytics and usage patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-border rounded-lg">
                <div className="text-center">
                  <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium mb-2">Analytics Dashboard</p>
                  <p className="text-sm text-muted-foreground">
                    Interactive charts and graphs would be displayed here
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Server className="mr-2 h-5 w-5" />
                System Configuration
              </CardTitle>
              <CardDescription>
                System settings and configuration options
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">API Settings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Rate Limit:</span>
                          <span>1000/hour</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Max File Size:</span>
                          <span>100MB</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Supported Formats:</span>
                          <span>MP3, WAV, M4A</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Storage</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Total Storage:</span>
                          <span>2.3TB</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Used:</span>
                          <span>1.1TB (48%)</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Available:</span>
                          <span>1.2TB</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex space-x-2">
                  <Button>Update Settings</Button>
                  <Button variant="outline">Export Logs</Button>
                  <Button variant="outline">Backup Database</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}