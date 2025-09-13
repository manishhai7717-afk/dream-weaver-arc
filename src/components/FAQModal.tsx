import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface FAQModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FAQModal = ({ isOpen, onClose }: FAQModalProps) => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I register for classes?",
      answer: "You can register for classes through the student portal. Navigate to the \"Registration\" section and follow the prompts to select your courses. If you encounter issues, contact the registrar's office."
    },
    {
      question: "Where can I find my course schedule?",
      answer: "Your course schedule is available in the student portal under the \"Academics\" tab. You can also view it through the mobile app."
    },
    {
      question: "How do I access online library resources?",
      answer: "You can access online library resources through the library website using your student credentials. Remote access is available 24/7."
    },
    {
      question: "What are the parking regulations on campus?",
      answer: "All vehicles on campus must display a valid parking permit. Parking is available in designated lots only. Please refer to the campus security website for detailed regulations."
    },
    {
      question: "How can I get a student ID card?",
      answer: "New student ID cards can be obtained from the Campus Security office. There is a $20 replacement fee for lost cards."
    },
    {
      question: "Where is the health center located?",
      answer: "The Campus Health Center is located in the Wellness Building, room 101. Appointments are recommended but walk-ins are welcome."
    },
    {
      question: "How do I apply for on-campus housing?",
      answer: "You can apply for on-campus housing through the Residential Life portal. The application typically opens in March for the following academic year."
    },
    {
      question: "What dining plans are available?",
      answer: "We offer several dining plans ranging from 10 to 21 meals per week. You can select or change your dining plan through the student portal."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Frequently Asked Questions</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border pb-4">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center text-left py-2 hover:text-primary transition-colors"
              >
                <span className="font-semibold text-primary">{faq.question}</span>
                {openFAQ === index ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )}
              </button>
              
              {openFAQ === index && (
                <div className="mt-3 pl-4 text-muted-foreground">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FAQModal;