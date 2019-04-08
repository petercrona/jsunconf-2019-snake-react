import zip from "ramda/es/zip";
import range from "ramda/es/range";

export const withIndex = (xs: any[]) => zip(range(0, xs.length), xs);
export const getSeed = () => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);