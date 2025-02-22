import ShowEndpoint from "@/components/ShowEndpoint/ShowEndpoint";

const SomeEndpoint = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const slug = (await params).slug;
    return <ShowEndpoint id={slug} />;
};

export default SomeEndpoint;
