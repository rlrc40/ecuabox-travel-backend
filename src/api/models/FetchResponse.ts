type FetchResponse<T> = {
  data?: T;
  errors?: Array<{ message: string }>;
};

export default FetchResponse;
