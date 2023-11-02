export interface IPagination extends Record<string, string> {
  page: string;
  limit: string;
}

export interface IPaginated<Entity> {
  data: Entity[];
  total: number;
}
