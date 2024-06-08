import PageTitle from "@/app/components/pageTitle/pageTitle";
import { MatterCardsGrid } from "../../components/mattercard";
import { fetchMatterInfo } from "../../utils/supabase/supabase";

const CompletedPage = async () => {
  const { matterList, error } = await fetchMatterInfo();

  if (error) {
    console.error(error);
    return <div className="bg-red-600">案件の取得に失敗しました。</div>;
  }

  return (
    <div>
      <PageTitle title="完了した案件" />
      <MatterCardsGrid matterList={matterList} />
    </div>
  );
};

export default CompletedPage;
