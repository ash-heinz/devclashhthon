// src/data/questionsData.js
import { allChaptersData } from './chaptersData.js';

const realQuestions = {
  'p_u2': [ 
    {
      id: 1, topic: 'p_u2_t1',
      text: "A particle starts from rest and accelerates with a constant acceleration of $2 \\text{ m/s}^2$. What is the distance traveled in the $5^{\\text{th}}$ second?",
      options: ["$4 \\text{ m}$", "$9 \\text{ m}$", "$16 \\text{ m}$", "$25 \\text{ m}$"],
      correctIndex: 1, 
      explanation: "Use the formula for distance in the $n^{\\text{th}}$ second: $S_n = u + \\frac{a}{2}(2n - 1)$. \n\nHere $u=0$, $a=2$, $n=5$. \n\n$S_n = 0 + \\frac{2}{2}(2(5) - 1) = 9 \\text{ m}$.",
      difficulty: "Medium", year: "2023", examType: "Mains"
    },
    {
      id: 2, topic: 'p_u2_t2',
      text: "Two projectiles are fired from the same point with the same speed at angles of projection $60^\\circ$ and $30^\\circ$ respectively. Which of the following is true?",
      options: [
        "Their maximum heights will be the same", 
        "Their ranges will be the same", 
        "Their velocities at the highest point will be the same", 
        "Their times of flight will be the same"
      ],
      correctIndex: 1,
      explanation: "For complementary angles $\\theta$ and $90^\\circ - \\theta$ with the same initial speed, the horizontal ranges are equal. \n\n$R = \\frac{u^2 \\sin(2\\theta)}{g}$.",
      difficulty: "Easy", year: "2022", examType: "Mains"
    },
    {
      id: 3, topic: 'p_u2_t2',
      text: "A ball is projected from the ground at an angle of $45^\\circ$ with the horizontal surface. It reaches a maximum height of $120 \\text{ m}$ and returns to the ground. Upon hitting the ground for the first time, it loses half of its kinetic energy. Immediately after the bounce, the velocity of the ball makes an angle of $30^\\circ$ with the horizontal. Find the maximum height it reaches after the bounce.",
      options: ["$30 \\text{ m}$", "$45 \\text{ m}$", "$60 \\text{ m}$", "$90 \\text{ m}$"],
      correctIndex: 0,
      explanation: "Advanced projectile motion involving energy loss. \n\nEnergy after bounce is $\\frac{E}{2}$. Velocity reduces by $\\frac{1}{\\sqrt{2}}$. Recalculate $H_{\\max}$ with the new velocity and angle.",
      difficulty: "Hard", year: "2021", examType: "Advanced"
    }
  ]
};

export const getQuestionsForChapter = (subjectId, chapterId, chapterName) => {
  if (realQuestions[chapterId]) return realQuestions[chapterId];

  const chapter = allChaptersData[subjectId]?.[chapterId];
  const topics = chapter?.topics || [{ id: 'mock_topic', name: 'General Concept' }];

  const difficulties = ["Easy", "Medium", "Hard"];
  const years = ["2024", "2023", "2022", "2021"];
  const examTypes = ["Mains", "Mains", "Mains", "Advanced"];

  return Array.from({ length: 12 }).map((_, i) => {
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    return {
      id: `mock_${chapterId}_${i}`,
      topic: randomTopic.id,
      text: `Sample previous year question ${i + 1} for ${chapterName}. Solve for $x$ in the equation $\\int_0^x t^2 dt = \\frac{8}{3}$.`,
      options: [`$x = 2$`, `$x = 4$`, `$x = \\sqrt{2}$`, `$x = 8$`],
      correctIndex: 0, 
      explanation: `Integrating the function gives $\\left[ \\frac{t^3}{3} \\right]_0^x = \\frac{x^3}{3}$. Setting this equal to $\\frac{8}{3}$ yields $x^3 = 8$, so $x = 2$.`,
      difficulty: difficulties[Math.floor(Math.random() * difficulties.length)],
      year: years[Math.floor(Math.random() * years.length)],
      examType: examTypes[Math.floor(Math.random() * examTypes.length)]
    };
  });
};