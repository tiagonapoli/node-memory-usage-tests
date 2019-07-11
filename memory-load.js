#!/bin/sh
":" //# Execute node with increased memory size; exec /usr/bin/env node --max-old-space-size=1024 "$0" "$@"

const sleep = ms => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};

const init = async () => {
  console.log("Will run node child");
  const KB = 1000;
  const MB = 1000 * KB;
  const GB = 1000 * MB;

  const a = "a".repeat(GB);
  a.indexOf(1);
  const used = process.memoryUsage().heapUsed / 1024 / 1024;
  console.log(
    `The script uses approximately ${Math.round(used * 100) / 100} MB`
  );

  await sleep(10000);
  console.log("Ended node child");
};

init();
