# Typing Metrics

An NPM package to calculate typing metrics such as words per minute (WPM), accuracy, correct words, incorrect words, minimum string distance error rate (MSD), and keystrokes per character (KSPC).

## Installation

```bash
npm install typing-metrics
```

## Usage

```
const TypingMetrics = require('typing-metrics');

/*
 * Create an instance of TypingMetrics
 */
const typingMetrics = new TypingMetrics();

/*
 * The calculateMetrics method takes three arguments:
 * 1. text: The original text that the user is supposed to type.
 * 2. typedText: The text that the user actually typed.
 * 3. timeInSeconds: The time it took the user to type the text, in seconds.
 */
const metrics = typingMetrics.calculateMetrics('hello world', 'helli world', 60);

/*
 * The calculateMetrics method returns an object with the following structure:
 * {
 *   wordsPerMinute: <number>, // The typing speed of the user in words per minute
 *   accuracy: <number>, // The percentage of characters that were typed correctly
 *   msdErrorRate: <number>, // The minimum string distance error rate, which is a measure of the typing errors
 *   kspc: <number> // The average number of keystrokes per character
 * }
 */

// You can destructure the returned object to get these metrics:
const { wordsPerMinute, accuracy, msdErrorRate, kspc } = metrics;

console.log(`Words per minute: ${wordsPerMinute}`);
console.log(`Accuracy: ${accuracy}%`);
console.log(`MSD error rate: ${msdErrorRate}`);
console.log(`KSPC: ${kspc}`);

```

## Algorithm

### Minimum String Distance Error Rate (MSD)

The MSD error rate is calculated using the Levenshtein distance algorithm. The Levenshtein distance between two strings is the minimum number of single-character edits (insertions, deletions, or substitutions) required to change one string into the other.

In this package, the Levenshtein distance is normalized by the length of the original text to calculate the MSD error rate.

### Keystrokes Per Character (KSPC)

The KSPC is calculated by counting the number of keystrokes needed to type the text. If there is a mismatch between the typed character and the original character, it is counted as two keystrokes: one for the backspace and one for the retype. The total number of keystrokes is then divided by the total number of characters in the original text to calculate the KSPC.

### Words Per Minute (WPM)

The WPM is calculated by counting the number of words in the typed text (a word is defined as five characters including spaces and punctuation), dividing by the time taken to type the text in seconds, and then multiplying by 60 to convert to minutes.

### Accuracy

The accuracy is calculated as (1 - MSD error rate) * 100, which gives the percentage of characters that were typed correctly.

#### References

[Error Analysis](https://en.wikipedia.org/wiki/Typing#Error_analysis "https://en.wikipedia.org/wiki/Typing#Error_analysis")

## Todo

* [ ] Improve KSPC logic
* [ ] Research more around how to find accuracy metric
* [ ] Check if WPM formula can be improved
* [X] Add tests
* [ ] Give different words different weights: basic words like "it", "the", "a" etc. should be given less weigh than difficult words like "childhood" etc.. (BRAINSTORM more)

## License

This project is licensed under the [MIT License](LICENSE).
