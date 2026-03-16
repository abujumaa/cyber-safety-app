# CyberKids Platform

Welcome to the CyberKids Platform! This application empowers the next generation with interactive AI-safety and cybersecurity missions. 

## Project Vision

As a volunteer, you are helping to future-proof children's digital safety. This platform allows kids to learn how to spot deepfakes, chat safely with AI, and understand algorithms in a secure, futuristic environment. Your contributions directly help build a safer digital world!

## Launch Guide

To get started locally, run the following commands in the project root:

```bash
npm install
npm run dev
```

This will start the Vite development server. Open the provided local URL in your browser to view the application.

## Lab Synchronization Guide

Adding new labs to the platform is simple. All lab content is driven by the `src/data/labs.json` file. You or a future Python script can add new labs by appending them to the JSON array.

### JSON Schema for a Lab Object:

```json
{
  "id": "unique-lab-id",
  "title": "Lab Title",
  "description": "A short description of what the user will learn.",
  "isLocked": false, // Set to true to gate behind the Premium Modal
  "steps": [
    "Step 1 instruction...",
    "Step 2 instruction..."
  ],
  "quiz": [
    {
      "question": "Quiz question text?",
      "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
      "answer": "Option 1" // Must match one of the options exactly
    }
  ]
}
```

## Deployment

This project includes an automated GitHub Actions workflow to deploy to GitHub Pages on every push to the `main` branch. 

To deploy to your own repository:
1. Initialize git and commit your files (if not already done).
2. Connect to a new GitHub remote:
   ```bash
   git remote add origin https://github.com/yourusername/cyber-safety-app.git
   git branch -M main
   git push -u origin main
   ```
3. In your GitHub repository settings, under "Pages", ensure the source is set to "GitHub Actions".

## Quality Engineering

This project uses Vitest and React Testing Library for quality assurance.
To run the test suite, use the following command:

```bash
npm run test
```
