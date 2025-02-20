import { Study } from '@/types/study';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Link } from 'react-router-dom';

interface StudyItemProp {
  study: Study;
}

const StudyItem = ({ study }: StudyItemProp) => {
  return (
    <Card>
      <CardContent>
        <div>{study.title}</div>
        <div>{study.description}</div>
        <Link to="/study/detail">
          <Button>입장</Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default StudyItem;
