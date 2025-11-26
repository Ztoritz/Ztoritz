document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('login-btn');
    const loginModal = document.getElementById('login-modal');
    const closeBtn = document.getElementById('close-modal');
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('login-error');

    // Open Modal
    loginBtn.addEventListener('click', () => {
        loginModal.classList.add('active');
        usernameInput.focus();
    });

    // Close Modal
    closeBtn.addEventListener('click', () => {
        loginModal.classList.remove('active');
        errorMessage.style.display = 'none';
        loginForm.reset();
    });

    // Close on click outside
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.classList.remove('active');
            errorMessage.style.display = 'none';
            loginForm.reset();
        }
    });

    // Handle Login
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const user = usernameInput.value;
        const pass = passwordInput.value;

        if (user === 'Niklas' && pass === 'xzcdfa1%N') {
            window.location.href = 'basement.html';
        } else {
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'Access Denied';
            // Shake animation effect
            loginForm.classList.add('shake');
            setTimeout(() => loginForm.classList.remove('shake'), 500);
        }
    });
});
