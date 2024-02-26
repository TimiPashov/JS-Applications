export function notify(message) {
    const errorBox = document.getElementById('errorBox');
    errorBox.querySelector('span').textContent = message;

    errorBox.style.display = 'block';
    setTimeout(() => errorBox.style.display = 'none', 3000);
}