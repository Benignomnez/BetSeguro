#!/usr/bin/env node

/**
 * This script fixes dependency issues before the build process
 * It's specifically needed for the date-fns conflict with react-day-picker
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Running fix-dependencies script...');

// Path to package.json
const packageJsonPath = path.join(__dirname, '..', 'package.json');

try {
    // Read package.json
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    // Check if date-fns is at version 4
    if (packageJson.dependencies['date-fns'] &&
        packageJson.dependencies['date-fns'].startsWith('4')) {
        console.log('⚠️ Found incompatible date-fns version 4.x.x');

        // Update to a compatible version
        packageJson.dependencies['date-fns'] = '2.30.0';
        console.log('✅ Updated date-fns to version 2.30.0');

        // Write the updated package.json
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
        console.log('📝 Updated package.json file');
    } else {
        console.log('✅ date-fns version is already compatible');
    }

    console.log('✅ Dependencies fixed successfully');
} catch (error) {
    console.error('❌ Error fixing dependencies:', error);
    process.exit(1);
} 