import { useCodeEditor } from "@/components/CodeEditor/useCodeEditor";
import CodeMirror from "@uiw/react-codemirror";

type ResponseJSONProps = {
  responseBody?: string;
  setResponseBody: (value: string) => void;
};

const ResponseJSON = ({responseBody,setResponseBody}: ResponseJSONProps) => {
  const jsonSnippet = `{
    "status": "success",
    "data": {
      "id": 101,
      "name": "John Doe",
      "email": "johndoe@example.com",
      "age": 30,
      "address": {
        "street": "123 Main St",
        "city": "New York",
        "zip": "10001"
      },
      "hobbies": ["reading", "gaming", "traveling"],
      "createdAt": "2025-02-10T12:00:00Z",
      "updatedAt": "2025-02-10T14:00:00Z"
    }
  }`;

  const {  extensions, theme } = useCodeEditor(
   
  );

  return (
    <div
      style={{
        width: "100%",
        borderRadius: "6px",
        background: "rgba(255, 255, 255, 0.1)",
      }}
    >
      <CodeMirror
        value={responseBody || ""}
        height="100%"
        extensions={extensions}
        onChange={(value) => setResponseBody(value)}
        theme={theme}
      />
    </div>
  );
};

export default ResponseJSON;
