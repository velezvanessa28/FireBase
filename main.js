  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBDKlE_B7uqAYiRBWAobvsiVOI_pzL7N7g",
    authDomain: "chat-72fb4.firebaseapp.com",
    databaseURL: "https://chat-72fb4.firebaseio.com",
    projectId: "chat-72fb4",
    storageBucket: "",
    messagingSenderId: "478181109755"
  };
  firebase.initializeApp(config);
  const username = prompt('Ingresa tu nombre');
  const database = firebase.database();

  $('button').click(function( event ){
    event.preventDefault();
    var mensaje = $('#mensaje').val();

    var data = {usuario: username, mensaje: mensaje};
    database.ref('chat/').push(data, function(err) {
      if (err) {throw err;}
      else{
        console.info('Guardamos la informacion');
        ponerMensaje(data);
        $('#mensaje').val('')
      }
    });
  })

  function ponerMensaje(pepito) {
    $('#caja').append('<p>' + pepito.usuario + ': ' + pepito.mensaje + '<p>');
  }

  function iterar(data) {
    for(var chiguiro in data) {
      if(data.hasOwnProperty(chiguiro) ) {
        var element = data[chiguiro];
        var gato = { 
          usuario: element.usuario,
          mensaje: element.mensaje
         };
         ponerMensaje(gato);
      }
    }
  }


  var traerMensajes = new Promise(function(res, rej) {
    var mensajes = database.ref('/chat/').once('value').then(function(snapshot){
      return res(snapshot.val());
    });
    if(!mensajes) {return rej();}
  });

  traerMensajes.then(function(data){
    iterar(data);
  });