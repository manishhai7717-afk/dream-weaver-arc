import { GraduationCap } from "lucide-react";

const CampusHeader = () => {
  return (
    <header className="bg-gradient-to-r from-campus-blue to-primary text-primary-foreground p-5 rounded-b-2xl shadow-lg">
      <div className="container mx-auto">
        <div className="flex items-center justify-between px-5">
          <div className="flex items-center gap-3">
            <GraduationCap className="h-7 w-7" />
            <h1 className="text-2xl font-semibold">CampusAI Information System</h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CampusHeader;