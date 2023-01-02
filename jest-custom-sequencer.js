const Sequencer = require('@jest/test-sequencer').default;

class JestCustomSequencer extends Sequencer {
  sort(_tests) {
    const tests = Array.from(_tests);
    return tests.sort((testA, testB) => (testA.path > testB.path ? 1 : -1));
  }
}

module.exports = JestCustomSequencer;
