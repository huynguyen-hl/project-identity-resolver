// scripts/version-docs.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

try {
  // Read version.json
  const versionPath = path.join(__dirname, '..', 'version.json');
  const versionContent = fs.readFileSync(versionPath, 'utf8');
  const { docVersion } = JSON.parse(versionContent);

  if (!docVersion) {
    throw new Error('docVersion not found in version.json');
  }

  // Navigate to the documentation directory
  const docPath = path.join(__dirname, '..', 'documentation');
  process.chdir(docPath);

  // Execute the Docusaurus version command
  execSync(`yarn docusaurus docs:version ${docVersion}`, { stdio: 'inherit' });

  // Output the version in a way that GitHub Actions can capture
  console.log(`::set-output name=doc_version::${docVersion}`);
  // Also echo for normal console output
  console.log(`Successfully created documentation version ${docVersion}`);

  process.exit(0);
} catch (error) {
  console.error('Error creating documentation version:', error.message);
  process.exit(1);
}