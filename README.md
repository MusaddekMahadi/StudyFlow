StudyFlow
Your personal study time and task management companion

Features
Live Clock & Study Timer: Keep track of current time and manage focus sessions with a built-in study timer.

Task Management: Add and organize tasks directly in the dashboard.

Study Resources: Quick access buttons for common learning tools like YouTube, ChatGPT, Google Docs, and Google Scholar.

Live Demo
Accessible at: studyflow‑olive.vercel.app

Tech Stack
Next.js – React framework for server-rendered applications

TypeScript – Type safety across the codebase

Tailwind CSS – Utility-first styling
(Chuose to include if true: e.g., any state management library, icon libraries, etc.)

Installation & Running Locally:

# Clone the repo
git clone https://github.com/MusaddekMahadi/StudyFlow.git
cd StudyFlow

# Install dependencies (using npm or pnpm)
pnpm install  # or npm install

# Start development server
pnpm dev  # or npm run dev

# Visit the app
# Navigate to http://localhost:3000


Project Structure:

├── app/               # Next.js page components
├── components/        # Reusable UI components
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
├── public/            # Static assets
├── styles/            # Tailwind or CSS files
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── pnpm-lock.yaml     # (or package-lock.json)

Usage
Launch the app locally or use the live demo.

Use the timer to manage your study sessions.

Add, view, and manage your study tasks.

Use the resource buttons to jump straight into study tools like YouTube, ChatGPT, Docs, and Scholar.

Future Enhancements (Optional)
Persistent task storage (e.g., with local storage or a backend)

Timer presets like Pomodoro mode (25 min work / 5 min break)

Theme customization (dark/light mode)

Additional resource links or integrations

Contributing
Contributions are welcome! Feel free to open issues or submit pull requests to add features, fix bugs, or improve documentation.
