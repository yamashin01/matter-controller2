"use server";

import { CostType, MatterType } from "@/app/types/types";
import supabase from "./client";
import { createClient } from "./server";

type Props = {
  matter_id: number;
};

export const fetchCostInfoByMatterId = async (props: Props) => {
  const matter_id = props.matter_id;
  const { data: costList, error } = await supabase
    .from("cost")
    .select("*")
    .eq("matter_id", matter_id);

  if (error) {
    console.error(error);
    return error;
  } else {
    return costList;
  }
};

export const fetchMatterInfo = async () => {
  const supabase = createClient();
  const { data: matterList, error } = await supabase
    .from("matter")
    .select("*")
    .order("id");

  return { matterList, error };
};

export const fetchCostInfoById = async (matter_id: number) => {
  const { data: costInfoList, error } = await supabase
    .from("cost")
    .select("*")
    .eq("matter_id", matter_id);

  return { costInfoList, error };
};

export const updateMatterInfo = async (props: MatterType) => {
  const { data: status, error } = await supabase
    .from("matter")
    .update({
      billing_amount: props.billing_amount,
      classification: props.classification,
      isFixed: props.isFixed,
      title: props.title,
    })
    .eq("id", props.id);

  return { status, error };
};

export const updateCostInfo = async (props: CostType) => {
  const { data: status, error } = await supabase
    .from("cost")
    .update({
      name: props.name,
      item: props.item,
      price: props.price,
    })
    .eq("id", props.id);

  return { status, error };
};

export const insertMatterInfo = async (props: MatterType) => {
  const { data, error } = await supabase
    .from("matter")
    .insert([
      {
        title: props.title,
        classification: props.classification,
        billing_amount: props.billing_amount,
        isFixed: props.isFixed,
        completed: false,
        created_at: new Date(),
        user_id: 1,
      },
    ])
    .select("id");

  const newId = data ? data[0].id : null;

  return { newId, error };
};

export const insertCostInfo = async (props: CostType) => {
  const { data, error } = await supabase
    .from("cost")
    .insert([
      {
        name: props.name,
        price: props.price,
        item: props.item,
        matter_id: props.matter_id,
        created_at: new Date(),
      },
    ])
    .select("id");

  return { error };
};

export const deleteMatterInfoInSupabase = async (matterId: number) => {
  const { status } = await supabase.from("matter").delete().eq("id", matterId);

  return { status };
};

export const deleteCostInfoInSupabase = async (costId: number) => {
  const { status } = await supabase.from("cost").delete().eq("id", costId);

  return { status };
};
