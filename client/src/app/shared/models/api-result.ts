export class ApiResult {
  public success: boolean;
  public result: any;

  constructor(data: any) {
    if(data.message) {
      this.success = data.message.success;
      if(this.success) {
        this.result = data.message.result;
      } else {
        this.result = data.message.error;
      }
    } else if(data.success) {
      this.success = data.success;
      if(this.success) {
        this.result = data.result;
      } else {
        this.result = data.error;
      }
    } else {
      this.success = false;
      this.result = data;
    }
  }
}
