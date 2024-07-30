/** svg タグに props を追加する */
export const addPropsToElement = (fileContent: string) => {
  const result = fileContent.replace(
    /<svg(\s+[^>]+)?\s*>/g,
    "<svg$1 {...props}>"
  );
  return result;
};
