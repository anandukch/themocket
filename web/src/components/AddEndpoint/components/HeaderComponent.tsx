import KeyValueEditor from "@/components/CodeEditor/KeyValueEditor";
import { KeyValuePair } from "@/lib/constants/apiRequests.constants";
import React from "react";

export type HeaderProps= {
  keyValues: KeyValuePair[];
  setKeyValues: (keyValues: KeyValuePair[]) => void;
}
const HeaderComponent = (props:HeaderProps) => {
  return (
    <div className="w-full h-[500px] flex justify-center items-start  bg-[#0f0f1f]">
      <KeyValueEditor keyValues={props.keyValues} setKeyValues={props.setKeyValues}/>
    </div>
  );
};

export default HeaderComponent;
