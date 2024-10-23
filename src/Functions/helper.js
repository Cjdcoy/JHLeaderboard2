export const capitalize = (str) =>
  str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();

export const getFpsNoun = (src) =>
  src === "0" ? "mix" : src === "999" ? "all" : src;
