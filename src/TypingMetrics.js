class TypingMetrics {
    constructor() {}

    /**
     * Function to calculate Levenshtein distance
     * @param {string} text - The original text
     * @param {string} typedText - The text that the user actually typed
     * @returns {number} The Levenshtein distance between the original text and the typed text
     */
    calculateLevenshteinDistance(text, typedText) {
        const lenText = text.length;
        const lenTypedText = typedText.length;

        let dp = Array.from({ length: lenText + 1 }, () => Array(lenTypedText + 1).fill(0));
        for (let i = 0; i <= lenText; i++) {
            for (let j = 0; j <= lenTypedText; j++) {
                if (i == 0) {
                    dp[i][j] = j;
                } else if (j == 0) {
                    dp[i][j] = i;
                } else if (text[i - 1] == typedText[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = 1 + Math.min(dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1]);
                }
            }
        }
        return dp[lenText][lenTypedText];
    }

    /**
     * Function to calculate KSPC (Keystrokes per Character)
     * @param {string} text - The original text
     * @param {string} typedText - The text that the user actually typed
     * @returns {number} The average number of keystrokes per character
     */
    calculateKSPC(text, typedText) {
        let keystrokes = 0;
        for (let i = 0; i < text.length; i++) {
            if (i < typedText.length && text[i] != typedText[i]) {
                keystrokes += 2; // one for backspace and one for retype
            } else {
                keystrokes += 1;
            }
        }
        return keystrokes / text.length;
    }

    /**
     * Main function to calculate metrics
     * @param {string} text - The original text that the user is supposed to type
     * @param {string} typedText - The text that the user actually typed
     * @param {number} timeInSeconds - The time it took the user to type the text, in seconds
     * @returns {Object} An object with the following properties:
     *  - wordsPerMinute: The typing speed of the user in words per minute
     *  - accuracy: The percentage of characters that were typed correctly
     *  - msdErrorRate: The minimum string distance error rate, which is a measure of the typing errors
     *  - kspc: The average number of keystrokes per character
     */
    calculateMetrics(text, typedText, timeInSeconds) {
        const lenText = text.length;
        const lenTypedText = typedText.length;

        // Calculate MSD error rate
        const msdErrorRate = this.calculateLevenshteinDistance(text, typedText) / lenText;

        // Calculate KSPC
        const kspc = this.calculateKSPC(text, typedText);

        // Calculate words per minute
        const wordsPerMinute = (lenTypedText / 5) / (timeInSeconds / 60);

        // Calculate accuracy
        const accuracy = (1 - msdErrorRate) * 100;

        return {
            wordsPerMinute,
            accuracy,
            msdErrorRate,
            kspc
        };
    }
}

module.exports = TypingMetrics;