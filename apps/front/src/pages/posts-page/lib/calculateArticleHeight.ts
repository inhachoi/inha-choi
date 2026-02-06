export const calculateArticleHeight = () => {
  const width = typeof window !== "undefined" ? window.innerWidth : 1024;

  if (width <= 480) {
    return 57;
  } else if (width <= 768) {
    return 83;
  } else {
    return 120;
  }
};
