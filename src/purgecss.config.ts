import { customExtractor } from './customExtractor';

export default {
    content: ['input/**/*.html', '!input/ignore/**'],
    css: ['input/**/*.css'],
    output: 'dist/',
    extractors: [
        {
            extractor: customExtractor,
            extensions: ['html', 'js'],
        },
    ],
}; 