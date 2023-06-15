const { execSync } = require('child_process');
const fs = require('fs');

const projects = execSync(
  `yarn -s nx print-affected --select projects --base=${process.env.BASE} --head=${process.env.HEAD}`,
)
  .toString('utf-8')
  .trim()
  .split(', ');

const toRun = {
  service1: projects.some((app) => app.includes('dynamic-config')),
  service2: projects.some((app) => app.includes('service-b')),
};

const json = JSON.stringify(toRun);

console.log(json);

fs.writeFile('affected.json', json, function (err) {
  if (err) throw err;
  console.log('complete');
});
