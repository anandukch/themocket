import { KeyValuePair } from "./apiRequests.constants";

export type EachEndpoint = {
  id: string;
  method: string;
  description: string;
  url: string;
  headers?: KeyValuePair[]; // Array of key-value pairs for headers
  requestBody?: string; // Optional request body as a string
  responseBody?: string; // Response body as a string
};

export interface MockEndpoint {
  _id: string;
  requestType: string;
  endpoint: string;
  requestHeaders: string;
  requestBody: string;
  responseBody: string;
  createdBy: string;
  projectId: string;
  slugName: string;
  createdAt: string;
  updatedAt: string;
  subDomain: string;
  __v: number;
}

export type Endpoint = {
  data: EachEndpoint[];
};

// Define endpoints with random IDs
export const endpoints: Endpoint = {
  data: [
    {
      id: "ey123req1",
      method: "GET",
      url: "/api/v1/users",
      description: "Fetch all users",
      headers: [
        { key: "Authorization", value: "Bearer <token>" },
        { key: "Content-Type", value: "application/json" },
      ],
      requestBody: "",
      responseBody: `{
          "users": [
            { "id": "1", "name": "John Doe", "email": "john@example.com" },
            { "id": "2", "name": "Jane Doe", "email": "jane@example.com" }
          ]
        }`,
    },
    {
      id: "ey123req2",
      method: "GET",
      url: "/api/v1/user/:id",
      description: "Fetch user by ID",
      headers: [
        { key: "Authorization", value: "Bearer <token>" },
        { key: "Content-Type", value: "application/json" },
      ],
      requestBody: "",
      responseBody: `{
          "id": "1",
          "name": "John Doe",
          "email": "john@example.com"
        }`,
    },
    {
      id: "ey123req3",
      method: "POST",
      url: "/api/v1/user",
      description: "Create a new user",
      headers: [
        { key: "Authorization", value: "Bearer <token>" },
        { key: "Content-Type", value: "application/json" },
      ],
      requestBody: `{
          "name": "John Doe",
          "email": "john@example.com",
          "password": "securepassword"
        }`,
      responseBody: `{
          "id": "1",
          "name": "John Doe",
          "email": "john@example.com"
        }`,
    },
    {
      id: "ey123req4",
      method: "PUT",
      url: "/api/v1/user/:id",
      description: "Update user details",
      headers: [
        { key: "Authorization", value: "Bearer <token>" },
        { key: "Content-Type", value: "application/json" },
      ],
      requestBody: `{
          "name": "John Doe Updated",
          "email": "john.updated@example.com"
        }`,
      responseBody: `{
          "id": "1",
          "name": "John Doe Updated",
          "email": "john.updated@example.com"
        }`,
    },
    {
      id: "ey123req5",
      method: "DELETE",
      url: "/api/v1/user/:id",
      description: "Delete a user",
      headers: [{ key: "Authorization", value: "Bearer <token>" }],
      requestBody: "",
      responseBody: `{
          "message": "User deleted successfully"
        }`,
    },
    {
      id: "ey123req6",
      method: "GET",
      url: "/api/v1/products",
      description: "List all products",
      headers: [
        { key: "Authorization", value: "Bearer <token>" },
        { key: "Content-Type", value: "application/json" },
      ],
      requestBody: "",
      responseBody: `{
            "products": [
              { "id": "101", "name": "Laptop", "price": 999.99, "stock": 50 },
              { "id": "102", "name": "Smartphone", "price": 699.99, "stock": 30 }
            ]
          }`,
    },
    {
      id: "ey123req7",
      method: "GET",
      url: "/api/v1/products/:id",
      description: "Fetch product details",
      headers: [
        { key: "Authorization", value: "Bearer <token>" },
        { key: "Content-Type", value: "application/json" },
      ],
      requestBody: "",
      responseBody: `{
            "id": "101",
            "name": "Laptop",
            "description": "A powerful laptop with 16GB RAM",
            "price": 999.99,
            "stock": 50
          }`,
    },
    {
      id: "ey123req8",
      method: "POST",
      url: "/api/v1/products",
      description: "Create a new product",
      headers: [
        { key: "Authorization", value: "Bearer <token>" },
        { key: "Content-Type", value: "application/json" },
      ],
      requestBody: `{
            "name": "Smartwatch",
            "description": "A stylish smartwatch with health tracking",
            "price": 199.99,
            "stock": 100
          }`,
      responseBody: `{
            "id": "103",
            "name": "Smartwatch",
            "description": "A stylish smartwatch with health tracking",
            "price": 199.99,
            "stock": 100
          }`,
    },
    {
      id: "ey123req9",
      method: "PATCH",
      url: "/api/v1/products/:id",
      description: "Update product stock",
      headers: [
        { key: "Authorization", value: "Bearer <token>" },
        { key: "Content-Type", value: "application/json" },
      ],
      requestBody: `{
            "stock": 80
          }`,
      responseBody: `{
            "id": "101",
            "name": "Laptop",
            "stock": 80
          }`,
    },
    {
      id: "ey123req10",
      method: "DELETE",
      url: "/api/v1/products/:id",
      description: "Remove a product",
      headers: [{ key: "Authorization", value: "Bearer <token>" }],
      requestBody: "",
      responseBody: `{
            "message": "Product removed successfully"
          }`,
    },
    {
      id: "ey123req11",
      method: "GET",
      url: "/api/v1/orders",
      description: "Fetch order details",
      headers: [
        { key: "Authorization", value: "Bearer <token>" },
        { key: "Content-Type", value: "application/json" },
      ],
      requestBody: "",
      responseBody: `{
          "orders": [
            { "id": "5001", "user": "John Doe", "total": 149.99, "status": "Processing" },
            { "id": "5002", "user": "Jane Doe", "total": 299.99, "status": "Shipped" }
          ]
        }`,
    },
    {
      id: "ey123req12",
      method: "POST",
      url: "/api/v1/orders",
      description: "Create a new order",
      headers: [
        { key: "Authorization", value: "Bearer <token>" },
        { key: "Content-Type", value: "application/json" },
      ],
      requestBody: `{
          "user": "John Doe",
          "items": [
            { "productId": "101", "quantity": 1 },
            { "productId": "102", "quantity": 2 }
          ],
          "total": 249.99
        }`,
      responseBody: `{
          "id": "5003",
          "user": "John Doe",
          "total": 249.99,
          "status": "Pending"
        }`,
    },
    {
      id: "ey123req13",
      method: "PUT",
      url: "/api/v1/orders/:id",
      description: "Update order status",
      headers: [
        { key: "Authorization", value: "Bearer <token>" },
        { key: "Content-Type", value: "application/json" },
      ],
      requestBody: `{
          "status": "Shipped"
        }`,
      responseBody: `{
          "id": "5001",
          "user": "John Doe",
          "total": 149.99,
          "status": "Shipped"
        }`,
    },
    {
      id: "ey123req14",
      method: "DELETE",
      url: "/api/v1/orders/:id",
      description: "Cancel an order",
      headers: [{ key: "Authorization", value: "Bearer <token>" }],
      requestBody: "",
      responseBody: `{
          "message": "Order canceled successfully"
        }`,
    },
    {
      id: "ey123req15",
      method: "GET",
      url: "/api/v1/health",
      description: "Fetch API health status",
      headers: [{ key: "Content-Type", value: "application/json" }],
      requestBody: "",
      responseBody: `{
          "status": "OK",
          "uptime": 86400,
          "version": "1.0.0"
        }`,
    },
  ],
};

export const getEndpointById = function (id: string) {
  return endpoints.data.filter((endpoint) => endpoint.id === id)[0] || null;
};

export const defaultEndpointMenu = {
  request: { title: "Request", show: true },
  header: { title: "Header", show: true },
  response: { title: "Response", show: true },
};
