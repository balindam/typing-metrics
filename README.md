# Typing Metrics

A package to calculate typing metrics such as words per minute (WPM), accuracy, correct words, incorrect words, minimum string distance error rate (MSD), and keystrokes per character (KSPC).

## Installation

```bash
npm install typing-metrics
```

## Usage

```
const calculateMetrics = require('typing-metrics');

const metrics = calculateMetrics('hello world', 'hello world');

console.log(metrics);
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

## License

This project is licensed under the [MIT License](LICENSE).
