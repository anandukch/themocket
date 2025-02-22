import { useState } from "react";
import DropDown from "../Dropdown/DropDown";
import {
  defaultHeader,
  headerDetails,
  // HeaderType,
  KeyValuePair,
} from "@/lib/constants/apiRequests.constants";
import { WasteIcon } from "hugeicons-react";
import { HeaderProps } from "../AddEndpoint/components/HeaderComponent";


const KeyValueEditor = ({keyValues,setKeyValues}:HeaderProps) => {
  // const [keyValues, setKeyValues] = useState<KeyValuePair[]>([
  //   { key: defaultHeader, value: "" },
  // ]);

  const updateKey = (index: number, newKey: string) => {
    const updatedKeyValues = [...keyValues];
    updatedKeyValues[index].key = newKey;
    setKeyValues(updatedKeyValues);

    // addKeyValuePairIfRequired();
  };

  const updateValue = (index: number, newValue: string) => {
    const updatedKeyValues = [...keyValues];
    updatedKeyValues[index].value = newValue;
    setKeyValues(updatedKeyValues);

    // addKeyValuePairIfRequired();
  };

  const addKeyValuePairIfRequired = () => {
    if (
      keyValues.length === 0 ||
      keyValues[keyValues.length - 1].key !== defaultHeader
    ) {
      setKeyValues([...keyValues, { key: defaultHeader, value: "" }]);
    }
  };

  const removeKeyValuePair = (index: number) => {
    setKeyValues(keyValues.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full flex flex-col h-full overflow-y-auto pl-1 pr-2 pb-8">
      {keyValues.map((pair, index) => (
        <div
          key={index}
          className="h-10 flex items-center justify-center space-y-2"
        >
          <div className="w-1/3">
            {/* <DropDown
              height={35}
              listHeight={500}
              items={headerDetails}
              initialOption={pair.key}
              width={200}
              selectedOption={pair.key}
              setSelectedOption={(newKey) =>
                updateKey(index, newKey)
              }
            /> */}
            <input
                    type="text"
                    value={pair.key}
                    onChange={(e) => {
                      const newHeaders = [...keyValues];
                      newHeaders[index].key = e.target.value;
                      setKeyValues(newHeaders);
                    }}
                    placeholder="Header Key"
                    className="flex-1 rounded bg-gray-800 px-3 w-[300px]  h-[35px] text-white"
                  />
          </div>
          <input
            className="w-full flex-1 h-full border  border-white rounded-md px-2 placeholder:text-white/20 focus:outline-none"
            placeholder="Enter value"
            value={pair.value}
            onChange={(e) => updateValue(index, e.target.value)}
          />
          <button
            className="flex items-center justify-center w-8 bg-red-500 text-white h-8 rounded hover:cursor-pointer"
            onClick={() => removeKeyValuePair(index)}
          >
            <WasteIcon size={20} />
          </button>
        </div>
      ))}
      <div>
        <button
          className="px-4 py-2 text-sm mt-4 outline hover:bg-violet-900 hover:outline-violet-700 transition-all border-none focus:outline-violet-900 outline-violet-900 text-white rounded-md hover:cursor-pointer"
          onClick={() =>
            setKeyValues([...keyValues, { key: defaultHeader, value: "" }])
          }
        >
          Add Key-Value Pair
        </button>
      </div>
    </div>
  );
};

export default KeyValueEditor;
