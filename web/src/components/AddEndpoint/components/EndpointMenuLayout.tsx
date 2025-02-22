import cn from "@/lib/utils/cn";
import { MenuType } from "../AddEndpoint";

type Props = {
  menus: Record<MenuType, { title: string; show: boolean }>;
  children: React.ReactNode;
  selectedMenu: MenuType;
  setSelectedMenu: (menu: MenuType) => void;
};
const EndpointMenuLayout = ({
  children,
  selectedMenu,
  setSelectedMenu,
  menus,
}: Props) => {
  const MenuHeading = ({
    children,
    isSelected,
    onClick,
  }: {
    children: React.ReactNode;
    isSelected: boolean;
    onClick: () => void;
  }) => (
    <div
      className="flex-1 bg-white/5 border border-white/5 py-1 text-center rounded-md hover:bg-white/30 transition-all hover:cursor-pointer"
      style={{
        backgroundColor: isSelected
          ? "rgba(255, 255, 255, 0.2)"
          : "rgba(255, 255, 255, 0.05)",
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
  return (
    <div className="flex items-start mt-1 rounded-md h-full flex-col gap-2 w-full p-1">
      <div className="flex flex-row items-center justify-center gap-1 w-full">
        {Object.entries(menus).map(([key, value]) =>
          value.show ? (
            <MenuHeading
              key={key}
              isSelected={selectedMenu === key}
              onClick={() => setSelectedMenu(key as MenuType)}
            >
              {value.title}
            </MenuHeading>
          ) : null
        )}
      </div>
      <div className="flex max-h-full w-full rounded-md px-1 py-2">
        {children}
      </div>
    </div>
  );
};

export default EndpointMenuLayout;
