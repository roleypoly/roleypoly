#!/usr/bin/env node

// Usage: create-component.js <type> <kebab-name>

const fs = require('fs');
const path = require('path');
const { camelCase, capitalCase, paramCase, pascalCase } = require('change-case');

const baseDir = path.resolve(__dirname, '..');
const types = ['atom', 'molecule', 'organism', 'template'];

const componentType = process.argv[2];
const name = process.argv[3];
const forceReplace = process.argv[4] === '--force';

if (!types.includes(componentType)) {
  throw new Error(`Invalid component type: ${componentType}`);
}

const typeStoryGroup = `${componentType.replace(
  /^[a-zA-Z]/,
  componentType[0].toUpperCase()
)}s`;

const kebabCaseName = paramCase(name);
const pascalCaseName = pascalCase(name);
const camelCaseName = camelCase(name);
const capitalCaseName = capitalCase(name);

const componentRoot = `${baseDir}/${componentType}s/${kebabCaseName}`;

if (fs.existsSync(componentRoot)) {
  if (!forceReplace) {
    throw new Error(
      `Component already exists: ${pascalCaseName} in ${componentType}s/${kebabCaseName}`
    );
  }

  console.log(`Removing existing component: ${pascalCaseName}`);
  fs.rmSync(componentRoot, { recursive: true });
}

// Make base dir
fs.mkdirSync(componentRoot);

// Write index.ts
const index_ts = `export * from './${pascalCaseName}';\n`;
fs.writeFileSync(`${componentRoot}/index.ts`, index_ts, { encoding: 'utf8' });

// Write component
const component_tsx = `import { ${pascalCaseName}Styled } from './${pascalCaseName}.styled';\n\nexport const ${pascalCaseName} = () => (\n  <${pascalCaseName}Styled>${pascalCaseName}</${pascalCaseName}Styled>\n);\n`;
fs.writeFileSync(`${componentRoot}/${pascalCaseName}.tsx`, component_tsx, {
  encoding: 'utf8',
});

// Write styles
const component_styled_ts = `import styled from 'styled-components';\nexport const ${pascalCaseName}Styled = styled.div\`\`;\n`;
fs.writeFileSync(`${componentRoot}/${pascalCaseName}.styled.ts`, component_styled_ts, {
  encoding: 'utf8',
});

// Write storybook
const component_stories_tsx = `import { ${pascalCaseName} } from './${pascalCaseName}';\n\nexport default {\n  title: '${typeStoryGroup}/${capitalCaseName}',\n  component: ${pascalCaseName},\n};\n\nexport const ${camelCaseName} = (args) => <${pascalCaseName} {...args} />;\n`;
fs.writeFileSync(
  `${componentRoot}/${pascalCaseName}.stories.tsx`,
  component_stories_tsx,
  {
    encoding: 'utf8',
  }
);

// All done!
console.log(`✨ Created ${componentType} '${name}'`);
console.log(`Open it: ${path.resolve(componentRoot)}`);
