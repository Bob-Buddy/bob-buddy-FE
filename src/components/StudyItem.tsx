import { Study } from '@/types/study';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface StudyItemProp {
  study: Study;
}

const StudyItem = ({ study }: StudyItemProp) => {
  return (
    <Card>
      <CardContent>
        <div>{study.title}</div>
        <div>{study.description}</div>
        <Button>입장</Button>
      </CardContent>
    </Card>
  );
};

export default StudyItem;
