Taavi Pinola — Portfolio

Personal developer portfolio built with React 19, Vite, and Tailwind CSS 4.

The portfolio showcases my work, skills, and background through a responsive single-page experience with custom animations and a serverless contact form powered by Resend.

Live site: portfolio-kappa-ruby-tewccscg7x.vercel.app

✨ Features
Responsive single-page portfolio
Animated canvas starfield background
Typewriter effect for the hero section
Scroll-reveal animations using a custom useInView hook
Responsive navigation with mobile menu
Reduced-motion support for accessibility
Contact form with serverless API integration
Server-side input validation and HTML escaping
Basic in-memory rate limiting for contact submissions
Email delivery through Resend
Production deployment through Vercel
🛠️ Tech Stack
Technology	Purpose
React 19	UI and component architecture
Vite	Development server and production build
Tailwind CSS 4	Styling and responsive layout
Lucide React	Interface icons
Resend	Contact form email delivery
Vercel	Hosting and serverless API
🏗️ Architecture

The project is a Vite-powered React application deployed through Vercel.

The frontend lives in src/, while the contact form is handled by a Vercel serverless function:

Browser
   │
   ▼
React / Vite frontend
   │
   │ POST /api/contact
   ▼
Vercel Serverless Function
   │
   ├── Validate input
   ├── Escape user content
   ├── Apply rate limiting
   │
   ▼
Resend
   │
   ▼
Contact email

This keeps the Resend API key on the server rather than exposing it to the browser.

📁 Project Structure
Portfolio/
├── portfolio/
│   ├── api/
│   │   └── contact.js        # Serverless contact endpoint
│   │
│   ├── public/
│   │   └── favicon.svg
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar
│   │   │   ├── AboutMe
│   │   │   ├── Contact
│   │   │   ├── Footer
│   │   │   ├── Starfield
│   │   │   └── Typewriter
│   │   │
│   │   ├── hooks/
│   │   │   └── useInView.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── index.html
│   └── vite.config.js
│
├── .gitignore
├── LICENSE
└── README.md
🚀 Getting Started
Requirements
Node.js 20+
npm
Installation

Clone the repository and move into the application directory:

git clone https://github.com/pitanu/Portfolio.git
cd Portfolio/portfolio

Install dependencies:

npm install

Start the development server:

npm run dev

The application will be available at the local URL provided by Vite.

📜 Available Scripts

Run these commands from the portfolio/ directory.

Command	Description
npm run dev	Start the development server
npm run build	Create a production build
npm run lint	Run ESLint
npm run check	Run linting and the production build

Before deploying changes, npm run check can be used as a quick validation of both the code and production build.

✉️ Contact Form

The portfolio includes a contact form backed by the Vercel serverless function:

portfolio/api/contact.js

The endpoint handles:

Request validation
Input sanitization
Basic rate limiting
Email delivery through Resend

The Resend API key is kept server-side through environment variables and is never included in the client-side application.

🔐 Environment Variables

The contact API requires two environment variables:

Variable	Description
RESEND_API_KEY	API key used to send emails through Resend
CONTACT_EMAIL	Email address that receives contact form submissions

For local development, copy the example environment file:

cp .env.example .env

Then configure the values in .env:

RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL=you@example.com

For production, configure the same variables in the Vercel project settings.

Never commit real API keys or credentials to the repository.

☁️ Deployment

The portfolio is deployed on Vercel.

The Vercel project uses:

Root Directory: portfolio/

Vercel builds the Vite application and automatically deploys the api/ directory as serverless functions.

The production deployment therefore contains both:

the React frontend
the /api/contact serverless endpoint

Live: portfolio-kappa-ruby-tewccscg7x.vercel.app

♿ Accessibility

The interface includes support for users who prefer reduced motion.

The animated starfield respects the browser's prefers-reduced-motion setting, allowing the visual effects to be reduced when requested by the user.

📄 License

This project is released under the MIT License.

👤 Author

Taavi Pinola

Portfolio: portfolio-kappa-ruby-tewccscg7x.vercel.app
GitHub: @pitanu
