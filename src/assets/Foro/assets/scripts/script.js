//DATOS PERSONALES:

let idP;
let aliasP;
let permisoP;
let foroA;
let nombreP;
let fotoA;
let Usuario_Logueado = null;


//PARA SACAR LOS TEMAS DE LOS FOROS EN EL NAV (ONLOAD CUANDO SE CIERRA LA MODAL DE LOGIN/REGISTRO/SEGUIR COMO INVITADO)

function fSacarTemas() {

    const URL = "assets/php/servidor.php?peticion=CargarTemas";
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {

            console.log(data);
            
            let html = "";
        

            if ( Usuario_Logueado != null &&  Usuario_Logueado.usu_permiso==1){
            html+=`<div id="anadirTema" onclick="fModalTema()"><i id="at" class="fa fa-plus-circle" title="Añadir Tema"></i></div>`;
            }
           
           

            for (i = 0; i < data.length; i++) {

                html += `<div class="contenedorNav">`;
                
                html += `<div class="foros" onclick="fMensajes('${data[i].for_id}')">
                ${data[i].for_tema} </div>`;

                if ( Usuario_Logueado != null &&  Usuario_Logueado.usu_permiso==1){
                html += `<div class="bot" onclick="fBorrarTema('${data[i].for_id}')"> <i  class="fa fa-ban" title="Borrar Tema"></i> </div>`
                }

                html += `</div>`;

            }
            document.querySelector("nav").innerHTML = html;
        })
}

//PARA SACAR LOS MENSAJES DE LOS USUARIOS CUANDO SE PULSE EN EL TEMA DEL FORO.
function fMensajes(for_id) {

    let URL = "assets/php/servidor.php?peticion=CargarMensajes&for_id=" + for_id;
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {

            console.log(data);
            
            let html = "";
            let ruta="assets/fotos/";

            html+=`<div id="añadirMensaje" onclick="fModalMensaje()"><i id="am" class="fa fa-plus-square" title="Añadir Mensaje"></i></div>`;
            

            for (i = 0; i < data.length; i++) {
                let foto= data[i].usu_foto;
                

                html += ` <div id="contenedor">
      
                        <div id="fotoU"> <img src= "${ruta+foto}" title="${data[i].usu_nombre}"> </div>
                        <div id="aliasM"> ${data[i].usu_alias} </div>
                        <div id="mensajeM"> ${data[i].fu_mensaje} </div>
                        <div id="fechaM"> ${data[i].fu_fecha} </div>`;



                if ( Usuario_Logueado != null && ( data[i].fu_usu_id == Usuario_Logueado.usu_id || Usuario_Logueado.usu_permiso==1)){
                       html += `<div id="borrar_msj" onclick="fBorrarMensaje('${data[i].fu_id}')"> <i id="bm" class="fa fa-trash" title="Borrar Mensaje"></i> </div>` }
                        
                
                html+= `</div>  `;

            }

            document.querySelector("section").innerHTML = html;

            foroA=for_id;
            
            

            console.log("EL ID DEL FORO ACTUAL ES: ", foroA);

        })
}

/*----------------------------------------------------------------------------------------------------------------------*/



// ONLOAD EN EL BODY (TODA LA PANTALLA) MOSTRANDO LA MODAL DE INICIO: REGISTRO, INICIAR SESION, SEGUIR COMO INVITADO

function fInicio() {
         fMostrar('div_form_login');
    }

// PARA MOSTRAR LA MODAL QUE ME PIDA --> ¿CREAR CUENTA? O ¿INICIO SESIÓN?

    function fMostrar(que) {
        // Ocultar todos los formularios
        let todos = document.querySelectorAll("#div_modal > div");
        console.log("TODOS:", todos);
        for (i = 0; i < todos.length; i++) {
             todos[i].style.display = 'none';
        }
        //Mostrar el que me han pedido
        document.querySelector("#" + que).style.display = "block";
        // Mostrar la modal
        document.querySelector("#div_modal").style.display = "flex";
   }

