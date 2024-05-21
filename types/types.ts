export type MatterType = {
  id: string;
  created_at: string;
  title: string;
  classification: string;
  billing_amount: number;
  completed: boolean;
  user_id: string;
};

export type UserType = {
  id: string;
  created_at: string;
  name: string;
  class: string;
};

export type CostType = {
  id: string;
  created_at: string;
  name: string;
  price: number;
  item: string;
  matter_id: string;
};
