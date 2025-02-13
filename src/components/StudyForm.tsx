import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { StudyFormValues, studySchema } from '@/schemas/study.schema';
import InputContainer from './InputContainer';
import { Input } from './ui/input';
import dayjs from 'dayjs';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { FC, useState } from 'react';
import CalendarPopover from './CalendarPopover';
import Alert from './Alert';

const StudyForm: FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const form = useForm<StudyFormValues>({
    resolver: zodResolver(studySchema),
    defaultValues: {
      title: '',
      description: '',
      language: 0,
      category: 0,
      startDate: dayjs().toDate(),
      endDate: dayjs().add(1, 'month').toDate(),
      capacity: 1,
    },
  });

  const onSubmit = async (values: StudyFormValues) => {
    console.log('스터디 생성', values);
    setAlertOpen(true);
    setDialogOpen(false);
  };

  return (
    <>
      {alertOpen && (
        <Alert
          alertOpen={alertOpen}
          setAlertOpen={setAlertOpen}
          title={'생성 완료'}
          description={'스터디가 생성되었습니다'}
        />
      )}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger>
          <Button style={{ position: 'fixed', right: 30, bottom: 30 }}>+</Button>
        </DialogTrigger>
        <DialogContent style={{ backgroundColor: '#fff' }}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>새 스터디 생성</DialogTitle>
              <DialogDescription>새로운 스터디 생성을 위한 정보를 입력해주세요.</DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <InputContainer label="Title">
                    <Input placeholder="제목 입력" type="text" {...field} />
                  </InputContainer>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <InputContainer label="Description">
                    <Input placeholder="설명 입력" type="text" {...field} />
                  </InputContainer>
                )}
              />
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <InputContainer label="Language">
                    <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
                      <SelectTrigger>{field.value ? <SelectValue /> : '언어를 선택해주세요'}</SelectTrigger>
                      <SelectContent style={{ backgroundColor: '#fff' }}>
                        <SelectGroup>
                          <SelectItem value="1">JS</SelectItem>
                          <SelectItem value="2">Python</SelectItem>
                          <SelectItem value="3">Java</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </InputContainer>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <InputContainer label="Category">
                    <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
                      <SelectTrigger>{field.value ? <SelectValue /> : '카테고리를 선택해주세요'}</SelectTrigger>
                      <SelectContent style={{ backgroundColor: '#fff' }}>
                        <SelectGroup>
                          <SelectItem value="1">1번</SelectItem>
                          <SelectItem value="2">2번</SelectItem>
                          <SelectItem value="3">3번</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </InputContainer>
                )}
              />

              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start date</FormLabel>
                    <CalendarPopover field={field} />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>End date</FormLabel>
                    <CalendarPopover field={field} />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="capacity"
                render={({ field }) => (
                  <InputContainer label="Capacity">
                    <Input type="number" {...field} />
                  </InputContainer>
                )}
              />
            </Form>
            <DialogFooter>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default StudyForm;
