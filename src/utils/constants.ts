export const MONO_API_URL: string =
  process.env?.REACT_APP_MONO_URL || "http://localhost:3000";
export const MICRO_API_URL: string =
  process.env?.REACT_APP_MICRO_URL || "http://localhost";
export const isMicro: boolean =
  process.env?.REACT_APP_CN === "micro" ? true : false;
