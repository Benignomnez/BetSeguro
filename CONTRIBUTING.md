# Contributing to BetSeguro

Thank you for considering contributing to BetSeguro! This document outlines the process for contributing to the project.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

## How Can I Contribute?

### Reporting Bugs

- Check if the bug has already been reported in the Issues section
- Use the bug report template to create a new issue
- Include detailed steps to reproduce the bug
- Specify what you expected to happen and what actually happened
- Include screenshots if applicable

### Suggesting Features

- Check if the feature has already been suggested in the Issues section
- Use the feature request template to create a new issue
- Describe the feature in detail and why it would be valuable

### Code Contribution

1. Fork the repository
2. Clone your fork locally
3. Create a new branch for your feature/fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. Make your changes
5. Run the tests and linters:
   ```bash
   pnpm lint
   pnpm test
   ```
6. Commit your changes with a descriptive message:
   ```bash
   git commit -m "Add feature: your feature description"
   ```
7. Push to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
8. Create a Pull Request to the main repository

## Development Setup

1. Make sure you have Node.js 18.17 or later installed
2. Install pnpm globally if you haven't already:
   ```bash
   npm install -g pnpm
   ```
3. Install dependencies:
   ```bash
   pnpm install
   ```
4. Copy `.env.example` to `.env.local` and fill in any required values
5. Start the development server:
   ```bash
   pnpm dev
   ```

## Style Guidelines

- Follow the existing code style
- Use TypeScript for all new files
- Write meaningful commit messages
- Update documentation when necessary

## Pull Request Process

1. Update the README.md or documentation with details of changes if applicable
2. Make sure your code has appropriate test coverage
3. The PR should work for all supported browsers
4. Your PR will be reviewed by maintainers who may request changes

## Questions?

If you have any questions, feel free to create an issue with the "question" label.
