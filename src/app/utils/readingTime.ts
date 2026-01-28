/**
 * Calculate estimated reading time for content
 * @param content - The text content to analyze
 * @param wordsPerMinute - Average reading speed (default: 200 wpm)
 * @returns Formatted reading time string
 */
export function calculateReadingTime(content: string, wordsPerMinute = 200): string {
  // Remove MDX/JSX components and code blocks for more accurate word count
  const cleanContent = content
    .replace(/<[^>]*>/g, '') // Remove HTML/JSX tags
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]*`/g, '') // Remove inline code
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // Convert links to text
    .replace(/[#*_~]/g, '') // Remove markdown formatting
    .trim();

  const words = cleanContent.split(/\s+/).filter(word => word.length > 0);
  const wordCount = words.length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);

  if (minutes < 1) {
    return '1 min read';
  }

  return `${minutes} min read`;
}

/**
 * Get word count from content
 * @param content - The text content to analyze
 * @returns Number of words
 */
export function getWordCount(content: string): number {
  const cleanContent = content
    .replace(/<[^>]*>/g, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]*`/g, '')
    .trim();

  return cleanContent.split(/\s+/).filter(word => word.length > 0).length;
}
