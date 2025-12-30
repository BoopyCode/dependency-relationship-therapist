#!/usr/bin/env node

// Dependency Relationship Therapist
// Because your packages need couples counseling more than you do

const fs = require('fs');
const path = require('path');

function diagnosePackage(packagePath = './package.json') {
    try {
        const raw = fs.readFileSync(packagePath);
        const pkg = JSON.parse(raw);
        
        console.log('\n🔍 *Therapist voice*: Let\'s unpack your emotional baggage...\n');
        
        // Check for obvious red flags
        const deps = pkg.dependencies || {};
        const devDeps = pkg.devDependencies || {};
        
        const allDeps = { ...deps, ...devDeps };
        
        // Look for version conflicts (same package in both deps and devDeps)
        const conflicts = [];
        for (const dep in deps) {
            if (devDeps[dep]) {
                conflicts.push(`${dep}: \"${deps[dep]}\" (deps) vs \"${devDeps[dep]}\" (devDeps)`);
            }
        }
        
        if (conflicts.length > 0) {
            console.log('🚩 Relationship Issues Found:');
            conflicts.forEach(c => console.log(`  • ${c}`));
            console.log('\n💡 Therapist advice: Pick one version and commit. Polyamory doesn\'t work here.\n');
        } else {
            console.log('✅ No obvious version conflicts found.');
            console.log('\n💭 Therapist note: The real issues are probably deeper. Try `npm ls` for family drama.\n');
        }
        
        // Check for suspicious patterns
        const suspicious = Object.entries(allDeps).filter(([name, version]) => {
            return version.includes('^') || version.includes('~') || version === '*';
        });
        
        if (suspicious.length > 0) {
            console.log('⚠️  Commitment Issues:');
            suspicious.forEach(([name, version]) => {
                console.log(`  • ${name}: \"${version}\" (afraid to commit to a specific version)`);
            });
            console.log('\n💡 Therapist advice: Pin your versions. Fear of commitment causes deployment anxiety.\n');
        }
        
        console.log('\n🧘 Session complete. Remember: `rm -rf node_modules && npm install` is the couples retreat of package management.\n');
        
    } catch (error) {
        console.error('\n😱 THERAPIST PANIC: Cannot read your package.json. Are you in denial about your dependencies?\n');
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    diagnosePackage(process.argv[2]);
}

module.exports = { diagnosePackage };