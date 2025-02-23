"use client";
import { getMockEndpoint } from "@/axios";
import ShowEndpoint from "@/components/ShowEndpoint/ShowEndpoint";
import { MockEndpoint } from "@/lib/constants/endpoints.constants";
import { useEffect, useState, use } from "react";

const SomeEndpoint = ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = use(params); // ✅ Unwrapping the Promise using use()

    console.log(slug);

    const [mock, setMock] = useState<MockEndpoint | null>(null);

    useEffect(() => {
        const fetchMockEndpoint = async () => {
            try {
                const data = await getMockEndpoint(slug);
                console.log(data);
                setMock(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchMockEndpoint();
    }, [slug]);

    return <>{mock ? <ShowEndpoint mockEndpoint={mock} /> : <p>Loading...</p>}</>;
};

export default SomeEndpoint;
