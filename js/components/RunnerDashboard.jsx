import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Calendar, Award, TrendingUp, Users, MapPin, Clock, Activity, Star, ChevronRight, Bell, CheckCircle } from 'lucide-react';

// Sample data - would be replaced with actual user data
const personalStats = {
  name: "Alex Runner",
  totalRuns: 24,
  totalDistance: 187.5,
  avgPace: 5.32,
  streak: 8,
  referrals: 5,
  personalBests: {
    "5K": "22:15",
    "10K": "47:32",
    "Half Marathon": "1:52:45"
  },
  recentActivity: [
    { date: "Feb 27", event: "Morning Run", distance: 6.2, pace: 5.4, attendees: 18 },
    { date: "Feb 24", event: "Trail Run", distance: 8.7, pace: 5.8, attendees: 12 },
    { date: "Feb 22", event: "Track Workout", distance: 5.0, pace: 5.1, attendees: 15 },
    { date: "Feb 19", event: "Hill Repeats", distance: 6.5, pace: 5.5, attendees: 10 },
  ],
  progressData: [
    { week: 'Week 1', distance: 22.5, runs: 3 },
    { week: 'Week 2', distance: 28.7, runs: 4 },
    { week: 'Week 3', distance: 21.2, runs: 3 },
    { week: 'Week 4', distance: 32.5, runs: 4 },
    { week: 'Week 5', distance: 35.8, runs: 5 },
    { week: 'Week 6', distance: 38.2, runs: 5 },
    { week: 'Week 7', distance: 42.1, runs: 5 },
  ]
};

// Community leaderboard data
const leaderboardData = {
  topAttendance: [
    { name: "Sarah K.", runs: 32, avatar: "S" },
    { name: "Michael T.", runs: 28, avatar: "M" },
    { name: "Alex Runner", runs: 24, avatar: "A" },
    { name: "Jamie L.", runs: 23, avatar: "J" },
    { name: "Nadia R.", runs: 20, avatar: "N" }
  ],
  longestStreak: [
    { name: "Michael T.", streak: 14, avatar: "M" },
    { name: "Jamie L.", streak: 12, avatar: "J" },
    { name: "Nadia R.", streak: 9, avatar: "N" },
    { name: "Alex Runner", streak: 8, avatar: "A" },
    { name: "Sarah K.", streak: 6, avatar: "S" }
  ],
  mostReferrals: [
    { name: "Nadia R.", referrals: 12, avatar: "N" },
    { name: "Sarah K.", referrals: 8, avatar: "S" },
    { name: "Jamie L.", referrals: 7, avatar: "J" },
    { name: "Alex Runner", referrals: 5, avatar: "A" },
    { name: "Michael T.", referrals: 3, avatar: "M" }
  ],
  fastestPace: [
    { name: "Jamie L.", pace: 4.2, avatar: "J" },
    { name: "Michael T.", pace: 4.5, avatar: "M" },
    { name: "Sarah K.", pace: 4.8, avatar: "S" },
    { name: "Alex Runner", pace: 5.3, avatar: "A" },
    { name: "Nadia R.", pace: 5.5, avatar: "N" }
  ]
};

// Upcoming events data
const upcomingEvents = [
  {
    title: "Saturday Long Run",
    date: "Mar 2, 2025",
    time: "7:30 AM",
    location: "Town Lake Trail",
    distance: "10-16 km",
    description: "Group long run with pacers for various distances. Meet at the trail entrance.",
    attending: 24
  },
  {
    title: "Tuesday Track Workout",
    date: "Mar 4, 2025",
    time: "6:30 PM",
    location: "High School Track",
    distance: "5-8 km",
    description: "Speed work with 400m and 800m repeats. All paces welcome!",
    attending: 18
  },
  {
    title: "Thursday Social Run",
    date: "Mar 6, 2025",
    time: "6:30 PM",
    location: "Downtown Start",
    distance: "5 km",
    description: "Easy pace run followed by happy hour at Local Brewery.",
    attending: 32
  },
  {
    title: "Sunday Trail Adventure",
    date: "Mar 9, 2025",
    time: "8:00 AM",
    location: "Barton Creek Greenbelt",
    distance: "8-12 km",
    description: "Technical trail run with beautiful views. Bring water!",
    attending: 14
  }
];