// F(X) PARA LOGUEARSE Y DAR ACCSESO A LA PÁGINA.

   function fLogin() {
    // Leer el Alias
    let alias = document.querySelector("#alias").value;
    let password = document.querySelector("#password").value;
    // Leer el password
    // Enviar estos datos al servidor
    let URL = "assets/php/servidor.php?peticion=Login";
    URL += "&alias=" + alias;
    URL += "&password=" + password;

    fetch(URL)
         .then((response) => response.json())
         .then((data) => {
              console.log(data);
              // Respuesta del servidor: si SÍ está se oculta la modal y se da la bienvenida. si NO está mostrar el div_error
              if (data.datos.length == 0) {
                document.querySelector('#div_error').innerHTML = "ERROR DE ACCESO";
                setTimeout(fCerrarError,3000);
                   return;
              } 
              Usuario_Logueado = data.datos[0];
              fOcultarModal();     
              fSacarTemas();

              console.log(Usuario_Logueado);

              aliasP= data.datos[0].usu_alias;
              idP= data.datos[0].usu_id;
              permisoP= data.datos[0].usu_permiso;
              nombreP= data.datos[0].usu_nombre;
              fotoA= data.datos[0].usu_foto;

              console.log("Alias:", aliasP, "ID:", idP, "permisoP", permisoP);

         }
         )
}

function fCerrarError(){

    document.querySelector('#div_error').innerHTML = '';
}


function fAbrirPerfil(){

if(idP==24){

    document.querySelector("#ModalB").style.display = "flex";
        document.querySelector("#borrarT").style.display = "flex";
        document.querySelector("#borrarT").innerHTML = "Debes Tener una Cuenta";
        fOcultarModalTema();
        setTimeout(fModalBorrar, 3000);
    return;
}

document.querySelector('#ModalP').style.display= 'flex';
document.querySelector('#EntrarP').style.display= 'flex';
fDatosPerfil();

}

function fCerrarPerfil(){
    document.querySelector('#ModalP').style.display= 'none';
    document.querySelector('#EntrarP').style.display= 'none';
    
    }




function fDatosPerfil(){

    let ruta= "assets/fotos/";
    let usu_id=idP;
   

    let URL = "assets/php/servidor.php?peticion=CargarPerfil&usu_id=" + usu_id;
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {

            console.log(data);

            let html = 

    `   <div id="tit" > Tú Perfil </div>
        <div id="name" > Nombre: ${data[0].usu_nombre} </div>
        <div id="nameA" > Alias: ${data[0].usu_alias} </div>
        <div id="FP" > <div id="ft" > Foto: </div> <img src= "${ruta+data[0].usu_foto}" title="${data[0].usu_nombre}"> </div>
        <div class="bp"> <input type="button" value="Cambiar Foto" onclick="fAbrirNuevaFoto()" > </div>
        <div class="bp"> <input type="button" value="cerrar" onclick="fCerrarPerfil()" > </div>`
        
        ;


document.querySelector("#EntrarP").innerHTML = html;
})
}



function fAbrirNuevaFoto(){
    document.querySelector('#ModalF').style.display= 'flex';
    document.querySelector('#CambiarFoto').style.display= 'flex';
    
    fNuevaFoto();
    }



