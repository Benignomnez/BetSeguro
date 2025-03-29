/**
 * This utility checks that all required environment variables are present
 * It should be run at startup to catch missing configuration early
 */

// List of required environment variables
const requiredEnvVars = [
  "ODDS_API_KEY",
  // OpenAI is optional if we're using fallbacks
  // 'OPENAI_API_KEY',
];

// Check all environment variables
export function validateEnvVars(): void {
  const missingVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(", ")}`
    );
  }
}

// Check if AI insights are enabled via environment variable
export function isAiInsightsEnabled(): boolean {
  return process.env.NEXT_PUBLIC_ENABLE_AI_INSIGHTS === "true";
}

// Check if we can make API calls to OpenAI
export function canUseOpenAI(): boolean {
  return Boolean(process.env.OPENAI_API_KEY) && isAiInsightsEnabled();
}
