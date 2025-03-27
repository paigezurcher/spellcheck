// Common word replacements for the humorous spell checker
export const wordReplacements: Record<string, string> = {
    'the': 'da',
    'and': 'n',
    'are': 'r',
    'for': '4',
    'to': '2',
    'you': 'u',
    'this': 'dis',
    'that': 'dat',
    'with': 'wit',
    'your': 'ur',
    'in': 'n',
    'be': 'b',
    'at': '@',
    'not': 'nt',
    'can': 'cn',
    'should': 'shud',
    'would': 'wud',
    'could': 'cud',
    'from': 'frm',
    'they': 'dey',
    'their': 'der',
    'there': 'dere',
    'what': 'wut',
    'when': 'wen',
    'where': 'wer',
    'why': 'y',
    'which': 'wich',
    'one': '1',
    'two': '2',
    'three': '3',
    'four': '4',
    'five': '5'
  };
  
  // Transform text function
  export function transformText(text: string): string {
    // Split text into words
    const words = text.split(/\b/);
    
    // Transform each word
    const transformedWords = words.map(word => {
      // Skip punctuation and whitespace
      if (!/[a-zA-Z]/.test(word)) {
        return word;
      }
      
      // Check if word is in our replacements object (case insensitive)
      const lowerWord = word.toLowerCase();
      if (wordReplacements[lowerWord]) {
        return wordReplacements[lowerWord];
      }
      
      // Random transformations for other words
      if (word.length > 3 && Math.random() > 0.6) {
        const transformations = [
          // Swap letters
          () => {
            const chars = word.split('');
            const idx1 = Math.floor(Math.random() * (chars.length - 1));
            const idx2 = idx1 + 1;
            [chars[idx1], chars[idx2]] = [chars[idx2], chars[idx1]];
            return chars.join('');
          },
          // Replace letters with numbers or similar looking characters
          () => word.replace(/a/g, '4')
                  .replace(/e/g, '3')
                  .replace(/i/g, '1')
                  .replace(/o/g, '0')
                  .replace(/s/g, '5')
                  .replace(/t/g, '7'),
          // Double a random letter
          () => {
            const idx = Math.floor(Math.random() * word.length);
            return word.substring(0, idx) + word[idx] + word.substring(idx);
          },
          // Remove a random vowel
          () => {
            const vowels = [];
            for (let i = 0; i < word.length; i++) {
              if (/[aeiou]/i.test(word[i])) {
                vowels.push(i);
              }
            }
            if (vowels.length > 0) {
              const idx = vowels[Math.floor(Math.random() * vowels.length)];
              return word.substring(0, idx) + word.substring(idx + 1);
            }
            return word;
          },
          // Change ending to common misspellings
          () => {
            if (word.endsWith('ing')) return word.replace(/ing$/, 'in');
            if (word.endsWith('ed')) return word.replace(/ed$/, 'd');
            if (word.endsWith('ly')) return word.replace(/ly$/, 'li');
            if (word.endsWith('tion')) return word.replace(/tion$/, 'shun');
            return word;
          }
        ];
        
        // Choose a random transformation
        const transformFunc = transformations[Math.floor(Math.random() * transformations.length)];
        return transformFunc();
      }
      
      return word;
    });
    
    return transformedWords.join('');
  }
  
  // Create HTML with highlighted words
  export function createHighlightedHTML(originalText: string, transformedText: string): string {
    const origWords = originalText.split(/\b/);
    const transWords = transformedText.split(/\b/);
    
    let html = '';
    
    // Make sure the arrays have the same length
    const minLength = Math.min(origWords.length, transWords.length);
    
    for (let i = 0; i < minLength; i++) {
      if (origWords[i] !== transWords[i] && /[a-zA-Z]/.test(origWords[i])) {
        html += `<span class="highlight" title="Original: ${origWords[i]}">${transWords[i]}</span>`;
      } else {
        html += transWords[i];
      }
    }
    
    return html;
  }
  
  // Generate random statistics for the essay
  export function generateStats() {
    return {
      spellingErrors: Math.floor(Math.random() * 15) + 5,
      grammarIssues: Math.floor(Math.random() * 10) + 1,
      grade: ["C-", "D+", "D", "D-", "F+", "F"][Math.floor(Math.random() * 6)]
    };
  }
