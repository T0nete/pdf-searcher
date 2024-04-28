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
