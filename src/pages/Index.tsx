import { useState } from "react";
import CampusHeader from "@/components/CampusHeader";
import NavigationTabs from "@/components/NavigationTabs";
import InfoPanel from "@/components/InfoPanel";
import ChatContainer from "@/components/ChatContainer";
import CalendarModal from "@/components/CalendarModal";
import MapModal from "@/components/MapModal";
import FAQModal from "@/components/FAQModal";
import ContactModal from "@/components/ContactModal";

const Index = () => {
  const [activeTab, setActiveTab] = useState("academics");
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const handleActionClick = (action: string) => {
    setActiveModal(action);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <CampusHeader />
      
      <div className="container mx-auto p-5 max-w-6xl">
        <NavigationTabs 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
        />
        
        <div className="flex flex-col lg:flex-row gap-5">
          <InfoPanel 
            activeTab={activeTab} 
            onActionClick={handleActionClick}
          />
          <ChatContainer />
        </div>
        
        <footer className="text-center mt-8 text-sm text-muted-foreground">
          © 2023 CampusAI Information System | Designed for Student Success
        </footer>
      </div>

      <CalendarModal 
        isOpen={activeModal === "calendar"} 
        onClose={closeModal} 
      />
      <MapModal 
        isOpen={activeModal === "map"} 
        onClose={closeModal} 
      />
      <FAQModal 
        isOpen={activeModal === "faq"} 
        onClose={closeModal} 
      />
      <ContactModal 
        isOpen={activeModal === "contact"} 
        onClose={closeModal} 
      />
    </div>
  );
};

export default Index;
