const pidusage = require("pidusage");
const execa = require("execa");
const path = require("path");
const wtf = require('wtfnode')

const printStats = (header, stats) => {
  if (header) console.log(header);
  const obj = {
    cpu: stats.cpu.toFixed(2),
    memory: (stats.memory / (1000 * 1000)).toFixed(2)
  };

  console.log(obj);
  console.log("\n");
};

const fatherInterval = setInterval(() => {
  pidusage(process.pid, (err, stats) => {
    printStats("=== Father ===", stats);
  });
}, 1000);

const testNode = async () => {
  const p = path.join(__dirname, "memory-load.js");
  const proc = execa(p);
  proc.all.pipe(process.stdout);

  const interval = setInterval(() => {
    pidusage(proc.pid, (err, stats) => {
      printStats("=== Node Son ===", stats);
    });
  }, 2000);

  const res = await proc;
  console.log(res);

  clearInterval(interval);
};

const testStress = async () => {
  const p = path.join(__dirname, "memory-load.py");
  const proc = execa(p);
  proc.all.pipe(process.stdout);

  const interval = setInterval(() => {
    pidusage(proc.pid, (err, stats) => {
      printStats("=== Python Son ===", stats);
    });
  }, 2000);

  const res = await proc;
  console.log(res);

  clearInterval(interval);
};

const go = async () => {
  await testNode();
  await testStress();
  const timeout = setTimeout(() => {
    clearInterval(fatherInterval);
    clearInterval(timeout)
    pidusage.clear()
    wtf.dump()
  }, 4000);

};

module.exports = go