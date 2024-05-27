import { createClient } from "@/app/utils/supabase/server";
import { Title } from "@mantine/core";
import { MatterCardsGrid } from "../components/mattercard";

const Matter = async () => {
  const supabase = createClient();
  const { data: matterList, error } = await supabase.from("matter").select("*");
  const { data: costList } = await supabase.from("cost").select("*");

  if (error) {
    console.error(error);
    return <div className="bg-red-600">案件の取得に失敗しました。</div>;
  }

  return (
    <div>
      <Title order={3} size="h1" className="flex justify-center">
        未完了の案件
      </Title>
      <MatterCardsGrid matterList={matterList} costList={costList} />
    </div>
  );
};

export default Matter;
