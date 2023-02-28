const inputs = document.getElementsByClassName("espacios")//constante div inputs para colocar todos los inputs que se generen unas lineas abajo
const contenedor = document.getElementsByClassName("contenedor")//constante div contenedor 

var palabrasverif=[]//arreglo para guardar lo obtenido escrito por el usuario


const texto = document.getElementById("word-input")//constante texto para ingresar la palabra a jugar ->esta constante es la que se deberia cambiar por la respuesa a la pregunta que se realize al usuario
const empezar = document.getElementById("start-button")//boton empezar
empezar.addEventListener("click", convertir);//llamar a la funcion "Convertir" cuando se clickee el boton


var x=[[],[],[],[],[],[]];//Arreglo para contar la cantidad de filas del wordle
var oportunidades;//variable para crear los divs en los cuales se colocaran los inputs
var verificar;//variable para boton "verificar"
var vericen;//variable para agregar el boton verificar al div
var nomopor = "oportu0"//variable para nombrar cada uno de los inputs que se generaran, empieza como oportu0 y luego oportu1 y asi sucesivamente
var filas//variable para insertar cada uno de los inputs en el div
var bloquear = false//variable para bloquear los inputs siguientes a la primer fila  
var filajuego = 0;//variable para iterar entre las filas cada vez que el jugador presione el boton verificar
var verificarpal;//arreglo para verificar cada una de las letras digitadas en los inputs
var palsinesp//arreglo de las letras de las palabras a jugar sin los espacios
var color = ""//variable para cambiar los colores de los inputs cuando se presiona el boton verificar
var tituword;//variable para div del titulo wordle

function convertir(){//funcion convertir

    tituword = document.createElement("DIV")//creacion del div del titulo
    tituword.setAttribute("id","Titulo")//darle el id de "Titulo" al div
    tituword.innerHTML="¡WORDLE!"//insertar el string en el div
    inputs[0].appendChild(tituword)//agregar el div titulo al div inputs

    for (var j = 0; j < 6;j++)//bucle para generar cada una de las filas de inputs del juego
    {
        
        nomopor="oportu"+j.toString();//generar el nombre de variable de la fila de inputs 
        oportunidades = document.createElement("DIV");//crear el div donde ira esta fila de inputs
        oportunidades.setAttribute("Class",nomopor)//darle el atributo de clase con el nombre generado 
        inputs[0].appendChild(oportunidades)//agregar al div donde iran las filas de inputs esta fila generada

        palabra = Array.from(texto.value.toLowerCase().replaceAll(' ','_'))//obtener la palabra a jugar y pasarla a un arreglo remplazando los espacios por una "_" 

        if(palabra[0]=='_')//condicional para verificar si la primera letra de la palabra a jugar es un espacio
            palabra.shift();//eliminar esa primera letra

        if (palabra [palabra.length-1] == '_')//condicional para verificar si la ultima letra de la palabra a jugar es un espacio
            palabra.pop();//eliminar esa ultima letra

        palsinesp = [...palabra]//copiar el arreglo de la palabra a jugar en la variable palsinesp
        while(palsinesp.indexOf('_')!=-1)//bucle para buscar las "_" de la palabra a jugar 
        {
            palsinesp.splice(palsinesp.indexOf('_'),1)//eliminar las "_" que haya en el arreglo palsinesp
        }

        for (var i = 0; i < palsinesp.length;i++)//bucle para crear los inputs segun la cantidad de letras sin contar los espacios que contenga la palabra a jugar
        {
            x[j][i] = document.createElement("INPUT");//crear un input que se guardara en el arreglo bi-dimencional x, el cual pertenece a la fila j (del bucle for de arriba) con el numero i 
            x[j][i].setAttribute("maxlength","1")//brindar el atributo de solo poder escribir una letra en el input
            x[j][i].setAttribute("onfocusin","x["+j+"]["+i+"].select();")//brindar el atributo el cual cuando se enfoca el input, seleccione su contenido
            x[j][i].setAttribute("style","width: 50px; height: 60px; text-align: center; font-size: 30px; text-transform: uppercase; margin-bottom: 10px; margin-right: 10px;")//darle los atributos necesarios para que cada div se vea parecido al del juego wordle
            x[j][i].setAttribute("oninput","borpas("+j+","+i+",this)")//brindar el atributo de input, el cual llamara a la funcion borpas cada vez que el usuario presione una tecla
            

            filas = document.getElementsByClassName(nomopor)//variable para agregar el input a la fila en la que se este iterando en ese momento
            filas[0].appendChild(x[j][i]);//agregar el input

            if(bloquear==true){//condicional que verifica si la variable bloquear esta habilitada
                x[j][i].readOnly = true;//bloquear el input creado
                x[j][i].setAttribute("style","outline : none; width: 50px; height: 60px; text-align: center; font-size: 30px; text-transform: uppercase; margin-bottom: 10px; margin-right: 10px;")//darle los atributos necesarios para que sea intuitivo que el input esta bloqueado
            }

            if(palabra[i+1]=='_')//condicional que verifica si despues del input creado deberia ir un espacio para separar las palabras
            {
                x[j][i].setAttribute("style","width: 50px; height: 60px; text-align: center; font-size: 30px; text-transform: uppercase; margin-bottom: 10px; margin-right: 50px;")//brindar los atributos necesarios para generar ese espacio entre inputs y se muestren como 2 palabras diferentes
                palabra.splice(i+1,1)//eliminar el espacio de la palabra para que en la siguiente iteracion, el condicional anterior no lo identifique de nuevo
            }
            
        }
        bloquear=true;//habilitar la variable bloquear para que en la siguiente iteracion de filas, se bloqueen todos los inputs
        if (j == 5)//condicional que verifica si ya se generaron todas las 5 filas de inputs
        {
            verificar = document.createElement("BUTTON");//variable para crear el boton "verificar"
            verificar.textContent="Verificar"//variable para agregarle el texto al boton
            verificar.setAttribute("id","verificar")//agregarle un id al boton verificar
            verificar.addEventListener("click",juego)//llamar a la funcion juego, cuando se presione el boton
            vericen = document.getElementsByClassName("oportu5")//variable para obtener los atributos de la ultima fila para poder colocar el boton en medio
            inputs[0].appendChild(verificar)//agregar el boton al div inputs debajo de la ultima fila
            verificar.setAttribute("style","margin-top: 30px;margin-left: "+((vericen[0].offsetWidth/2)-(verificar.offsetWidth/2)-5)+"px;")//agregarle atributos al boton para dejarlo en el medio
        }
        
    }
    
}

