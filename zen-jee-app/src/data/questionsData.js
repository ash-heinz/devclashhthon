// src/data/questionsData.js

const realQuestions = {
  'p_u2': [ 
    {
      id: 1,
      text: "A particle starts from rest and accelerates with a constant acceleration of 2 m/s². What is the distance traveled in the 5th second?",
      options: ["4 m", "9 m", "16 m", "25 m"],
      correctIndex: 1, 
      explanation: "Use the formula for distance in the nth second: Sn = u + a/2 * (2n - 1). Here u=0, a=2, n=5. Sn = 0 + (2/2) * (2*5 - 1) = 9m.",
      difficulty: "Medium",
      year: "2023"
    },
    {
      id: 2,
      text: "Two projectiles are fired from the same point with the same speed at angles of projection 60° and 30° respectively. Which of the following is true?",
      options: ["Their maximum heights will be the same", "Their ranges will be the same", "Their velocities at the highest point will be the same", "Their times of flight will be the same"],
      correctIndex: 1,
      explanation: "For complementary angles (θ and 90°-θ) with the same initial speed, the horizontal ranges are equal. R = (u²sin2θ)/g.",
      difficulty: "Easy",
      year: "2022"
    }
  ],
  'p_u11': [ 
    {
      id: 3,
      text: "Two point charges +q and -q are placed at a distance d apart. What is the electric potential at the midpoint of the line joining them?",
      options: ["k * (2q/d)", "k * (q/d²)", "Zero", "Infinity"],
      correctIndex: 2, 
      explanation: "Potential is a scalar quantity. V = V1 + V2 = (k*q)/(d/2) + (k*-q)/(d/2) = 0.",
      difficulty: "Medium",
      year: "2024"
    }
  ]
};

export const getQuestionsForChapter = (chapterId, chapterName) => {
  if (realQuestions[chapterId]) return realQuestions[chapterId];

  // Fallback generator now includes mock tags
  const difficulties = ["Easy", "Medium", "Hard"];
  const years = ["2024", "2023", "2022", "2021"];

  return Array.from({ length: 5 }).map((_, i) => ({
    id: `mock_${chapterId}_${i}`,
    text: `Sample previous year question ${i + 1} for ${chapterName}. This is where the complex mathematical equation or concept would go.`,
    options: [`Option A for Q${i+1}`, `Option B for Q${i+1}`, `Option C for Q${i+1}`, `Option D for Q${i+1}`],
    correctIndex: Math.floor(Math.random() * 4), 
    explanation: `This is the detailed step-by-step solution for question ${i + 1}.`,
    difficulty: difficulties[Math.floor(Math.random() * difficulties.length)],
    year: years[Math.floor(Math.random() * years.length)]
  }));
};