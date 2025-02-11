export type Work = {
  id: number;
  title: string;
  description: string;
  status: 'planned' | 'in_progress' | 'done';
  created_by: string;
  created_at: string;
  updated_at: string;
};
