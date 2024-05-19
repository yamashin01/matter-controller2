import { createClient } from "@/utils/supabase/server";

export default async function Matter() {
  const supabase = createClient();
  const { data: matters } = await supabase.from("matter").select();

  return <pre>{JSON.stringify(matters, null, 2)}</pre>;
}
