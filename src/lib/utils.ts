export interface IResponse {
  success: boolean;
  errorMessage?: string;
}

export const createResponseObject = (
  success: boolean,
  errorMessage?: string
): IResponse => {
  return {
    success,
    errorMessage,
  };
};

export const convertToAscii = (inputString: string) => {
  // remove non ascii characters
  const asciiString = inputString.replace(/[^\x00-\x7F]+/g, '');
  return asciiString;
};