// Achievement badges
const badges = [
  { name: "10 Runs", icon: "🏃", earned: true },
  { name: "100km Club", icon: "💯", earned: true },
  { name: "5 Referrals", icon: "👥", earned: true },
  { name: "Sub-5 Pace", icon: "⚡", earned: false },
  { name: "10K Finisher", icon: "🎖️", earned: true },
  { name: "Half Marathon", icon: "🥇", earned: true }
];

// Colors for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const RunnerPortal = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">RunClubAgent</h1>
            <p className="text-blue-100">Runner Portal</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-2 rounded-full bg-blue-700 hover:bg-blue-800">
              <Bell size={20} />
            </button>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                {personalStats.name.charAt(0)}
              </div>
              <span className="ml-2 hidden md:inline">{personalStats.name}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white shadow">
        <div className="container mx-auto">
          <nav className="flex overflow-x-auto">
            <button 
              className={`py-4 px-6 font-medium whitespace-nowrap ${activeTab === 'dashboard' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
              onClick={() => setActiveTab('dashboard')}
            >
              Dashboard
            </button>
            <button 
              className={`py-4 px-6 font-medium whitespace-nowrap ${activeTab === 'leaderboards' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
              onClick={() => setActiveTab('leaderboards')}
            >
              Leaderboards
            </button>
            <button 
              className={`py-4 px-6 font-medium whitespace-nowrap ${activeTab === 'events' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
              onClick={() => setActiveTab('events')}
            >
              Upcoming Events
            </button>
            <button 
              className={`py-4 px-6 font-medium whitespace-nowrap ${activeTab === 'achievements' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
              onClick={() => setActiveTab('achievements')}
            >
              Achievements
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow container mx-auto p-4">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Welcome Message */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-6 text-white shadow-lg">
              <h2 className="text-2xl font-bold mb-2">Welcome back, {personalStats.name}!</h2>
              <p>You're on a {personalStats.streak} day streak. Keep up the great work! 🔥</p>
              <div className="mt-4 flex flex-wrap gap-4">
                <button className="bg-white text-blue-600 px-4 py-2 rounded-full font-medium text-sm">View Upcoming Runs</button>
                <button className="bg-blue-700 text-white px-4 py-2 rounded-full font-medium text-sm">Log a Run</button>
              </div>
            </div>
            
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center space-x-2 text-blue-600 mb-2">
                  <TrendingUp size={20} />
                  <h3 className="font-medium">Total Distance</h3>
                </div>
                <p className="text-3xl font-bold">{personalStats.totalDistance} km</p>
                <p className="text-sm text-gray-500">All time</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center space-x-2 text-green-600 mb-2">
                  <Users size={20} />
                  <h3 className="font-medium">Total Runs</h3>
                </div>
                <p className="text-3xl font-bold">{personalStats.totalRuns}</p>
                <p className="text-sm text-gray-500">With the club</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center space-x-2 text-purple-600 mb-2">
                  <Activity size={20} />
                  <h3 className="font-medium">Average Pace</h3>
                </div>
                <p className="text-3xl font-bold">{personalStats.avgPace} min/km</p>
                <p className="text-sm text-gray-500">Last 10 runs</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center space-x-2 text-orange-600 mb-2">
                  <Award size={20} />
                  <h3 className="font-medium">Referrals</h3>
                </div>
                <p className="text-3xl font-bold">{personalStats.referrals}</p>
                <p className="text-sm text-gray-500">New runners brought in</p>
              </div>
            </div>

            {/* Progress Chart */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-medium text-lg mb-4">Your Progress</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={personalStats.progressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis yAxisId="left" orientation="left" stroke="#3b82f6" />
                    <YAxis yAxisId="right" orientation="right" stroke="#10b981" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="distance" stroke="#3b82f6" name="Distance (km)" />
                    <Line yAxisId="right" type="monotone" dataKey="runs" stroke="#10b981" name="Number of Runs" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Personal Bests */}
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-lg">Personal Bests</h3>
                <button className="text-blue-600 text-sm font-medium">View All</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(personalStats.personalBests).map(([distance, time]) => (
                  <div key={distance} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">{distance}</span>
                      <Star size={16} className="text-yellow-400 fill-current" />
                    </div>
                    <p className="text-xl font-bold mt-1">{time}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-medium text-lg mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {personalStats.recentActivity.map((activity, index) => (
                  <div key={index} className="border-b pb-3 last:border-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{activity.event}</h4>
                        <p className="text-sm text-gray-500">{activity.date} • {activity.distance} km • {activity.pace} min/km</p>
                      </div>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {activity.attendees} runners
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'leaderboards' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Community Leaderboards</h2>
            <p className="text-gray-600">See how you stack up against other runners in the community!</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Attendance Leaderboard */}
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-medium text-lg mb-4 flex items-center">
                  <Users className="mr-2 text-blue-600" size={20} />
                  Most Runs Attended
                </h3>
                <div className="space-y-3">
                  {leaderboardData.topAttendance.map((runner, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center text-white font-medium ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-amber-600' : 'bg-blue-500'}`}>
                          {runner.avatar}
                        </div>
                        <div className="ml-3">
                          <p className={`font-medium ${runner.name === personalStats.name ? 'text-blue-600' : ''}`}>{runner.name}</p>
                          <p className="text-xs text-gray-500">{runner.runs} runs</p>
                        </div>
                      </div>
                      <div className="text-lg font-bold">#{index + 1}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Streak Leaderboard */}
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-medium text-lg mb-4 flex items-center">
                  <Activity className="mr-2 text-green-600" size={20} />
                  Longest Streaks
                </h3>
                <div className="space-y-3">
                  {leaderboardData.longestStreak.map((runner, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center text-white font-medium ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-amber-600' : 'bg-blue-500'}`}>
                          {runner.avatar}
                        </div>
                        <div className="ml-3">
                          <p className={`font-medium ${runner.name === personalStats.name ? 'text-blue-600' : ''}`}>{runner.name}</p>
                          <p className="text-xs text-gray-500">{runner.streak} day streak</p>
                        </div>
                      </div>
                      <div className="text-lg font-bold">#{index + 1}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Referrals Leaderboard */}
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-medium text-lg mb-4 flex items-center">
                  <Award className="mr-2 text-purple-600" size={20} />
                  Most Referrals
                </h3>
                <div className="space-y-3">
                  {leaderboardData.mostReferrals.map((runner, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center text-white font-medium ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-amber-600' : 'bg-blue-500'}`}>
                          {runner.avatar}
                        </div>
                        <div className="ml-3">
                          <p className={`font-medium ${runner.name === personalStats.name ? 'text-blue-600' : ''}`}>{runner.name}</p>
                          <p className="text-xs text-gray-500">{runner.referrals} new members</p>
                        </div>
                      </div>
                      <div className="text-lg font-bold">#{index + 1}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Pace Leaderboard */}
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-medium text-lg mb-4 flex items-center">
                  <TrendingUp className="mr-2 text-orange-600" size={20} />
                  Fastest Average Pace
                </h3>
                <div className="space-y-3">
                  {leaderboardData.fastestPace.map((runner, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center text-white font-medium ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-amber-600' : 'bg-blue-500'}`}>
                          {runner.avatar}
                        </div>
                        <div className="ml-3">
                          <p className={`font-medium ${runner.name === personalStats.name ? 'text-blue-600' : ''}`}>{runner.name}</p>
                          <p className="text-xs text-gray-500">{runner.pace} min/km</p>
                        </div>
                      </div>
                      <div className="text-lg font-bold">#{index + 1}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Community Stats */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-medium text-lg mb-4">Community Stats</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col items-center">
                  <div className="text-3xl font-bold text-blue-600">145</div>
                  <p className="text-gray-600">Active Members</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-3xl font-bold text-green-600">1,250+</div>
                  <p className="text-gray-600">Total Runs</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-3xl font-bold text-purple-600">15,800</div>
                  <p className="text-gray-600">Kilometers Logged</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'events' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Upcoming Events</h2>
              <div className="flex space-x-2">
                <button className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md text-sm">This Week</button>
                <button className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md text-sm">All Events</button>
              </div>
            </div>
            
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="mb-4 md:mb-0">
                      <div className="flex items-center mb-2">
                        <Calendar size={16} className="text-blue-600 mr-2" />
                        <span className="text-blue-600 font-medium">{event.date} • {event.time}</span>
                      </div>
                      <h3 className="text-lg font-bold">{event.title}</h3>
                      <div className="flex items-center text-gray-600 mt-1">
                        <MapPin size={14} className="mr-1" />
                        <span className="text-sm">{event.location}</span>
                        <span className="mx-2">•</span>
                        <span className="text-sm">{event.distance}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-center">
                        <div className="text-lg font-bold">{event.attending}</div>
                        <div className="text-xs text-gray-500">Attending</div>
                      </div>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">RSVP</button>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mt-3">{event.description}</p>
                </div>
              ))}
            </div>
            
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 text-white shadow-lg">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-xl font-bold mb-2">Spring Half Marathon Training</h3>
                  <p className="text-indigo-100">12-week program starting March 15th</p>
                  <ul className="mt-3 space-y-1">
                    <li className="flex items-center text-sm">
                      <CheckCircle size={16} className="mr-2" /> Progressive long runs
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle size={16} className="mr-2" /> Speed workouts
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle size={16} className="mr-2" /> Group support
                    </li>
                  </ul>
                </div>
                <button className="bg-white text-indigo-600 px-6 py-3 rounded-full font-medium">Sign Up</button>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'achievements' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Your Achievements</h2>
            <p className="text-gray-600">Track your progress and earn badges as you hit milestones!</p>
            
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-medium text-lg mb-4">Earned Badges</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                {badges.map((badge, index) => (
                  <div key={index} className={`border rounded-lg p-3 flex flex-col items-center justify-center ${badge.earned ? 'bg-white' : 'bg-gray-100 opacity-60'}`}>
                    <div className="text-3xl mb-2">{badge.icon}</div>
                    <div className="text-center">
                      <p className="font-medium text-sm">{badge.name}</p>
                      <p className="text-xs text-gray-500">{badge.earned ? 'Earned' : 'Locked'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-medium text-lg mb-4">Distance Breakdown</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Morning Runs', value: 65 },
                          { name: 'Evening Runs', value: 35 },
                          { name: 'Trail Runs', value: 22 },
                          { name: 'Road Runs', value: 78 },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        label
                      >
                        {[0, 1, 2, 3].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-medium text-lg mb-4">Progress Towards Goals</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">2025 Distance Goal: 1,000 km</span>
                      <span className="text-sm font-medium">18.8%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '18.8%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Run Streak: 30 days</span>
                      <span className="text-sm font-medium">26.7%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '26.7%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Half Marathon: Sub 1:45</span>
                      <span className="text-sm font-medium">85.7%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '85.7%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-lg">Achievement Timeline</h3>
                <button className="text-blue-600 text-sm font-medium">View All</button>
              </div>
              <div className="space-y-4">
                <div className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <Award size={20} />
                    </div>
                    <div className="h-full w-0.5 bg-gray-200 mt-2"></div>
                  </div>
                  <div className="pb-6">
                    <span className="text-sm text-gray-500">Feb 20, 2025</span>
                    <h4 className="font-medium">Completed 100km Total Distance</h4>
                    <p className="text-sm text-gray-600 mt-1">You've run the equivalent of 2.5 marathons!</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <Award size={20} />
                    </div>
                    <div className="h-full w-0.5 bg-gray-200 mt-2"></div>
                  </div>
                  <div className="pb-6">
                    <span className="text-sm text-gray-500">Feb 15, 2025</span>
                    <h4 className="font-medium">New Personal Best: 5K</h4>
                    <p className="text-sm text-gray-600 mt-1">22:15 - Improved by 35 seconds!</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                      <Award size={20} />
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Jan 28, 2025</span>
                    <h4 className="font-medium">Brought 5 New Runners to the Club</h4>
                    <p className="text-sm text-gray-600 mt-1">Thank you for growing our community!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 mt-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold">RunClubAgent</h2>
              <p className="text-sm text-gray-400">Supercharging your run community with AI-powered insights</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">© 2025 RunClubAgent Hackathon Project</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RunnerPortal;