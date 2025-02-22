import { useCodeEditor } from "@/components/CodeEditor/useCodeEditor";
import CodeMirror from "@uiw/react-codemirror";

type RequestJSONProps = {
  requestBody?: string;
  setRequestBody: (value: string) => void;
};
const RequestJSON = ({requestBody,setRequestBody}:RequestJSONProps) => {
  const jsonSnippet = `{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "age": 30,
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "zip": "10001"
  },
  "hobbies": ["reading", "gaming", "traveling"]
}
`;

  // const { extensions, theme } = useCodeEditor(
  //   requestBody || jsonSnippet
  // );
  const { extensions, theme } = useCodeEditor();

  return (
    <div
      style={{
        width: "100%",
        borderRadius: "6px",
        background: "rgba(255, 255, 255, 0.1)",
      }}
    >
      <CodeMirror
        value={requestBody}
        height="100%"
        extensions={extensions}
        onChange={(value) => setRequestBody(value)}
        theme={theme}
      />
    </div>
  );
};

export default RequestJSON;
