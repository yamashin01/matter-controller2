import { MatterCardsGrid } from "../components/mattercard";
import PageTitle from "../components/pageTitle/pageTitle";
import { fetchMatterInfo } from "../utils/supabase/supabase";

const AllMatterPage = async () => {
  const { matterList, error } = await fetchMatterInfo();

  if (error) {
    console.error(error);
    return <div className="bg-red-600">案件の取得に失敗しました。</div>;
  }

  return (
    <div>
      <PageTitle title="案件一覧" />
      <MatterCardsGrid matterList={matterList} />
    </div>
  );
};

export default AllMatterPage;
