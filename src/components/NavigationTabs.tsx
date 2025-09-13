import { cn } from "@/lib/utils";

interface NavigationTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "academics", label: "Academic Schedule" },
  { id: "facilities", label: "Facilities" },
  { id: "events", label: "Campus Events" },
  { id: "dining", label: "Dining Services" },
  { id: "library", label: "Library Resources" },
];

const NavigationTabs = ({ activeTab, onTabChange }: NavigationTabsProps) => {
  return (
    <div className="flex bg-card rounded-full p-1.5 my-5 shadow-md flex-wrap gap-1 md:gap-0">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "px-4 py-2.5 rounded-full cursor-pointer transition-all duration-300 text-center flex-1 text-sm md:text-base",
            activeTab === tab.id
              ? "bg-primary text-primary-foreground shadow-sm"
              : "hover:bg-accent text-foreground"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default NavigationTabs;