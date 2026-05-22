export type StatCard = {
  title: string;
  value: string;
  sub: string;
};

export type Profession = {
  id: number;
  name: string;
  cases: number;
  students: number;
  growth: string;
};

export type ActivityFeed = {
  id: number;
  action: string;
  timestamp: string;
  user: string;
};

export type CaseSummary = {
  id: number;
  title: string;
  track: string;
  difficulty: string;
  attempts: number;
  published: boolean;
  lastUpdated: string;
};

export type NavItem = {
  name: string;
  icon: any;
  href: string;
};
