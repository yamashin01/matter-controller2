export type MatterType = {
  billing_amount: number | null;
  classification: string | null;
  completed: boolean;
  created_at: string;
  id: number;
  isFixed: boolean;
  title: string | null;
  user_id: number | null;
};

export type UserType = {
  class: string | null;
  created_at: string;
  id: number;
  name: string | null;
};

export type CostType = {
  created_at: string;
  id: number;
  item: string | null;
  matter_id: number | null;
  name: string | null;
  price: number | null;
};
