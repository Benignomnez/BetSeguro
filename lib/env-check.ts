/**
 * Validates that all required environment variables are present.
 * For use during app startup to catch configuration issues early.
 */
export function validateEnvVars() {
  const requiredVars = ["ODDS_API_KEY", "OPENAI_API_KEY"];

  const missingVars = requiredVars.filter((varName) => !process.env[varName]);

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(", ")}. ` +
        `Please check your .env file.`
    );
  }

  // Optional check for valid ODDS_API_KEY and OPENAI_API_KEY formats
  const oddsApiKey = process.env.ODDS_API_KEY;
  if (oddsApiKey && oddsApiKey === "your_odds_api_key") {
    console.warn(
      "WARNING: You appear to be using a placeholder ODDS_API_KEY value"
    );
  }

  const openaiKey = process.env.OPENAI_API_KEY;
  if (openaiKey && openaiKey === "your_openai_api_key") {
    console.warn(
      "WARNING: You appear to be using a placeholder OPENAI_API_KEY value"
    );
  }

  return true;
}
