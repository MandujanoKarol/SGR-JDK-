///funcion de mensaje de error firebase
function mensajeError(codigo) { 
    let mensaje = ''; 
    switch(codigo) {
        case 'auth/wrong-password':
          mensaje = 'Su contraseña no es correcta';
          break;
        case 'auth/user-not-found':
            mensaje = 'El usuario no existe o el correo no esta registrado';
            break;
        case 'auth/weak-password':
            mensaje = 'Contraseña débil debe tener al menos 6 caracteres';
            break;
        case 'auth/network-request-failed':
            mensaje = 'A network error (such as timeout, interrupted connection or unreachable host) has occurred.';
            break;
        case 'auth/weak-password':
            mensaje = 'Password should be at least 6 characters';
            break;
        case 'auth/email-already-in-use':
            mensaje = 'The email address is already in use by another account.';
            break;
        default:
            mensaje = 'Ocurrió un error al ingresar con este usuario';
      }
    return mensaje;
}
async function floatingMessage(title,message,type){
    if(type=="firebase"){ 
        setTimeout(function () {
            toastr.options = {
                closeButton: true,
                progressBar: true,
                showMethod: 'slideDown',
                timeOut: 4000
            };
            toastr.error(mensajeError(title),title);
        }, 1300);
    }else if(type=="success"){
        setTimeout(function () {
            toastr.options = {
                closeButton: true,
                progressBar: true,
                showMethod: 'slideDown',
                timeOut: 4000
            };
            toastr.success(message,title);
        }, 1300);
    }else if(type=="error"){
        setTimeout(function () {
            toastr.options = {
                closeButton: true,
                progressBar: true,
                showMethod: 'slideDown',
                timeOut: 4000
            };
            toastr.error(message,title);
        }, 1300);
    }else if(type=="registeruser"){
        setTimeout(function () {
            toastr.options = {
                closeButton: true,
                progressBar: true,
                showMethod: 'slideDown',
                timeOut: 4000,
                onclick: function() {console.log('you clicked on the info toaster n.1')}
            };
            toastr.success(message,title);
        }, 1300);
    }
    
}