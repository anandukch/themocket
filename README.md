# Mocket - AI-Powered Mock API Platform

<!-- ![Mocket Logo](https://www.mocket.com/logo.png)   -->
*Mocket: Generate, Test, and Simulate APIs Effortlessly.*

## 🚀 Overview

Mocket is an **AI-powered mock API platform** that helps developers eliminate backend dependencies, accelerate frontend development, and streamline API testing. It allows you to create dynamic APIs, simulate responses, and test different scenarios with ease.

## 🔥 Key Features

- **AI-Generated Mock APIs** – Instantly create realistic API endpoints.
- **Conditional Response Generator** – Set rules for dynamic responses based on request parameters, headers, or body content.
- **Advanced API Testing** – Simulate latency, inject failures, and test stress scenarios.
- **Stateful Mocking (Planned)** – Persist API states across requests.
- **Web Extension for API Interception (Planned)** – Modify API responses directly in the browser.
- **Seamless Integration** – Works with REST, GraphQL, and WebSockets.

## 📌 Installation

### **1. Clone the Repository**

```bash
 git clone https://github.com/anandukch/themocket.git
 cd themocket
```

### **2. Install Dependencies**

```bash
 npm install   # For Node.js users
```

### **3. Run the Development Server**

```bash
 npm run dev   # Starts the mock server
```

## ⚙️ Usage

### **Creating a Mock API**

Define your mock API via the UI or JSON config. Example JSON-based rule:

```json
{
  "endpoint": "/user/:id",
  "method": "GET",
  "responses": [
    {
      "condition": { "param.id": "2" },
      "response": { "name": "John Doe", "age": 30 }
    },
    {
      "default": true,
      "response": { "error": "User not found" }
    }
  ]
}
```

### **Simulating Conditional Responses**

- If `id == 2` → Returns user data.
- If `body.name == "test"` → Returns specific response.
- Else → Returns default response.

### **Testing with Curl**

```bash
curl -X GET "http://localhost:3000/user/2"
```

## 🔧 Configuration

Modify `config.json` to define your own rules and responses.

```json
{
  "server": {
    "port": 3000
  },
  "mockRules": [ ... ]
}
```

## 📖 Documentation

For detailed usage, visit our [official documentation](https://docs.mocket.com).

## 🛠️ Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`feature-xyz`).
3. Commit changes and push.
4. Create a pull request.

## 📝 License

This project is licensed under the MIT License.

## 📬 Contact & Community

<!-- - **Website:** [www.mocket.com](https://www.mocket.com) -->
- **LinkedIn:** [Mocket](https://www.linkedin.com/company/themocket)

---
**Mocket** – Helping developers test APIs faster and smarter! 🚀
