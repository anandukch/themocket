import { useState, useCallback } from "react";
import { createTheme } from "@uiw/codemirror-themes";
import { tags as t } from "@lezer/highlight";
import { json } from "@codemirror/lang-json";

export const useCodeEditor = () => {
  // const [value, setValue] = useState(initialValue);

  // const onChange = useCallback((newValue: string) => {
  //   setValue(newValue);
  //   console.log("Updated JSON:", newValue);
  // }, []);

  const myPurpleTheme = createTheme({
    theme: "dark",
    settings: {
      background: "transparent",
      backgroundImage: "",
      foreground: "#D8BFD8",
      caret: "#E0AFFF",
      selection: "#8A2BE250",
      selectionMatch: "#8A2BE250",
      lineHighlight: "#FFFFFF0A",
      gutterBackground: "transparent",
      gutterForeground: "#D8BFD866",
    },
    styles: [
      { tag: t.comment, color: "#A890C8" },
      { tag: t.variableName, color: "#E0AFFF" },
      { tag: [t.string, t.special(t.brace)], color: "#FFB6C1" },
      { tag: t.number, color: "#FF69B4" },
      { tag: t.bool, color: "#DA70D6" },
      { tag: t.null, color: "#BA55D3" },
      { tag: t.keyword, color: "#DDA0DD" },
      { tag: t.operator, color: "#C71585" },
      { tag: t.className, color: "#DB7093" },
      { tag: t.definition(t.typeName), color: "#EE82EE" },
      { tag: t.typeName, color: "#DDA0DD" },
      { tag: t.angleBracket, color: "#FF1493" },
      { tag: t.tagName, color: "#DA70D6" },
      { tag: t.attributeName, color: "#FFB6C1" },
    ],
  });

  return {
    // value,
    // onChange,
    extensions: [json()],
    theme: myPurpleTheme,
  };
};
