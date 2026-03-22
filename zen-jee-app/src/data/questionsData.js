// src/data/questionsData.js
import { allChaptersData } from './chaptersData.js';

const realQuestions = {
  'p_u2': [ 
    {
      id: 1,
      topic: 'p_u2_t1', // Tagged to a specific lecture
      text: "A particle starts from rest and accelerates with a constant acceleration of 2 m/s². What is the distance traveled in the 5th second?",
      options: ["4 m", "9 m", "16 m", "25 m"],
      correctIndex: 1, 
      explanation: "Use the formula for distance in the nth second: Sn = u + a/2 * (2n - 1). Here u=0, a=2, n=5. Sn = 0 + (2/2) * (2*5 - 1) = 9m.",
      difficulty: "Medium",
      year: "2023"
    },
    {
      id: 2,
      topic: 'p_u2_t2',
      text: "Two projectiles are fired from the same point with the same speed at angles of projection 60° and 30° respectively. Which of the following is true?",
      options: ["Their maximum heights will be the same", "Their ranges will be the same", "Their velocities at the highest point will be the same", "Their times of flight will be the same"],
      correctIndex: 1,
      explanation: "For complementary angles (θ and 90°-θ) with the same initial speed, the horizontal ranges are equal. R = (u²sin2θ)/g.",
      difficulty: "Easy",
      year: "2022"
    }
  ]
};

// UPDATED: Now requires subjectId so it can find the real topics from chaptersData
export const getQuestionsForChapter = (subjectId, chapterId, chapterName) => {
  if (realQuestions[chapterId]) return realQuestions[chapterId];

  // Fetch the actual topics for this chapter from the database
  const chapter = allChaptersData[subjectId]?.[chapterId];
  const topics = chapter?.topics || [{ id: 'mock_topic', name: 'General Concept' }];

  const difficulties = ["Easy", "Medium", "Hard"];
  const years = ["2024", "2023", "2022", "2021"];

  // Fallback generator now tags each question to a random topic from that chapter
  return Array.from({ length: 8 }).map((_, i) => {
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    return {
      id: `mock_${chapterId}_${i}`,
      topic: randomTopic.id, // THE NEW TOPIC TAG
      text: `Sample previous year question ${i + 1} for ${chapterName}. This tests concepts from ${randomTopic.name}.`,
      options: [`Option A`, `Option B`, `Option C`, `Option D`],
      correctIndex: Math.floor(Math.random() * 4), 
      explanation: `This is the detailed step-by-step solution for question ${i + 1}.`,
      difficulty: difficulties[Math.floor(Math.random() * difficulties.length)],
      year: years[Math.floor(Math.random() * years.length)]
    };
  });
};