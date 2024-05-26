import supabase from "./client";
import { createClient } from "./server";

type Props = {
  matter_id: number;
};

export const fetchCostInfoByMatterId = async (props: Props) => {
  const matter_id = props.matter_id;
  console.log(`案件ID：${matter_id}`);
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
