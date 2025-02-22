export type VerbType = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export type KeyValuePair = {
  key: string;
  value: string;
};

export const verbDetails: Record<
  VerbType,
  { header: string; description: string }
> = {
  GET: {
    header: "GET",
    description: "Fetch data from the server",
  },
  POST: {
    header: "POST",
    description: "Send data to the server",
  },
  PUT: {
    header: "PUT",
    description: "Update data on the server",
  },
  DELETE: {
    header: "DELETE",
    description: "Delete data from the server",
  },
  PATCH: {
    header: "PATCH",
    description: "Update data on the server",
  },
};

// export type HeaderType =
//   | "Authorization"
//   | "Content-Type"
//   | "Accept"
//   | "Cookie"
//   | "Origin"
//   | "Referer"
//   | "Cache-Control"
//   | "User-Agent"
//   | "Host"
//   | "Accept-Encoding";

export const headerDetails: Record<
  string,
  { header: string; description: string }
> = {
  Authorization: {
    header: "Authorization",
    description:
      "Contains credentials to authenticate the client with the server",
  },
  "Content-Type": {
    header: "Content-Type",
    description: "Indicates the media type of the request or response body",
  },
  Accept: {
    header: "Accept",
    description: "Specifies the media types the client expects in the response",
  },
  Cookie: {
    header: "Cookie",
    description: "Sends stored cookies to the server for session management",
  },
  Origin: {
    header: "Origin",
    description: "Indicates the origin of the request for CORS purposes",
  },
  Referer: {
    header: "Referer",
    description:
      "Indicates the previous page that linked to the requested resource",
  },
  "Cache-Control": {
    header: "Cache-Control",
    description: "Specifies caching directives for requests and responses",
  },
  "User-Agent": {
    header: "User-Agent",
    description: "Contains information about the client making the request",
  },
  Host: {
    header: "Host",
    description: "Specifies the domain name of the server being requested",
  },
  "Accept-Encoding": {
    header: "Accept-Encoding",
    description:
      "Indicates the encoding formats the client supports for responses",
  },
};
export const defaultHeader = "Authorization";
