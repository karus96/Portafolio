function ValidacionDeDatos() {
    let nombre = document.getElementById("txtNombre").value;
    let email = document.getElementById("txtEmail").value;
    let asunto = document.getElementById("txtAsunto").value;
    let mensaje = document.getElementById("txtMensaje").value;
    let cNombre =   ValidarTamañoTexto(nombre,"nombre",document.getElementById("txtNombreError"),50);
    let cEmail = ValidarEmail(email);
    let cAsunto = ValidarTamañoTexto(asunto,"asunto",document.getElementById("txtAsuntoError"),50);
    let cMensaje = ValidarTamañoTexto(mensaje,"mensaje",document.getElementById("txtMensajeError"),300);  
    var templateParams = {
        txtNombre: nombre,
        txtAsunto: asunto,
        txtMensaje: mensaje,
        txtEmail: email
    };
    if(cNombre&& cEmail && cAsunto && cMensaje){
       EnviarMensaje(templateParams);
    }
}
function RecargarPagina(){
    location.reload();
}
function ValidarEmail(email) {
    let error = document.getElementById("txtEmailError")    
    let expReg= /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    if (!expReg.test(email)){        
        error.innerHTML="La dirección de email es incorrecta!";
        return false;
    }
    error.innerHTML="";
    return true;
}
function ValidarTamañoTexto(texto,textoAMostrar,error,limite){     
    if(texto.length<=0){
        error.innerHTML="El "+textoAMostrar+" no puede esta vacio! &#9888"
        return false;
    }
    if(texto.length>limite){
        error.innerHTML="El "+textoAMostrar+" es muy largo! &#9888"
        return false;
    }    
    error.innerHTML="";
    return true;
}
function EnviarMensaje(templateParams){        
    let btn = document.getElementById('button');
    btn.innerHTML = 'Enviando...';
    const serviceID = 'default_service';
    const templateID = 'template_sp4naar'; 
    emailjs.send(serviceID, templateID, templateParams, 'XtFPFPjnD0q5AsOjH')
    .then(() => {
        btn.innerHTML = 'Enviar mensaje';       
        alert("Se ha enviado un mensjae");
        window.setTimeout(RecargarPagina(), 2000);
    }, (err) => {
        btn.innerHTML = 'Enviar mensaje';
        console.log(JSON.stringify(err));
    });
}
