const container = document.querySelector('#container');

(() => {
    const token = window.location.pathname.split('/resetPassword/')[1];

    if (!token) {
        container.innerHTML = `
        <form class="flex flex-col bg-violet-200 p-4 shadow-lg rounded-lg gap-4 dark:bg-slate-500 dark:text-zinc-50">
            <h1 class="text-lg">Escribe tu correo, para la verificación de la contraseña</h1>
            <label for="email-input" class="font-bold" >Email</label>
            <input type="email" id="email-input" class="rounded-lg p-2 bg-zinc-100 focus:outline-violet-700 dark:bg-zinc-200 dark:focus:bg-violet-300">
            <button 
            id="form-btn"
            class="bg-violet-700 py-2 px-4 rounded-lg font-bold text-white  hover:bg-violet-800 text-center transition ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            >
            Enviar correo
            </button>
        </form>
        `;
    }
})();


const form = container.children[0];
const emailInput = form.children[2];

form.addEventListener('submit', async e => {
    e.preventDefault();
    
    try {
        await axios.post('/api/resetPassword', { email: emailInput.value });
        container.innerHTML = `
        <div class="flex flex-col bg-violet-200 p-4 shadow-lg rounded-lg gap-4 dark:bg-slate-500 dark:text-zinc-50">
        <h1 class="text-lg">Se te ha enviado un correo electronico para recuperar tu contraseña</h1>
        `;

    } catch (error) {
        console.log(error);
    }
});

