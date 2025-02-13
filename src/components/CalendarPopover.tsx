import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { FormControl } from './ui/form';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from './ui/calendar';
import dayjs from 'dayjs';
import { ControllerRenderProps } from 'react-hook-form';
import { StudyFormValues } from '@/schemas/study.schema';

interface Prop {
  field: ControllerRenderProps<StudyFormValues, 'startDate' | 'endDate'>;
}

const CalendarPopover = ({ field }: Prop) => {
  const [openPopover, setOpenPopover] = useState(false);

  const handleClick = () => {
    setOpenPopover((prev) => !prev);
  };

  const handleSelect = (date: Date | undefined) => {
    field.onChange(date);
    setOpenPopover(false);
  };

  return (
    <Popover open={openPopover} onOpenChange={setOpenPopover}>
      <div id="calendar-container">
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant={'outline'}
              className={cn('w-[240px] pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
              onClick={handleClick}
            >
              {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={field.value ? dayjs(field.value).toDate() : undefined}
            onSelect={handleSelect}
            disabled={(date) => date < new Date()}
            initialFocus
          />
        </PopoverContent>
      </div>
    </Popover>
  );
};

export default CalendarPopover;
