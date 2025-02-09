import { Study } from '@/types/study';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from './ui/carousel';
import StudyItem from './StudyItem';

interface StudyItemProp {
  studyList: Study[];
}

const StudyCarousel = ({ studyList }: StudyItemProp) => {
  return (
    <Carousel opts={{ slidesToScroll: 5 }}>
      <CarouselContent>
        {studyList.map((study, index) => (
          <CarouselItem key={index} className="basis-1/5">
            <StudyItem study={study} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default StudyCarousel;
