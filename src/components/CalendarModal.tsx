import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CalendarModal = ({ isOpen, onClose }: CalendarModalProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const generateCalendar = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();

    const calendar = [];
    let dateCount = 1;

    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          week.push(null);
        } else if (dateCount > daysInMonth) {
          week.push(null);
        } else {
          const isToday = dateCount === today.getDate() && 
                         month === today.getMonth() && 
                         year === today.getFullYear();
          const hasEvent = [5, 12, 19, 26].includes(dateCount);
          
          week.push({
            date: dateCount,
            isToday,
            hasEvent
          });
          dateCount++;
        }
      }
      calendar.push(week);
      if (dateCount > daysInMonth) break;
    }

    return calendar;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      return newDate;
    });
  };

  const calendar = generateCalendar(currentDate);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Campus Event Calendar</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateMonth('prev')}
              className="rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-lg font-semibold">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateMonth('next')}
              className="rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="w-full">
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center font-semibold py-2 bg-accent rounded-lg">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="space-y-2">
              {calendar.map((week, weekIndex) => (
                <div key={weekIndex} className="grid grid-cols-7 gap-2">
                  {week.map((day, dayIndex) => (
                    <div
                      key={dayIndex}
                      className={`
                        h-16 p-2 border rounded-lg transition-colors cursor-pointer relative
                        ${day ? 'hover:bg-accent border-border' : 'border-transparent'}
                        ${day?.isToday ? 'bg-primary/10 border-primary' : ''}
                        ${day?.hasEvent ? 'bg-accent' : ''}
                      `}
                    >
                      {day && (
                        <>
                          <span className="text-sm font-medium">{day.date}</span>
                          {day.hasEvent && (
                            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full"></div>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-muted rounded-xl p-4">
            <h3 className="font-semibold mb-3">Today's Events</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-primary font-semibold text-sm">10:00 AM</span>
                <span className="text-sm">Orientation for New Students</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-semibold text-sm">2:00 PM</span>
                <span className="text-sm">Library Research Workshop</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CalendarModal;