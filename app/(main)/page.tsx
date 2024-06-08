import { Title } from "@mantine/core";
import { MatterCardsGrid } from "../components/mattercard";
import { fetchMatterInfo } from "../utils/supabase/supabase";

const AllMatterPage = async () => {
  const { matterList, error } = await fetchMatterInfo();

  if (error) {
    console.error(error);
    return <div className="bg-red-600">案件の取得に失敗しました。</div>;
  }

  return (
    <div>
      <Title order={3} size="h1" className="flex justify-center">
        案件一覧
      </Title>
      <MatterCardsGrid matterList={matterList} />
    </div>
  );
};

export default AllMatterPage;
