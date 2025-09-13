import { Calendar, MapPin, HelpCircle, Phone } from "lucide-react";

interface InfoPanelProps {
  activeTab: string;
  onActionClick: (action: string) => void;
}

const InfoPanel = ({ activeTab, onActionClick }: InfoPanelProps) => {
  const contentMap = {
    academics: {
      title: "Academic Schedule",
      cards: [
        {
          title: "Fall Semester 2023",
          items: [
            "Classes Begin: August 28, 2023",
            "Midterm Exams: October 16-20, 2023",
            "Thanksgiving Break: November 22-26, 2023",
            "Final Exams: December 11-15, 2023"
          ]
        },
        {
          title: "Spring Semester 2024",
          items: [
            "Classes Begin: January 16, 2024",
            "Spring Break: March 11-15, 2024",
            "Midterm Exams: March 18-22, 2024",
            "Final Exams: May 6-10, 2024"
          ]
        }
      ]
    },
    facilities: {
      title: "Facilities & Hours",
      cards: [
        {
          title: "Student Recreation Center",
          items: [
            "Monday-Friday: 6:00 AM - 10:00 PM",
            "Saturday: 8:00 AM - 8:00 PM",
            "Sunday: 10:00 AM - 6:00 PM"
          ]
        },
        {
          title: "Campus Library",
          items: [
            "Monday-Thursday: 8:00 AM - 10:00 PM",
            "Friday: 8:00 AM - 6:00 PM",
            "Saturday: 10:00 AM - 6:00 PM",
            "Sunday: 12:00 PM - 8:00 PM"
          ]
        }
      ]
    },
    events: {
      title: "Campus Events",
      cards: [
        {
          title: "Welcome Back Festival",
          items: [
            "Date: September 5, 2023",
            "Time: 4:00 PM - 8:00 PM",
            "Location: Main Quadrangle"
          ]
        },
        {
          title: "Career Fair 2023",
          items: [
            "Date: October 12, 2023",
            "Time: 10:00 AM - 3:00 PM",
            "Location: University Conference Center"
          ]
        }
      ]
    },
    dining: {
      title: "Dining Services",
      cards: [
        {
          title: "Main Dining Hall",
          items: [
            "Breakfast: 7:00 AM - 10:00 AM",
            "Lunch: 11:30 AM - 2:00 PM",
            "Dinner: 5:00 PM - 8:00 PM"
          ]
        },
        {
          title: "Campus Café",
          items: [
            "Monday-Friday: 8:00 AM - 8:00 PM",
            "Weekends: 10:00 AM - 4:00 PM"
          ]
        }
      ]
    },
    library: {
      title: "Library Resources",
      cards: [
        {
          title: "Study Rooms",
          items: [
            "Available for group study",
            "Reserve online or at front desk",
            "Maximum 4 hours per session"
          ]
        },
        {
          title: "Online Resources",
          items: [
            "Access to 50+ academic databases",
            "E-books and online journals",
            "24/7 remote access for students"
          ]
        }
      ]
    }
  };

  const content = contentMap[activeTab as keyof typeof contentMap];

  const quickActions = [
    { id: "calendar", icon: Calendar, label: "View Full Calendar" },
    { id: "map", icon: MapPin, label: "Campus Map" },
    { id: "faq", icon: HelpCircle, label: "FAQs" },
    { id: "contact", icon: Phone, label: "Contact Support" },
  ];

  return (
    <div className="flex-1 bg-card rounded-2xl p-5 shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-card-foreground">{content.title}</h2>
      
      <div className="space-y-4 mb-6">
        {content.cards.map((card, index) => (
          <div key={index} className="bg-muted rounded-xl p-4 border-l-4 border-primary">
            <h3 className="text-primary font-semibold mb-2">{card.title}</h3>
            <div className="space-y-1">
              {card.items.map((item, itemIndex) => (
                <p key={itemIndex} className="text-muted-foreground text-sm">{item}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quickActions.map((action) => (
          <button
            key={action.id}
            onClick={() => onActionClick(action.id)}
            className="bg-accent hover:bg-primary hover:text-primary-foreground transition-all duration-300 rounded-xl p-4 text-center group"
          >
            <action.icon className="h-6 w-6 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default InfoPanel;