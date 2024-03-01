// import { PostContent } from "../../components/PostContent/PostContent";

export default function Page({ params }: { params: { id: number } }): JSX.Element {
    return (
    <>
        <h1>User Post {params.id}</h1>
    {/* <PostContent id={params.id} /> */}
    </>
    );
}
