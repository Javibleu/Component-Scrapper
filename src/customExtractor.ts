export const customExtractor = (content: string) => {
    return content.match(/[\w-/:]+(?<!:)/g) || [];
};