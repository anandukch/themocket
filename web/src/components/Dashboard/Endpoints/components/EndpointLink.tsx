import { EachEndpoint, MockEndpoint } from "@/lib/constants/endpoints.constants";

const methodHighlighting: Record<string, string> = {
  GET: "text-blue-400", // Blue for GET
  POST: "text-green-400", // Green for POST
  PUT: "text-yellow-400", // Yellow for PUT
  DELETE: "text-red-400", // Red for DELETE
  PATCH: "text-purple-400", // Purple for PATCH
  HEAD: "text-gray-400", // Gray for HEAD
  OPTIONS: "text-orange-400", // Orange for OPTIONS
  CONNECT: "text-pink-400", // Pink for CONNECT
  TRACE: "text-teal-400", // Teal for TRACE
};

const EndpointLink = ({ _id:id, requestType :method,endpoint }: MockEndpoint) => (
  <a
    href={`/dashboard/endpoints/${id}`}
    className="transition-all flex flex-row items-center justify-between px-3 h-[40px] min-h-[40px] hover:bg-purple-950 border border-purple-950 rounded-md"
  >
    <div
      className={`text-xs uppercase ${
        methodHighlighting[method] || "text-white"
      }`}
    >
      {method}
    </div>
    <div className="text-xs">{endpoint}</div>
  </a>
);

export default EndpointLink;
