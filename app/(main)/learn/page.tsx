import { redirect } from "next/navigation";

import { FeedWrapper } from "@/components/FeedWrapper";
import { StickyWrapper } from "@/components/StickyWrapper";
import { UserProgress } from "@/components/UserProgress";
import {
  getCourseProgress,
  getLessonPercentage,
  getUnits,
  getUserProgress,
  getUserSubscription,
} from "@/db/queries";

import { Header } from "./Header";
import { Unit } from "./Unit";
import { Promo } from "@/components/Promo";
import { Quests } from "@/components/Quests";

const LearnPage = async () => {
  const userProgressPromis = getUserProgress();
  const courseProgressPromis = getCourseProgress();
  const lessonPercentagePromis = getLessonPercentage();
  const unitsPromis = getUnits();
  const userSubscriptionPromis = getUserSubscription();

  const [userProgress, units, courseProgress, lessonPercentage] =
    await Promise.all([
      userProgressPromis,
      unitsPromis,
      courseProgressPromis,
      lessonPercentagePromis,
      userSubscriptionPromis,
    ]);

  const isPro = !!userProgress?.activeCourse?.title;

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  return (
    <div className="flex gap-[48px] px-6">
      <FeedWrapper>
        <Header title={userProgress.activeCourse.title} />
        {units.map((unit) => (
          <div key={unit.id} className="mb-10">
            <Unit
              id={unit.id}
              order={unit.order}
              description={unit.description}
              title={unit.title}
              lessons={unit.lessons}
              activeLesson={courseProgress?.activeLesson}
              activeLessonPercentage={lessonPercentage}
            />
          </div>
        ))}
      </FeedWrapper>
      <StickyWrapper>
        <UserProgress
          activeCourses={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={isPro}
        />
        {!isPro && <Promo />}
        <Quests points={userProgress.points} />
      </StickyWrapper>
    </div>
  );
};

export default LearnPage;
