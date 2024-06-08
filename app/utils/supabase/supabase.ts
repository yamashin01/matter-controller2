"use server";

import { MatterType } from "@/app/types/types";
import supabase from "./client";
import { createClient } from "./server";

type Props = {
  matter_id: number;
};

export const fetchCostInfoByMatterId = async (props: Props) => {
  const matter_id = props.matter_id;
  // const supabase = createClient();
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
  const { data: matterList, error } = await supabase.from("matter").select("*");

  return { matterList, error };
};

export const fetchCostInfoById = async (matter_id: number) => {
  const supabase = createClient();
  const { data: costInfoList, error } = await supabase
    .from("cost")
    .select("*")
    .eq("matter_id", matter_id);

  return { costInfoList, error };
};

export const updateMatterInfo = async (props: MatterType) => {
  const { error } = await supabase
    .from("matter")
    .update({
      billing_amount: props.billing_amount,
      classification: props.classification,
      isFixed: props.isFixed,
      title: props.title,
    })
    .eq("id", props.id);

  if (error) {
    console.error(error);
  }
};
