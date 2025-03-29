# BetSeguro: AI-Powered Sports Predictions Platform

BetSeguro is a modern web application that provides AI-powered predictions for sports betting, focusing on Baseball, Basketball, and Hockey.

## Features

- Real-time odds data from [The Odds API](https://the-odds-api.com/)
- AI-powered insights and analysis for upcoming games
- Responsive, mobile-friendly design
- Multi-language support (English and Spanish)
- Detailed game predictions with win probabilities and risk assessment

## Tech Stack

- [Next.js 15](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Shadcn UI](https://ui.shadcn.com/) - UI component library
- [OpenAI API](https://openai.com/) (optional) - AI-powered insights

## Prerequisites

- Node.js 18.17 or later
- An API key from [The Odds API](https://the-odds-api.com/) (required)
- An API key from [OpenAI](https://openai.com/) (optional, for AI insights)

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/betseguro.git
cd betseguro
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Copy the example environment file and configure your environment variables:

```bash
cp .env.example .env.local
```

4. Edit `.env.local` and add your API keys:

```
ODDS_API_KEY=your_odds_api_key_here
OPENAI_API_KEY=your_openai_api_key_here  # Optional
NEXT_PUBLIC_ENABLE_AI_INSIGHTS=true      # Set to false to save on OpenAI costs
```

5. Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Deployment

### Deploy to Vercel

The easiest way to deploy BetSeguro is using [Vercel](https://vercel.com/), the platform built by the creators of Next.js.

1. Create a Vercel account if you don't have one
2. Install the Vercel CLI: `npm i -g vercel`
3. Run `vercel` from the project directory to deploy
4. Set up your environment variables in the Vercel dashboard:
   - `ODDS_API_KEY` (required)
   - `OPENAI_API_KEY` (optional)
   - `NEXT_PUBLIC_ENABLE_AI_INSIGHTS` (set to `true` or `false`)

### Alternative Deployment Options

BetSeguro can also be deployed to any platform that supports Next.js applications:

- [Netlify](https://www.netlify.com/)
- [AWS Amplify](https://aws.amazon.com/amplify/)
- [DigitalOcean App Platform](https://www.digitalocean.com/products/app-platform)
- [Railway](https://railway.app/)

## Production Considerations

- **API Keys**: Ensure your API keys are properly set as environment variables
- **AI Insights**: Set `NEXT_PUBLIC_ENABLE_AI_INSIGHTS=false` if you want to save on OpenAI API costs
- **Performance**: The application uses static fallbacks when OpenAI is unavailable

## License

[MIT](LICENSE)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## Project Structure

```
/app               # Next.js app router pages and layouts
  /predictions     # Predictions page and dynamic game pages
/components        # React components
  /ui              # Shared UI components from shadcn/ui
/lib               # Utility functions and API integrations
  /odds-api.ts     # The Odds API integration
  /team-logos.ts   # Team logo mapping utilities
  /translations.ts # Multilingual text content
/public            # Static assets like images
```

## Acknowledgments

- Data provided by [The Odds API](https://the-odds-api.com/)
- Icons from [Lucide React](https://lucide.dev/)
