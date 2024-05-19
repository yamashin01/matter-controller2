export type Matter = {
  id: string;
  created_at: string;
  title: string;
  classification: string;
  billing_amount: number;
  user_id: string;
};

export type User = {
  id: string;
  created_at: string;
  name: string;
  class: string;
};

export type Cost = {
  id: string;
  created_at: string;
  name: string;
  price: number;
  item: string;
  matter_id: string;
};
