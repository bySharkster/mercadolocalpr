import { EditPostContent } from "../../components/PostContent/EditPostContent";

export default function Page({ params }: { params: { id: number } }) {
  return <EditPostContent id={params.id} />;
}
