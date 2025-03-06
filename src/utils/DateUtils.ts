// src/utils/DateUtils.ts

class DateUtils {
  // Formats a date as "YYYY-MM-DD"
  static formatDate(date: Date | string | number): string {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date provided.");
    }
    const year: number = date.getFullYear();
    // Months in JavaScript are zero-indexed.
    const month: string = String(date.getMonth() + 1).padStart(2, "0");
    const day: string = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // Trims a date string (if needed) or any custom logic you want
  static trimDateString(dateString: string): string {
    // Example: Remove any extra time info and return only the date portion
    // Assumes dateString is in format "YYYY-MM-DD HH:MM:SS"
    return dateString.split(" ")[0];
  }
}

export default DateUtils;
