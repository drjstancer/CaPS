import {
  ActivityFeed,
  CaseSummary,
  NavItem,
  Profession,
  StatCard,
} from '@/types/dashboard';

import {
  LayoutDashboard,
  FileText,
  Users,
  BarChart3,
  Shield,
  Stethoscope,
} from 'lucide-react';

export const stats: StatCard[] = [
  {
    title: 'Active Cases',
    value: '12',
    sub: '+3 this month',
  },
  {
    title: 'Student Investigations',
    value: '1,284',
    sub: '+18% engagement',
  },
  {
    title: 'Avg Completion Score',
    value: '84%',
    sub: 'Strong performance',
  },
  {
    title: 'Most Difficult Case',
    value: 'Neurology',
    sub: '61% accuracy',
  },
];

export const professions: Profession[] = [
  {
    id: 1,
    name: 'Emergency Medicine',
    cases: 8,
    students: 124,
    growth: '+12%',
  },
  {
    id: 2,
    name: 'Neurology',
    cases: 5,
    students: 77,
    growth: '+8%',
  },
  {
    id: 3,
    name: 'Orthopedic Surgery',
    cases: 6,
    students: 91,
    growth: '+17%',
  },
];

export const activityFeed: ActivityFeed[] = [
  {
    id: 1,
    action: 'New investigation published',
    timestamp: '12 minutes ago',
    user: 'Dr. J Stancer',
  },
  {
    id: 2,
    action: 'Analytics report exported',
    timestamp: '1 hour ago',
    user: 'Faculty Admin',
  },
  {
    id: 3,
    action: 'Student completed Neurology case',
    timestamp: '2 hours ago',
    user: 'Jordan Ellis',
  },
];

export const recentStudents = [
  {
    name: 'Jordan Ellis',
    profession: 'Emergency Medicine',
    score: '91%',
  },
  {
    name: 'Amaya Brooks',
    profession: 'Neurology',
    score: '87%',
  },
  {
    name: 'Marcus Reed',
    profession: 'Orthopedic Surgery',
    score: '94%',
  },
];

export const cases: CaseSummary[] = [
  {
    id: 1,
    title: 'The Collapse on the Court',
    track: 'Emergency Care',
    difficulty: 'Intermediate',
    attempts: 312,
    published: true,
    lastUpdated: '2 hours ago',
  },
  {
    id: 2,
    title: 'The Mysterious Headache',
    track: 'Diagnostics',
    difficulty: 'Beginner',
    attempts: 214,
    published: true,
    lastUpdated: 'Yesterday',
  },
  {
    id: 3,
    title: 'Learning to Walk Again',
    track: 'Rehabilitation',
    difficulty: 'Advanced',
    attempts: 117,
    published: false,
    lastUpdated: '3 days ago',
  },
];

export const navItems: NavItem[] = [
  {
    name: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
  },
  {
    name: 'Cases',
    icon: FileText,
    href: '/dashboard/cases',
  },
  {
    name: 'Professions',
    icon: Stethoscope,
    href: '/dashboard/professions',
  },
  {
    name: 'Students',
    icon: Users,
    href: '/dashboard/students',
  },
  {
    name: 'Analytics',
    icon: BarChart3,
    href: '/dashboard/analytics',
  },
  {
    name: 'Settings',
    icon: Shield,
    href: '/dashboard/settings',
  },
];