function fNuevaFoto(){

let ruta= "assets/fotos/";

let nombre16="u16.gif";
let nombre15="u15.gif";
let nombre14="u14.gif";
let nombre13="u13.gif";
let nombre12="u12.gif";
let nombre11="u11.gif";
let nombre10="u10.gif";
let nombre08="u08.gif";
let nombre07="u07.gif";
let nombre06="u06.gif";
let nombre03="u03.gif";
let nombre02="u02.gif";
let nombre01="u01.gif";


let html=
`
<img src="${ruta+"u16.gif"}" alt="" onclick="fCambiarFoto('${usu_foto=nombre16}')">
<img src="${ruta+"u15.gif"}" alt="" onclick="fCambiarFoto('${usu_foto=nombre15}')">
<img src="${ruta+"u14.gif"}" alt="" onclick="fCambiarFoto('${usu_foto=nombre14}')">
<img src="${ruta+"u13.gif"}" alt="" onclick="fCambiarFoto('${usu_foto=nombre13}')">
<img src="${ruta+"u12.gif"}" alt="" onclick="fCambiarFoto('${usu_foto=nombre12}')">
<img src="${ruta+"u11.gif"}" alt="" onclick="fCambiarFoto('${usu_foto=nombre11}')">
<img src="${ruta+"u10.gif"}" alt="" onclick="fCambiarFoto('${usu_foto=nombre10}')">
<img src="${ruta+"u08.gif"}" alt="" onclick="fCambiarFoto('${usu_foto=nombre08}')">
<img src="${ruta+"u07.gif"}" alt="" onclick="fCambiarFoto('${usu_foto=nombre07}')">
<img src="${ruta+"u06.gif"}" alt="" onclick="fCambiarFoto('${usu_foto=nombre06}')">
<img src="${ruta+"u03.gif"}" alt="" onclick="fCambiarFoto('${usu_foto=nombre03}')">
<img src="${ruta+"u02.gif"}" alt="" onclick="fCambiarFoto('${usu_foto=nombre02}')">
<img src="${ruta+"u01.gif"}" alt="" onclick="fCambiarFoto('${usu_foto=nombre01}')">
<div id="btC"> <input type="button" value="cerrar" onclick="fCerrarCambioF()" > </div>

`
 
document.querySelector('#CambiarFoto').innerHTML= html;

}

function fCerrarCambioF(){
    document.querySelector('#CambiarFoto').style.display= 'none';
    document.querySelector('#ModalF').style.display= 'none';
    fDatosPerfil();

}


function fCambiarFoto(usu_foto){

    

    let URL = "assets/php/servidor.php?peticion=CambiarFoto";
    URL += "&usu_id=" + idP;
    URL += "&usu_foto=" + usu_foto;
    

    fetch(URL)
         .then((response) => response.json())
         .then((data) => {
              console.log(data);
              
              
              
         }
         )


}




// F(X) PARA DAR ACCSESO A LA PÁGINA COMO INVITADO.

function fSeguirInvitado(){
    let URL = "assets/php/servidor.php?peticion=Invitado";
    
    fetch(URL)
         .then((response) => response.json())
         .then((data) => {
              console.log(data);
           
              aliasP= data.datos[0].usu_alias;
              idP= data.datos[0].usu_id;
              permisoP= data.datos[0].usu_permiso;

              console.log("Alias:", aliasP, "ID:", idP, "permisoP", permisoP);
             
    fOcultarModal();     
    fSacarTemas();
})}



// F(X) PARA REGISTRARSE  -> LUEGO MUESTRA LA MODAL PARA EL LOGIN Y DAR ACCSESO A LA PÁGINA.

function fRegistro(){

    let nombre = document.querySelector("#rnombre").value;
    let alias = document.querySelector("#ralias").value;
    let pas = document.querySelector("#rpassword").value;
    let rpass = document.querySelector("#rrpassword").value;
    
if(pas!=rpass){
document.querySelector("#div_error_registro").innerHTML = "CONTRASEÑAS NO COINCIDEN";
setTimeout(fCerrarErrorR,3000);
return;
}

if(alias.length<=0 || pas.length<=0){
    document.querySelector("#div_error_registro").innerHTML = "ERROR EN CREAR LA CUENTA";
    setTimeout(fCerrarErrorR,3000);
    return;
    }

let URL = "assets/php/servidor.php?peticion=Registro";
URL += "&nombre=" + nombre;
URL += "&alias=" + alias;
URL += "&pas=" + pas;
URL += "&rpass=" + rpass;

fetch(URL)
    .then((response) => response.json())
    .then((data) => {
         console.log(data);
         fMostrar('div_form_login');
    })
}


// PARA OCULTAR LA MODAL DE INICIO.

function fOcultarModal() {
    document.querySelector('#div_modal').style.display = 'none';
}

function fCerrarErrorR(){

    document.querySelector('#div_error_registro').innerHTML = '';

}


/*----------------------------------------------------------------------------------------------------------------------*/


// F(x) Para Añadir Tema:

