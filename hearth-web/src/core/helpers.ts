// converts seconds into MM:SS or M:SS if minutes is in single digits
export function formatTime(inputSeconds: number) {
  const seconds = Math.round(inputSeconds);
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

// eg converts "2023-09-18T05:05:29.470Z" into "September 18, 2023"
export function formatDate(inputDateString: string): string {
  // Parse the input date string into a Date object
  const inputDate = new Date(inputDateString);

  // Define options for formatting the output date
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // Format the Date object into the desired output format
  const formattedDate = inputDate.toLocaleDateString(undefined, options);

  return formattedDate;
}
