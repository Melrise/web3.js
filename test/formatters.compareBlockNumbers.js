const chai = require('chai');
const assert = chai.assert;
const BN = require('bn.js');
const formatters = require('../packages/web3-core-helpers/src/formatters.js');

const pending = "pending";
const latest = "latest";
const genesis = "genesis";
const earliest = "earliest";

const tests = [
    // Base cases for numbers
    { input: {a: 1, b: 1}, result: 0 },
    { input: {a: 1, b: 2}, result: -1 },
    { input: {a: 2, b: 1}, result: 1 },
    // Base cases for BN
    { input: {a: new BN(1), b: new BN(1)}, result: 0 },
    { input: {a: new BN(1), b: new BN(2)}, result: -1 },
    { input: {a: new BN(2), b: new BN(1)}, result: 1 },
    // Base cases for numbers vs BN
    { input: {a: new BN(1), b: 1}, result: 0 },
    { input: {a: new BN(1), b: 2}, result: -1 },
    { input: {a: new BN(2), b: 1}, result: 1 },
    { input: {a: 1, b: new BN(1)}, result: 0 },
    { input: {a: 1, b: new BN(2)}, result: -1 },
    { input: {a: 2, b: new BN(1)}, result: 1 },
    // Base cases for strings
    { input: {a: genesis, b: genesis}, result: 0 },
    { input: {a: earliest, b: earliest}, result: 0 },
    { input: {a: latest, b: latest}, result: 0 },
    { input: {a: pending, b: pending}, result: 0 },
    // Complex Strings
    { input: {a: earliest, b: genesis}, result: 0 },
    { input: {a: genesis, b: earliest}, result: 0 },
    { input: {a: earliest, b: 2}, result: -1 },    
    { input: {a: 2, b: earliest}, result: 1 },
    { input: {a: earliest, b: 2}, result: -1 },
];

describe('formatters', function () {
    describe('compare blocknumbers', function () {
        tests.forEach(function(test){
            it('should return the correct value', function () {
                assert.deepEqual(formatters.compareBlockNumbers(test.input.a, test.input.b), test.result);
            });
        });
    });

    describe('compare blocknumbers - inverted', function () {
        tests.forEach(t => {
            // flip
            [t.input.a, t.input.b] = [t.input.b, t.input.a];
            // opposite
            if (t.result != 0) {
                t.result = t.result * -1;
            }
        })
        tests.forEach(function(test){
            it('should return the correct value', function () {
                assert.deepEqual(formatters.compareBlockNumbers(test.input.a, test.input.b), test.result);
            });
        });
    });
});