function fAñadirTema(){

let tema = document.querySelector("#tema").value
    let URL = "assets/php/servidor.php?peticion=AñadirTema";

    if(permisoP==0){
        document.querySelector("#ModalB").style.display = "block";
        document.querySelector("#borrarT").innerHTML = "No Tienes Permiso Para Esta Acción";
        fOcultarModalTema();
        setTimeout(fModalBorrar, 3000);
        return;
        }

    if(tema.length<=0){
        document.querySelector("#ModalB").style.display = "flex";
        document.querySelector("#borrarT").style.display = "flex";
        document.querySelector("#borrarT").innerHTML = "No se puede crear un foro sin título";
        fOcultarModalTema();
        setTimeout(fModalBorrar, 3000);
        return;
    }





    URL += "&tema=" +tema;
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {

            console.log(data);
            fModalTema();
            fOcultarModalTema();
            fSacarTemas();
        })
}

//PARA SACAR LA MODAL CON LA CAJA DE TEXTO PARA AÑADIR EL TEMA

function fModalTema(){
    document.querySelector("#div_tema").style.display = "flex";
    document.querySelector("#ModalTema").style.display = "flex";
}

function fOcultarModalTema() {
    document.querySelector('#div_tema').style.display = 'none';
    document.querySelector('#ModalTema').style.display = 'none';
}

// PARA BORRAR UN TEMA DE LA LISTA. (POR AHORA SOLO SE PUEDE BORRAR SI NO HAY NINGÚN MENSAJE DENTRO.)
//¿QUIZÁ SE PUEDE CREAR UN BOTON DE BORRAR TODOS LOS MENSAJES PARA DESPUÉS BORRAR EL TEMA?

function fBorrarTema(for_id){

    if(permisoP==0){
        document.querySelector("#borrarT").style.display = "block";
        document.querySelector("#borrarT").innerHTML = "No Tienes Permiso Para Esta Acción";
        setTimeout(fModalBorrar, 5000);
        return;
        }

    let URL = "assets/php/servidor.php?peticion=BorrarTema&for_id=" + for_id;
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {

            console.log(data);
            fSacarTemas();

           
        })
}


function fModalBorrar(){
    document.querySelector("#ModalB").style.display = "none";
}


function fOcultarModalTema() {
    document.querySelector('#div_tema').style.display = 'none';
    document.querySelector('#ModalTema').style.display = 'none';
}



/*----------------------------------------------------------------------------------------------------------------------*/

//PARA AÑADIR UN MENSAJE --> SE NECESITA EL ID DEL FORO Y EL ID DEL USUARIO EN SESIÓN.

function fAñadirMensaje(){


    if(idP==24){
        document.querySelector("#ModalB").style.display = "flex";
        document.querySelector("#borrarT").style.display = "flex";
        document.querySelector("#borrarT").innerHTML = "No Tienes Permiso Para Esta Acción";
        setTimeout(fModalBorrar, 5000);
        fOcultarModalMensaje();
        return;
        }


    let mensaje = document.querySelector("#mensaje").value;
    let fu_usu_id = idP;
    
    
    let URL = "assets/php/servidor.php?peticion=AñadirMensaje";
    URL += "&fu_usu_id=" + fu_usu_id;
    URL += "&fu_for_id=" + foroA;
    URL += "&mensaje=" + mensaje;
    
    

    fetch(URL)
         .then((response) => response.json())
         .then((data) => {
              console.log(data);
              
              fModalMensaje();
              fMensajes(foroA);
              fOcultarModalMensaje();
            
         }
         )
}


function fModalMensaje(){
    document.querySelector("#ModalMensaje").style.display = "flex";
    document.querySelector("#div_mensaje").style.display = "flex";
    
}


function fOcultarModalMensaje(){
    document.querySelector("#ModalMensaje").style.display = "none";
    document.querySelector("#div_mensaje").style.display = "none";
}


function fBorrarMensaje(fu_id){


let URL = "assets/php/servidor.php?peticion=BorrarMensaje&fu_id=" + fu_id;
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {

            console.log(data);
            fMensajes(foroA);

           
        })


}