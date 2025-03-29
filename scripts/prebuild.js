#!/usr/bin/env node

/**
 * Pre-build validation script
 * 
 * This script runs before the production build to ensure all 
 * required configuration is in place
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Check if .env.local exists or .env
const envPath = fs.existsSync('.env.local')
    ? '.env.local'
    : fs.existsSync('.env')
        ? '.env'
        : null;

// Colors for console output
const colors = {
    reset: "\x1b[0m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
};

console.log(`${colors.blue}=== BetSeguro Pre-build Validation ===${colors.reset}\n`);

// Check for required environment variables
const requiredEnvVars = [
    'ODDS_API_KEY',
];

// Check environment variables
if (envPath) {
    console.log(`${colors.green}✓${colors.reset} Environment file found at ${envPath}`);

    // Read .env file
    const envFile = fs.readFileSync(envPath, 'utf8');
    const envVars = {};

    // Parse .env file
    envFile.split('\n').forEach(line => {
        const match = line.match(/^([^#=]+)=(.*)$/);
        if (match) {
            const key = match[1].trim();
            const value = match[2].trim().replace(/^['"](.*)['"]$/, '$1');
            envVars[key] = value;
        }
    });

    // Check required vars
    let missingVars = [];
    requiredEnvVars.forEach(key => {
        if (!envVars[key] || envVars[key] === 'your_odds_api_key_here') {
            missingVars.push(key);
        }
    });

    if (missingVars.length > 0) {
        console.log(`${colors.red}✗${colors.reset} Missing or invalid required environment variables:`);
        missingVars.forEach(v => console.log(`  ${colors.yellow}→${colors.reset} ${v}`));
        console.log(`\nPlease update your ${envPath} file with valid values.`);
        process.exit(1);
    } else {
        console.log(`${colors.green}✓${colors.reset} All required environment variables present`);
    }

    // Check optional AI configuration
    if (envVars['NEXT_PUBLIC_ENABLE_AI_INSIGHTS'] === 'true') {
        if (!envVars['OPENAI_API_KEY'] || envVars['OPENAI_API_KEY'] === 'your_openai_api_key_here') {
            console.log(`${colors.yellow}!${colors.reset} AI insights are enabled but OPENAI_API_KEY is missing or invalid`);
            console.log(`${colors.yellow}!${colors.reset} The app will fall back to static insights`);
        } else {
            console.log(`${colors.green}✓${colors.reset} OpenAI API key configured for AI insights`);
        }
    } else {
        console.log(`${colors.cyan}i${colors.reset} AI insights are disabled, using static predictions`);
    }
} else {
    console.log(`${colors.red}✗${colors.reset} No environment file found (.env.local or .env)`);
    console.log(`${colors.yellow}→${colors.reset} Please create a .env.local file based on .env.example`);
    process.exit(1);
}

// Check public directory structure
const publicDir = path.join(__dirname, '..', 'public');
if (fs.existsSync(publicDir)) {
    console.log(`${colors.green}✓${colors.reset} Public directory exists`);

    // Check for placeholder logo
    if (!fs.existsSync(path.join(publicDir, 'placeholder.svg'))) {
        console.log(`${colors.yellow}!${colors.reset} Missing placeholder.svg in public directory (used for team logos)`);
    }

    // Check for OG image (used for social media sharing)
    if (!fs.existsSync(path.join(publicDir, 'og-image.png'))) {
        console.log(`${colors.yellow}!${colors.reset} Missing og-image.png in public directory (used for social media sharing)`);
    }
} else {
    console.log(`${colors.red}✗${colors.reset} Public directory not found`);
    process.exit(1);
}

console.log(`\n${colors.green}Pre-build validation complete!${colors.reset}`);
console.log(`${colors.blue}Starting build process...${colors.reset}\n`); 