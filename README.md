# SPMS - Real-time Posture Analyzer

A responsive, accessible web application that analyzes your posture in real-time using your webcam.

## Features
- **Live Video Feed**: Accesses your front camera.
- **Real-time Analysis**: Analyzes frames locally or sends them to a remote AI agent.
- **Instant Feedback**: Visual indicators for "Good" vs "Bad" posture.
- **Detailed Insights**: Explanations and suggestions for correcting posture issues.
- **Privacy Focused**: Runs locally by default; only sends data to a remote URL if you provide one.

## How to Run

Due to browser security restrictions, camera access (`getUserMedia`) only works on **HTTPS** or **localhost**. You cannot simply double-click the `index.html` file.

### Option 1: Using Python (Recommended)
If you have Python installed:
1. Open a terminal in this directory.
2. Run:
   ```bash
   python -m http.server
   ```
3. Open your browser to `http://localhost:8000`.

### Option 2: Using Node.js (npx)
If you have Node.js installed:
1. Open a terminal in this directory.
2. Run:
   ```bash
   npx serve
   ```
3. Open the URL shown (usually `http://localhost:3000`).

### Option 3: VS Code Live Server
If you use VS Code:
1. Install the "Live Server" extension.
2. Right-click `index.html` and select "Open with Live Server".

## Usage
1. Click **Start Camera**.
2. Allow browser permission for the camera.
3. Sit in front of the camera so your head and shoulders are visible.
4. (Optional) Enter a "Text Generation Agent URL" if you have a backend endpoint for advanced analysis.
5. View real-time feedback on the right side.
