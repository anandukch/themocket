"use client";

import cn from "@/lib/utils/cn";
import { ArrowUp01Icon } from "hugeicons-react";
import { useState } from "react";

type ItemType = {
  header: string;
  description: string;
};

type Props = {
  /**
   * The items to display in the dropdown, with a key and corresponding header/description.
   */
  items: Record<string, ItemType>;
  /**
   * The width of the dropdown in pixels.
   */
  width: number;
  /**
   * The height of the dropdown in pixels.
   */
  height?: number;
  /**
   * The height of the dropdown list in pixels.
   */
  listHeight?: number;
  /**
   * The currently selected option's key (for controlled mode).
   */
  selectedOption?: string;
  /**
   * A callback to update the selected option's key (for controlled mode).
   */
  setSelectedOption?: (key: string) => void;
  /**
   * A callback to notify the parent when an option is selected (fires in both controlled and uncontrolled modes).
   */
  onSelect?: (selectedOption: { key: string; value: ItemType }) => void;
  /**
   * The initial selected option
   */
  initialOption: string;
};

/**
 * A flexible dropdown component supporting controlled and uncontrolled usage.
 */
const DropDown = ({
  items,
  height = 35,
  listHeight = 200,
  width,
  selectedOption,
  setSelectedOption,
  onSelect,
  initialOption,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  // Uncontrolled internal state
  const [internalSelectedKey, setInternalSelectedKey] = useState<string>(
    initialOption || Object.keys(items)[0]
  );

  // Determine if the component is controlled
  const isControlled =
    selectedOption !== undefined && setSelectedOption !== undefined;

  // Determine the currently selected key
  const currentSelectedKey = isControlled
    ? selectedOption
    : internalSelectedKey;

  // Handle option selection
  const handleSelect = (key: string) => {
    if (!isOpen) return;

    if (isControlled) {
      setSelectedOption(key);
    } else {
      setInternalSelectedKey(key);
      onSelect?.({ key, value: items[key] }); // Notify parent
    }
    setIsOpen(false);
  };

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const widthClass = `w-[${width}px] min-w-[${width}px]`;

  return (
    <div className={`relative h-[${height}px] w-full`}>
      <div
        className={cn(
          "flex cursor-pointer bg-white/10 flex-row items-center justify-center gap-[2px]",
          widthClass
        )}
        onClick={toggleDropdown}
      >
        <div className="custom_btn flex-1 rounded-md border-shade px-2 text-sm">
          {items[currentSelectedKey]?.header}
        </div>
        <div
          className={`custom_btn dropdownArrow bg-white/5 backdrop-blur-lg flex h-[${height}px] w-[45px] flex-row items-center justify-center rounded-md border-shade`}
        >
          <ArrowUp01Icon data-show={isOpen} />
        </div>
      </div>

      {isOpen && (
        <div
          className={cn(
            `dropdown absolute top-[40px] z-20 flex max-h-[500px] min-h-[${height}px] max-h-[${listHeight}px] h-[${listHeight}px] w-full flex-col gap-1 overflow-auto rounded-md border-shade bg-shade px-1`,
            widthClass
          )}
        >
          {Object.entries(items).map(([key, { header, description }]) => (
            <div
              key={key}
              data-show={isOpen}
              className="custom_btn bg-white/5 backdrop-blur-lg hover:bg-white/10 transition-all flex w-full cursor-pointer flex-col items-start justify-start rounded-md border-shade px-2 py-2"
              onClick={() => handleSelect(key)}
            >
              <h1 className="text-base font-semibold leading-tight">
                {header}
              </h1>
              <p className="text-xs opacity-70 leading-none pt-1">
                {description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDown;

// Usage in Parent Component
// <DropDown
// items={roleDetails}
// width={300}
// selectedOption={selectedRole} // Controlled mode
// setSelectedOption={setSelectedRole}
// />
//

// const handleSelectionChange = (selectedOption: { key: string; value: { header: string; description: string } }) => {
//   console.log("Selected option:", selectedOption);
// };
// <DropDown
//  items={roleDetails}
//  width={300}
//  onSelect={handleSelectionChange} // Callback for any selection
//  /> {/* Uncontrolled mode */}
