import { Camera, Home, Pencil } from 'lucide-react';
import { Button } from './ui/button';
import { Crew } from '@/types/study';

interface SideMenuProps {
  studyTitle: string;
  crewList: Crew[];
}

const SideMenu = ({ studyTitle, crewList }: SideMenuProps) => {
  return (
    <div className="h-screen w-50 bg-sky-50 p-4 flex flex-col gap-2 rounded-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">{studyTitle}</h2>
      </div>

      <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => {}}>
        <Home size={20} />
        대시보드
      </Button>

      <Button variant="ghost" className="w-full justify-start gap-2">
        <Pencil size={20} />
        학습 관리
      </Button>

      <Button variant="ghost" className="w-full justify-start gap-2">
        <Camera size={20} />
        라이브 스터디룸
      </Button>

      <div className="flex-1" />

      <div className="border-1 rounded-sm p-2">
        <div className="border-b-1 pb-2">Study Crew</div>
        <div className="flex flex-col gap-2 mt-2">
          {crewList?.map((crew) => <span key={crew.id}>{crew.name}</span>)}
        </div>
      </div>

      <div>스터디 탈퇴</div>
    </div>
  );
};

export default SideMenu;
