export function timeAgo(date: Date | string | undefined) {
    if (!date) return "just now";
    const now = new Date().getTime();
    const past = new Date(date).getTime();

    const diff = Math.abs(now - past);

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) return `About ${years} year${years > 1 ? "s" : ""} ago`;
    if (months > 0) return `About ${months} month${months > 1 ? "s" : ""} ago`;
    if (days > 0) return `About ${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `About ${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (minutes > 0) return `About ${minutes} minute${minutes > 1 ? "s" : ""} ago`;

    return "just now";
}
