import { GoogleGenAI } from '@google/genai';
import Project from '../models/Project.js';
import dotenv from 'dotenv';

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const analyzeProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    // Fetch the project from the database
    const project = await Project.findById(projectId);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Construct the prompt for the AI
    const prompt = `
      You are an expert open-source maintainer and software architect.
      Please analyze the following project and return the results as a JSON object. 
      The JSON object MUST have exactly these three keys:
      1. "difficulty": A string representing the difficulty of adopting this project (e.g., "Beginner", "Intermediate", "Advanced") based on the tech stack and pending tasks.
      2. "viability": A short 1-sentence assessment of whether this project is worth adopting based on its description and stack.
      3. "actionPlan": A 3-step actionable plan (as a single string or an array of strings, I will parse it) for the new maintainer on how to start tackling the pending tasks. If an array, join it with newlines.

      Project Title: ${project.title}
      Project Description: ${project.description}
      Tech Stack: ${project.techStack?.join(', ') || 'None specified'}
      Pending Tasks: ${project.whatsLeft || 'None specified'}
    `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });

    const aiText = response.text;
    let analysis;
    try {
      analysis = JSON.parse(aiText);
    } catch (parseError) {
      console.error('Failed to parse JSON from AI:', aiText);
      return res.status(500).json({ message: 'AI returned invalid format', raw: aiText });
    }

    // Send the structured analysis back to the frontend
    res.json(analysis);

  } catch (error) {
    console.error('AI Analysis Error:', error);
    res.status(500).json({ message: error.message || 'Failed to analyze project' });
  }
};
