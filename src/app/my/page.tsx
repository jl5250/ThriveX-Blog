import bg from '@/assets/image/bg.png';

import Goals from './component/Goals';
import Character from './component/Character';
import Map from './component/Map';
import Technology from './component/Technology';
import Project from './component/Project';
import Calendar from './component/Calendar';
import InfoTwo from './component/InfoTwo';
import { getPageConfigDataByNameAPI } from '@/api/config';
import { Config } from '@/types/app/config';
import { MyData } from '@/types/app/my';
import InfoOne from './component/InfoOne';

export default async () => {
  const { data } = (await getPageConfigDataByNameAPI('my')) || { data: {} as Config };
  const value = (data?.value as MyData) || ({} as MyData);

  const defaultInfoOne = {
    name: '未命名',
    notes: '',
    avatar: '',
    profession: '',
    introduction: '',
  };

  const defaultInfoTwo = {
    author: '未提供作者',
    know_me: '#',
    left_tags: [] as string[],
    right_tags: [] as string[],
    avatar_url: '',
  };

  const defaultCharacter = [] as MyData['character'];
  const defaultGoals = [] as MyData['goals'];
  const defaultProject = [] as MyData['project'];
  const defaultTechStack = [] as MyData['technology_stack'];
  const defaultHometown = [0, 0] as MyData['hometown'];

  const safeData: MyData = {
    info_style: value.info_style || 'info_one',
    info_one: { ...defaultInfoOne, ...(value.info_one || {}) },
    info_two: { ...defaultInfoTwo, ...(value.info_two || {}) },
    character: value.character ?? defaultCharacter,
    goals: value.goals ?? defaultGoals,
    project: value.project ?? defaultProject,
    technology_stack: value.technology_stack ?? defaultTechStack,
    hometown: value.hometown ?? defaultHometown,
  };

  const { info_style, info_one, info_two, character, goals, project, technology_stack, hometown } = safeData;

  return (
    <>
      <title>👋 关于我</title>
      <meta name="description" content="👋 关于我" />

      <div className="bg-white dark:bg-black-a pt-20 bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${bg.src})` }}>
        <div className="w-[90%] lg:w-[950px] mx-auto">{info_style === 'info_one' ? <InfoOne data={info_one} /> : <InfoTwo data={info_two} />}</div>

        <div className="flex justify-center mt-24">
          <Calendar />
        </div>

        <div className="flex flex-col md:flex-row w-[90%] sm:w-9/12 mt-52 mx-auto">
          <Character data={character} />
          <Goals data={goals} />
        </div>

        <div className="flex flex-col md:flex-row w-[90%] sm:w-9/12 mt-52 mx-auto">
          <Map position={hometown} />
          <Technology list={technology_stack} />
        </div>

        <div className="mt-52">
          <Project data={project} />
        </div>
      </div>
    </>
  );
};
