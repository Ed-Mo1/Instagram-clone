export function timeAgo(date: number): string {
  const now = new Date();
  const diff = now.getTime() - date;

  if (diff < 1000) {
    return "just now";
  }

  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) {
    return `${seconds} second${seconds === 1 ? "" : "s"} ago`;
  }

  const minutes = Math.floor(diff / (1000 * 60));
  if (minutes < 60) {
    return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  }

  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours < 24) {
    return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  return `${days} day${days === 1 ? "" : "s"} ago`;
}
