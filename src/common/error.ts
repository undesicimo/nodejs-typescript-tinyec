export class APIError {
  constructor(private readonly data: { code: number; message: string }) {}
  get code() {
    return this.data.code;
  }
  get message() {
    return this.data.message;
  }
}
