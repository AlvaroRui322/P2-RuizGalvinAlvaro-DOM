// funciones.js

export function validarCampo(campo) {
    const mensaje = campo.nextElementSibling;
    if (campo.value.trim() === '') {
        campo.classList.add('border-red-500');
        mensaje.textContent = `${campo.name} es obligatorio`;
        return false;
    } else {
        campo.classList.remove('border-red-500');
        mensaje.textContent = '';
        return true;
    }
}

export function validarFormulario(form) {
    const nombre = form.querySelector('#nombre');
    const email = form.querySelector('#email');
    const telefono = form.querySelector('#telefono');
    const empresa = form.querySelector('#empresa');

    return validarCampo(nombre) && validarCampo(email) && validarCampo(telefono) && validarCampo(empresa);
}

