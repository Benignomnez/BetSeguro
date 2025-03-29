# BetSeguro

BetSeguro is an AI-powered sports prediction platform that helps users make data-driven betting decisions with high accuracy. The application provides real-time predictions for MLB and NBA games, with detailed analysis and insights.

## Features

- **AI-Powered Predictions**: Advanced machine learning models analyze thousands of data points to predict game outcomes
- **Multilingual Support**: Toggle between English and Spanish interfaces
- **Real-time Updates**: Data refreshes every 5 minutes with the latest odds and statistics
- **Detailed Game Analysis**: Comprehensive breakdown of matchups with win probabilities
- **Team Statistics**: Access detailed team performance metrics to inform betting decisions
- **Responsive Design**: Optimized for both mobile and desktop viewing

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Shadcn UI components
- **Data Fetching**: The Odds API integration
- **State Management**: React Context API
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- pnpm (recommended) or npm/yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Benignomnez/BetSeguro.git
   cd BetSeguro
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Create a `.env.local` file in the root directory with your API key:
   ```
   ODDS_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

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

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Data provided by [The Odds API](https://the-odds-api.com/)
- Icons from [Lucide React](https://lucide.dev/)
