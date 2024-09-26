export default function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return date.toLocaleString('en-US', options);
}