function borpas(j,i,e)//funcion borpas, le entran los parametros de la fila, el numero del input y la letra digitada por el usuario
{
    console.log(e.value)//mostrar la letra digitada
    if (e.value!=''&&i<palsinesp.length-1)//condicional para verificar si hubo letra digitada y si no es el input mas a la derecha de la fila
    {
        x[j][i+1].focus();//concentrarse en el input de la derecha
    }
    else if (e.value == '' && i > 0)//condicional para verificar si se borro la letra del input y el input no es el primero a la izquierda de la fila
    {
        x[j][i-1].focus();//concentrarse en el input de la derecha
    }
}

function juego()//funcion juego
{
    verificarpal=[]//crear el arreglo para verificar lo digitado por el usuario cuando presione el boton verificar

    for (var i = 0; i < palsinesp.length;i++)//bucle para recorrer en funcion de la cantidad de letras de la palabra sin contar los espacios
    {   
        if (x[filajuego][i].value !='')//condicional para verificar si el input contiene alguna letra digitada
            verificarpal.push(x[filajuego][i].value)//agregar el valor del input al arreglo verificarpal
    }
    
    if (verificarpal.length == palsinesp.length || verificarpal.indexOf('')!=-1){//condicional para verificar si la cantidad de letras en los inputs es la misma cantidad de letras en la palabra, sin contar los espacios

        filajuego+=1;//sumarle 1 al contador de la fila en la cual se encuentra el jugador

        palabra = Array.from(texto.value.toLowerCase().replaceAll(' ','_'))//generar la palabra del texto remplazando los espacios por "_"

        if(palabra[0]=='_')//condicional para verificar si la primera letra de la palabra a jugar es un espacio
            palabra.shift();//eliminar esa primera letra

        if (palabra [palabra.length-1] == '_')//condicional para verificar si la ultima letra de la palabra a jugar es un espacio
            palabra.pop();//eliminar esa ultima letra

        palsinesp = [...palabra]//copiar el arreglo de la palabra con espacios remplazados por "_"
        while(palsinesp.indexOf('_')!=-1)//bucle para buscar las "_" que se encuentran en el arreglo palsinesp
        {
            palsinesp.splice(palsinesp.indexOf('_'),1)//eliminar esa "_" de la palabra
        }

        for (var i = 0; i < palsinesp.length;i++)//bucle para iterar en funcion de la cantidad de letras que tenga la palabra sin contar los espacios 
        {   
            
            if(verificarpal[i] == palsinesp[i]){//condicional para verificar si la letra digitada por el usuario se encuentra en la palabra y en la posicion correcta
                color = "background-color: rgb(0,255,0); "}//hacer la variable color, un string de estilo para agregarlo al input como color verde
            else if (palsinesp.indexOf(verificarpal[i]) != -1){//condicional para verificar si la letra digitada por el usuario se encuentra en la palabra pero en la posicion incorrecta
                color = "background-color: rgb(255,255,0); "}//hacer la variable color, un string de estilo para agregarlo al input como color amarillo
            else if (palsinesp.indexOf(verificarpal[i]) == -1){//condicional para verificar si la letra digitada por el usuario no se encuentra en la palabra 
                color = "background-color: rgb(128,128,128); "}//hacer la variable color, un string de estilo para agregarlo al input como color gris

            //anteriores
            x[filajuego-1][i].readOnly = true;//bloquear la fila la cual digito el usuario
            x[filajuego-1][i].setAttribute("style"," border: 0px; outline : 1px solid; width: 52px; height: 62px; text-align: center; font-size: 30px; text-transform: uppercase; margin-bottom: 11px; margin-right: 11px; margin-left: 1px;"+color+" transition: background-color 0.7s;")//generar los atributos correspondientes para que sea intuitivo para el usuario que el input esta bloqueado
            x[filajuego-1][i].setAttribute("onfocusin","")//quitar el atributo el cual dicta que si se enfoca ese input que ya fue digitado por el usuario no llame a ninguna funcion ni seleccione nada
            
            
            
            if(palabra[i+1]=='_')//condicional para verificar si la letra siguiente a la letra iterada es una "_" o practicamente un espacio
            {
                x[filajuego-1][i].setAttribute("style"," border: 0px; outline : 1px solid; width: 52px; height: 62px; text-align: center; font-size: 30px; text-transform: uppercase; margin-bottom: 11px; margin-right: 50px; margin-left: 1px;"+color+" transition: background-color 0.7s;")//brindar los atributos necesarios para que los inputs se vean como dos palabras distintas debido al espacio
            }

            if (filajuego <6)//condicional para verificar si se terminaron las filas de inputs
            {
                x[filajuego][i].setAttribute("style","transition: 0.7s; width: 50px; height: 60px; text-align: center; font-size: 30px; text-transform: uppercase; margin-bottom: 11px; margin-right: 10px;")//brindar los atributos necesarios para que la siguiente fila la cual digitara el usuario se vea desbloqueada
                x[filajuego][i].readOnly = false;//desbloquear los inputs
                if(palabra[i+1]=='_')//condicional para verificar si la letra siguiente a la letra iterada es una "_" o practicamente un espacio
                {
                    x[filajuego-1][i].setAttribute("style"," border: 0px; outline : 1px solid; width: 52px; height: 62px; text-align: center; font-size: 30px; text-transform: uppercase; margin-bottom: 11px; margin-right: 51px; margin-left: 1px;"+color+" transition: background-color 0.7s;")//brindar los atributos necesarios para que los inputs se vean como dos palabras distintas debido al espacio en la fila anterior a jugar
                    x[filajuego][i].setAttribute("style","transition: 0.7s;width: 50px; height: 60px; text-align: center; font-size: 30px; text-transform: uppercase; margin-bottom: 11px; margin-right: 50px;")//brindar los atributos necesarios para que los inputs se vean como dos palabras distintas debido al espacio en la fila a jugar
                    palabra.splice(i+1,1)//eliminar el espacio de la palabra para que el condicional anterior no la detecte en la siguiente iteracion
                }
                x[filajuego][0].focus();//enfocarse en el primer input de la fila a jugar
            }
            
        
        }
        
    }
    console.log(verificarpal)//mostrar el arreglo digitado por el usuario
    console.log(palsinesp)//mostrar el arreglo de la palabra correcta
    if(JSON.stringify(palsinesp) === JSON.stringify(verificarpal) )//condicional verificar si la palabra digitada por el usuario es igual a la palabra correcta sin espacios
    {
        alert("¡Haz ganado!\n" + texto.value)//alerta "Haz ganado" mostrando la palabra correcta
    }
    else if (filajuego >= 6)//condicional para verificar si se terminaron las filas
        alert("¡Perdiste!\nLa palabra correcta era: " + texto.value)//alerta "Perdiste", mostrando la palabra correcta

}







