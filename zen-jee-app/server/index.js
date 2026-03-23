// server/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(cors()); // Allows your React app to talk to this server
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 1. Generate Study Plan
app.post('/api/ai/plan', async (req, res) => {
  try {
    const { daysLeft, targetExam, coveragePct, weakAreasContext, selectedClass, currentDate } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    const prompt = `
      You are an autonomous, highly intelligent JEE study planner. 
      Current Date: ${currentDate}. Days left until target exam: ${daysLeft}.
      Target Exam: JEE ${targetExam}. Class: ${selectedClass}.
      
      User's Live Analytics:
      - Syllabus Coverage: ~${coveragePct}% complete.
      - ${weakAreasContext}
      
      Generate a highly optimized daily study plan for the next 4 days. Prioritize weak topics heavily.
      You MUST respond ONLY with a valid, raw JSON array of objects. No markdown.
      Format EXACTLY like this: [{"day": "Day 1", "date": "Tomorrow", "subject": "Physics", "focus": "Chapter Name", "task": "Solve 20 PYQs to fix weak area.", "color": "sky"}]
    `;

    const result = await model.generateContent(prompt);
    let textResponse = result.response.text().replace(/```json/gi, '').replace(/```/gi, '').trim();
    const startIdx = textResponse.indexOf('[');
    const endIdx = textResponse.lastIndexOf(']');
    if(startIdx !== -1 && endIdx !== -1) textResponse = textResponse.substring(startIdx, endIdx + 1);
    
    res.json(JSON.parse(textResponse));
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ error: 'Failed to generate plan' });
  }
});

// 2. Generate Daily Test Weakness Question
app.post('/api/ai/question', async (req, res) => {
  try {
    const { topicName } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `You are a JEE Tutor. Generate ONE multiple-choice question for the topic: "${topicName}". Make it conceptually challenging to test a student's weakness. Use LaTeX ($math$ or $$math$$) for equations. Return ONLY a valid JSON object. No markdown. Structure: {"text": "question", "options": ["A", "B", "C", "D"], "correctIndex": 0, "explanation": "detailed explanation", "difficulty": "Hard", "year": "AI Gen"}`;
    
    const result = await model.generateContent(prompt);
    let rawJson = result.response.text().trim();
    if (rawJson.startsWith('```json')) rawJson = rawJson.slice(7, -3);
    
    res.json(JSON.parse(rawJson));
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ error: 'Failed to generate question' });
  }
});

// 3. Generate Question Hint
app.post('/api/ai/hint', async (req, res) => {
  try {
    const { questionText } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(`Provide ONE short, strategic hint to help start this problem. DO NOT give the answer. Use LaTeX math formatting. Under 3 sentences: "${questionText}"`);
    
    res.json({ hint: result.response.text() });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ error: 'Failed to generate hint' });
  }
});

// 4. Chatbot Response
app.post('/api/ai/chat', async (req, res) => {
  try {
    const { userText } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    const prompt = `
      You are an expert, empathetic JEE tutor. 
      A student asks: "${userText}"
      
      RULES:
      1. Answer accurately and concisely. Use LaTeX ($math$ or $$math$$).
      2. You MUST cross-reference your explanation with standard NCERT textbook theory. Mention if NCERT differs from advanced theory.
      3. Keep it under 300 words.
      
      AT THE VERY END of your response, you MUST include a routing tag based on the closest matching subject/chapter from this syllabus map:
      Physics: p_u1, p_u2, p_u11 | Chemistry: c_u1, c_u5, c_u16 | Math: m_u1, m_u8.

      Format the tag EXACTLY like this (hidden from the user):
      <ROUTE>{"subject": "physics", "chapter": "p_u2"}</ROUTE>
    `;

    const result = await model.generateContent(prompt);
    res.json({ response: result.response.text() });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ error: 'Failed to generate chat response' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Secure AI Backend running on port ${PORT}`));