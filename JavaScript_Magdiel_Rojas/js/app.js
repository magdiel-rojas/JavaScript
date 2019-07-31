var calculadora={
  pantalla:document.getElementById('display'),
  valorPantalla:"0",
  operacion:"",
  primerDigito:0,
  segundoDigito:0,
  ultimoDigito:0,
  resultado:0,
  teclaIgual:false,

  init:function() {
    this.asignarEventoBotones(".tecla");
    this.asignarEventoOperaciones();
  },

  asignarEventoBotones:function(selector) {
    var x=document.querySelectorAll(selector);
    for (var i = 0; i < x.length; i++) {
      x[i].onmousedown=this.eventoReduceBoton;
      x[i].onmouseup=this.eventoAumentaBoton;
    }
  },
  eventoReduceBoton:function(event) {
    var x =event.target.id;
    var elemento=event.target;
    if (x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto" ) {
      elemento.style.width="28%";
      elemento.style.height="62px";
    } else if(x=="mas") {
      elemento.style.width="88%";
      elemento.style.height="98%";
    } else {
      elemento.style.width="21%";
      elemento.style.height="62px";
    }
  },
  eventoAumentaBoton:function(event) {
    var x = event.target.id;
    var elemento=event.target;
    if (x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto" ) {
      elemento.style.width = "29%";
      elemento.style.height = "62.91px";
    } else if(x=="mas") {
      elemento.style.width = "90%";
      elemento.style.height = "100%";
    } else {
      elemento.style.width = "22%";
      elemento.style.height = "62.91px";
    }
  },

  asignarEventoOperaciones:function() {
    document.getElementById('0').addEventListener('click',function(){calculadora.ingresaDigito('0')});
    document.getElementById('1').addEventListener('click',function(){calculadora.ingresaDigito('1')});
    document.getElementById('2').addEventListener('click',function(){calculadora.ingresaDigito('2')});
    document.getElementById('3').addEventListener('click',function(){calculadora.ingresaDigito('3')});
    document.getElementById('4').addEventListener('click',function(){calculadora.ingresaDigito('4')});
    document.getElementById('5').addEventListener('click',function(){calculadora.ingresaDigito('5')});
    document.getElementById('6').addEventListener('click',function(){calculadora.ingresaDigito('6')});
    document.getElementById('7').addEventListener('click',function(){calculadora.ingresaDigito('7')});
    document.getElementById('8').addEventListener('click',function(){calculadora.ingresaDigito('8')});
    document.getElementById('9').addEventListener('click',function(){calculadora.ingresaDigito('9')});
    document.getElementById('on').addEventListener('click',function(){calculadora.borrarDigito()});
    document.getElementById('punto').addEventListener('click',function(){calculadora.agregarPunto()});
    document.getElementById('sign').addEventListener('click',function(){calculadora.signoNegativo()});
    document.getElementById('dividido').addEventListener('click',function(){calculadora.asignarOperacion('/')});
    document.getElementById('por').addEventListener('click',function(){calculadora.asignarOperacion('*')});
    document.getElementById('menos').addEventListener('click',function(){calculadora.asignarOperacion('-')});
    document.getElementById('mas').addEventListener('click',function(){calculadora.asignarOperacion('+')});
    document.getElementById('igual').addEventListener('click',function(){calculadora.resultadoOperacion()});
  },
  ingresaDigito:function(digito) {
    if (this.valorPantalla.length<8) {
      if (this.valorPantalla=="0") {
        this.valorPantalla="";
        this.valorPantalla=this.valorPantalla+digito;
      } else {
        this.valorPantalla=this.valorPantalla+digito;
      }
      this.actualizaPantalla();
    }
  },
  borrarDigito:function() {
    this.valorPantalla="0";
    this.operacion="";
    this.primerDigito=0;
    this.segundoDigito=0;
    this.ultimoDigito=0;
    this.resultado=0;
    this.teclaIgual=false;
    this.actualizaPantalla();
  },
  agregarPunto:function() {
    if (this.valorPantalla.indexOf(".")==-1) {
      if (this.valorPantalla=="") {
        this.valorPantalla=this.valorPantalla+"0.";
      } else {
        this.valorPantalla=this.valorPantalla+".";
      }
      this.actualizaPantalla();
    }
  },
  signoNegativo:function() {
    if (this.valorPantalla!="0") {
      var temp;
      if (this.valorPantalla.charAt(0)=="-") {
        temp=this.valorPantalla.slice(1);
      } else {
        temp="-"+this.valorPantalla;
      }
      this.valorPantalla="";
      this.valorPantalla=temp;
      this.actualizaPantalla();
    }
  },
  asignarOperacion:function(opeArit) {
    if (this.valorPantalla!="0"){
      this.primerDigito=parseFloat(this.valorPantalla);
      this.valorPantalla="";
      this.operacion=opeArit;
      this.teclaIgual=false;
      this.actualizaPantalla();
    }
  },

  resultadoOperacion:function() {
    if (!this.teclaIgual) {
      this.segundoDigito=parseFloat(this.valorPantalla);
      this.ultimoDigito=this.segundoDigito;
      this.resultado=eval(this.primerDigito+""+this.operacion+""+this.segundoDigito);
    } else {
      this.resultado=eval(this.primerDigito+""+this.operacion+""+this.ultimoDigito)
    }
    this.primerDigito=this.resultado;
    this.valorPantalla="";
    if (this.resultado.toString().length < 9) {
      this.valorPantalla=this.resultado.toString();
    } else {
      this.valorPantalla=this.resultado.toString().slice(0,8)
    }
    this.teclaIgual=true;
    this.actualizaPantalla();
  },

  actualizaPantalla:function() {
    this.pantalla.innerHTML=this.valorPantalla;
  }
}

calculadora.init();
