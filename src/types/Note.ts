import Task from '@/types/Task';
export default interface Note {
  title: string,
  created: number,
  tasks: Task[],
}
