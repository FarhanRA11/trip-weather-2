export default function formatTime(time13) {
    return new Date(time13).toLocaleString(
        'en-US', {
        dateStyle: 'medium',
        timeStyle: 'medium',
        hour12: false
    })
}