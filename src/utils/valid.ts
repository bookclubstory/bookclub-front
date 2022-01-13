import axiosConfig from "@utils/axiosConfig";

export const isEmpty = (str: string) => {
  if (typeof str === "undefined" || str === null || str === "") return true;
  else return false;
};

export const isNotEmpty = (str: string) => {
  if (typeof str === "undefined" || str === null || str === "") return false;
  else return true;
};

