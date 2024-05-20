import { createClient } from "@/utils/supabase/server";

const Matter = async () => {
  const supabase = createClient();
  const { data: matters } = await supabase.from("matter").select();

  return <pre>{JSON.stringify(matters, null, 2)}</pre>;
};

export default Matter;
