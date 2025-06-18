export async function readTime() {
    try {
        const response = await fetch('/time.txt');
        if (!response.ok) throw new Error('File not found');
        const value = await response.text();
        return value.trim();
    } catch (error) {
        return null;
    }
}