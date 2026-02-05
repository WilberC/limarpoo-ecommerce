export interface Category {
  id: string;
  name: string;
  parent_id?: string | null;
  parent?: Category;
  children?: Category[];
}
