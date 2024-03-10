const { calculateMetrics, calculateLevenshteinDistance, calculateKSPC } = require('../src/calculateMetrics');

test('calculateLevenshteinDistance', () => {
    const distance = calculateLevenshteinDistance('kitten', 'sitting');
    expect(distance).toBe(3);
});

test('calculateKSPC', () => {
    const kspc = calculateKSPC('hello world', 'helli world');
    expect(kspc).toBeCloseTo(1.09, 2);
});

test('calculateMetrics', () => {
    const metrics = calculateMetrics('hello world', 'helli world', 60);
    expect(metrics).toEqual({
        wordsPerMinute: expect.any(Number),
        accuracy: expect.any(Number),
        msdErrorRate: expect.any(Number),
        kspc: expect.any(Number)
    });
});
