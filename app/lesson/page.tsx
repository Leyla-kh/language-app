import { getLesson, getUserProgress, getUserSubscription } from "@/db/queries";
import { redirect } from "next/navigation";
import { Quiz } from "./Quiz";

const LessonPage = async () => {
  const lessonPromis = getLesson();
  const userProgressPromis = getUserProgress();
  const userSubscriptionPromis = getUserSubscription();

  const [lesson, userProgress, userSubscription] = await Promise.all([
    lessonPromis,
    userProgressPromis,
    userSubscriptionPromis,
  ]);

  if (!lesson || !userProgress) {
    redirect("/learn");
  }

  const initialPercentage =
    (lesson.challenges.filter((challenge) => challenge.completed).length /
      lesson.challenges.length) *
    100;

  return (
    <Quiz
      initialLessonId={lesson.id}
      initialLessonChallenges={lesson.challenges}
      initialHearts={userProgress.hearts}
      initialPercentage={initialPercentage}
      userSubscription={userSubscription}
    />
  );
};

export default LessonPage;
