import NewMatterForm from "@/app/components/newMatterForm/newMatterForm";
import PageTitle from "@/app/components/pageTitle/pageTitle";

const NewMatterPage = async () => {
  return (
    <div>
      <PageTitle title="新規案件の作成" />
      <NewMatterForm />
    </div>
  );
};

export default NewMatterPage;
