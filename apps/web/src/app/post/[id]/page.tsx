import { PostContent } from "../../components/PostContent/PostContent";

export default function Page({ params }: { params: { id: number } }) {
  return <PostContent id={params.id} />;
}
