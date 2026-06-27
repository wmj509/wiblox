document.addEventListener('DOMContentLoaded', function() {

    const form = document.getElementById('registerForm');
    
    if (!form) {
        console.error("No se encontró el formulario");
        return;
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const submitBtn = document.querySelector('.btn-submit');
        const registerCard = document.getElementById('registerCard');
        const welcomeCard = document.getElementById('welcomeCard');
        const welcomeTitle = document.getElementById('welcomeTitle');

        const nombre = document.getElementById('nombre').value.trim();

        const originalText = submitBtn.textContent;
    //verificacion recaptcha
    let captcha = grecaptcha.getResponse();
    if (captcha == "")
    {
alert ("Completar el recaptcha.");
return;

    }

        submitBtn.disabled = true;
        submitBtn.textContent = "Enviando...";

        const formData = {
            nombre: nombre,
            apellido: document.getElementById('apellido').value,
            email: document.getElementById('email').value,
            telefono: document.getElementById('telefono').value || "No proporcionado",
            asunto: document.getElementById('asunto').value,
            mensaje: document.getElementById('mensaje').value,
        };

        emailjs.send("service_6jjnzlq", "template_zew7xwr", formData)
            .then(function(response) {
                console.log("Mensaje enviado exitosamente!");

                registerCard.classList.add('fade-out');

                setTimeout(() => {
                    registerCard.style.display = 'none';
                    
                    // Personalizar con el nombre
                    if (nombre) {
                        welcomeTitle.textContent = `¡Mensaje Enviado, ${nombre}!`;
                    }
                    
                    welcomeCard.classList.remove('hidden');
                    welcomeCard.classList.add('fade-in');
                }, 600);

            })
            .catch(function(error) {
                console.error("Error al enviar:", error);
                alert("Hubo un error al enviar tu mensaje. Por favor intenta de nuevo.");
                
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            });
    });
});

function resetForm() {
    location.reload();
}