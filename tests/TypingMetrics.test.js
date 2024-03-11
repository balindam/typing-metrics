const TypingMetrics = require('../src/TypingMetrics');

test('calculateLevenshteinDistance with same strings', () => {
    const typingMetrics = new TypingMetrics();
    const distance = typingMetrics.calculateLevenshteinDistance('hello', 'hello');
    expect(distance).toBe(0);
});

test('calculateKSPC with exact number of keystrokes', () => {
    const typingMetrics = new TypingMetrics();
    const kspc = typingMetrics.calculateKSPC('hello world', 11);
    expect(kspc).toBe(1);
});

test('calculateMetrics with perfect typing', () => {
    const typingMetrics = new TypingMetrics();
    const metrics = typingMetrics.calculateMetrics('hello world', 'hello world', 60, 11);
    expect(metrics).toEqual({
        wordsPerMinute: 2.2,
        accuracy: 100,
        msdErrorRate: 0,
        kspc: 1
    });
});

test('calculateLevenshteinDistance with one character difference', () => {
    const typingMetrics = new TypingMetrics();
    const distance = typingMetrics.calculateLevenshteinDistance('hello', 'helli');
    expect(distance).toBe(1);
});

test('calculateKSPC with one extra keystroke', () => {
    const typingMetrics = new TypingMetrics();
    const kspc = typingMetrics.calculateKSPC('hello world', 12);
    expect(kspc).toBeCloseTo(1.09, 2);
});

test('calculateMetrics with one character mistake', () => {
    const typingMetrics = new TypingMetrics();
    const metrics = typingMetrics.calculateMetrics('hello world', 'helli world', 60, 12);
    expect(metrics).toEqual({
        wordsPerMinute: 2.2,
        accuracy: 90.91,
        msdErrorRate: 0.09,
        kspc: 1.09
    });
});
