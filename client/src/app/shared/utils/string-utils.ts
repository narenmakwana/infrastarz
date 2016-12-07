export class StringUtils {
  public static isEmpty(str: string): boolean {
    return StringUtils.isNull(str) || str === '';
  }

  public static isNull(obj: any): boolean {
    return obj === undefined || obj === null;
  }

  public static isNumeric(str: any): boolean {
    if(this.isEmpty(str)) {
      return false;
    }
    return !isNaN(str - parseFloat(str)); // From jQuery (https://github.com/jquery/jquery/blob/25d8ccd1112d75394b91071ff7eba13283aaf898/src/core.js#L223)
  }

  public static replaceBetween(str: string, replaceWith: string, start: number, end: number): string {
    return str.substring(0, start) + replaceWith + str.substring(end);
  }
}
