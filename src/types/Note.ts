import Task from '@/types/Task';
export default interface Note {
  id: string,
  title: string,
  created: number,
  tasks: Task[],
}
