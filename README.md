<div align="center">
  <img src="./src/assets/logo 2.png" width="200px" alt="logo 2">
</div>

---

# TravelTribe: Discover Together

## Índice

* [1. Introducción](#1-presentando-traveltribe-donde-los-exploradores-se-unen-en-todo-el-mundo)
* [2. Funcionalidades](#2-funcionalidades)
* [3. Historias de Usuario](#3-historias-de-usuario)
* [4. Prototipos](#4-prototipos)
* [5. Despliegue](#5-despliegue)

## 1-Presentando TravelTribe: Donde los Exploradores se Unen en Todo el Mundo

La aventura no tiene límites. Se trata de los lazos que forjas, las culturas que abrazas y las historias que creas. Bienvenido a TravelTribe, una innovadora plataforma social que trasciende fronteras, dirigida tanto a espíritus nómadas como a mochileros con presupuesto ajustado, así como a entusiastas de la cultura. Aquí, creemos que viajar no es solo un recorrido; es una experiencia compartida, una historia contada y un vínculo establecido.


## 2-Funcionalidades

- **Publica Experiencias**: Conecta con otros viajeros compartiendo tus asombrosas experiencias y recomendaciones de los lugares que has visitado.

- **Consejos en Tiempo Real**: ¿Necesitas ideas para tu próxima aventura? Formula preguntas a la comunidad de TravelTribe y recibe recomendaciones personalizadas y consejos internos.

- **Encuentros y Eventos**: Únete o crea eventos que se alineen con tus intereses, desde encuentros nómadas hasta exploraciones asequibles en la ciudad.

- **Intercambio Cultural**: Conecta con exploradores afines que comparten tu pasión por las culturas, enriqueciendo tu viaje con interacciones significativas.

- **Interacción Vibrante en la Comunidad**: Forja relaciones con personas de todo el mundo y construye tu comunidad global.


## 3-Historias de Usuario

cuéntanos brevemente cómo descubriste las necesidades de los usuarios y cómo llegaste a la definición final de tu producto. Es importante que detalles:

Quiénes son los principales usuarios de producto.
Qué problema resuelve el producto / para qué le servirá a estos usuarios..

- **Perfiles de Usuario**

<img src="./src/assets/UsuariosTT.png" alt="UsuariosTT">

- **Historias de Usuario**

<img src="./src/assets/HDU.png" alt="HDU">


## 4-Prototipos

* Este proyecto se debe trabajar en equipos de tres.

* El rango de tiempo estimado para completar el proyecto es de 4 a 5 Sprints.

* La lógica del proyecto debe estar implementada completamente en JavaScript
  (ES6+), HTML y CSS :smiley:. Para este proyecto **no está permitido** utilizar
  _frameworks_ o librerías de CSS y JS.

* La división y organización del trabajo debe permitir, sin excepciones, que
  **cada integrante** del equipo practique el aprendizaje de todo lo involucrado
  en **cada historia**. _No se dividan el trabajo como en una fábrica._
  - ¿Hasta acá has avanzado en tus proyectos con cierta fluidez y sin mayores
    problemas? Sé generosa con tus compañeras, permíteles aprender y practicar
    sin restricciones, aunque tome un poco más de tiempo. Aproveha de
    _coachearlas_, de hacer _pair programming_, una de las mejores maneras de
    aprender es explicando verbalmente.

  - ¿Se te está haciendo difícil y te cuesta un poco más avanzar? No te quedes
    con las partes "fáciles" del proyecto, conversa, negocia, exige tu oportunidad
    para practicar y aprender lo que se te hace más difícil.

* Solamente pueden trabajar en una única historia por vez, no pueden avanzar a
  la siguiente sin haber completado la anterior. La historia se completa cuando
  se cumplen **todos** sus Criterios de Aceptación + **toda** su Definición
  de Terminado.

Para comenzar tendrás que hacer un _fork_ y _clonar_ este repositorio.

## 5-Despliegue

Súmate al canal de Slack
[#project-social-network](https://claseslaboratoria.slack.com/archives/C03SE63GFJQ)
para conversar y pedir ayuda del proyecto.

### Mobile first

El concepto de [_mobile first_](https://www.mediaclick.es/blog/diseno-web-responsive-design-y-la-importancia-del-mobile-first/)
hace referencia a un proceso de diseño y desarrollo donde partimos de cómo se ve
y cómo funciona la aplicación en un dispositivo móvil primero, y más adelante se
ve como adaptar la aplicación a pantallas progresivamente grandes y
características específicas del entorno desktop. Esto es en contraposición al
modelo tradicional, donde primero se diseñaban los websites (o webapps) para
desktop y después se trataba de _arrugar_ el diseño para que entre en pantallas
más chicas. La clave acá es asegurarse de que desde el principio diseñan usando
la vista _responsive_ de las herramientas de desarrollador (developer tools) del
navegador. De esa forma, partimos de cómo se ve y comporta la aplicación en una
pantalla y entorno móvil.

### Múltiples vistas

En proyectos anteriores nuestras aplicaciones habían estado compuestas de una
sola _vista_ principal (una sóla _página_). En este proyecto se introduce la
necesidad de tener que dividir nuestra interfaz en varias _vistas_ o _páginas_
y ofrecer una manera de navegar entre estas vistas. Este problema se puede
afrontar de muchas maneras: con archivos HTML independientes (cada uno con su
URL) y links tradicionales, manteniendo estado en memoria y rederizando
condicionalmente (sin refrescar la página), [manipulando el historial del
navegador](https://developer.mozilla.org/es/docs/DOM/Manipulando_el_historial_del_navegador)
con [`window.history`](https://developer.mozilla.org/es/docs/Web/API/Window/history).
En este proyecto te invitamos a explorar opciones y decidir una opción
de implementación.

### Escritura de datos

En los proyectos anteriores hemos consumido (leído) datos, pero todavía no
habíamos escrito datos (salvar cambios, crear datos, borrar, ...). En este
proyecto tendrás que crear (salvar) nuevos datos, así como leer, actualizar y
modificar datos existentes. Estos datos se podrán guardar de forma remota
usando [Firebase](https://firebase.google.com/).

Para usar Firebase hay que crear un proyecto en la consola de Firebase e
instalar la dependencia `firebase` utilizando `npm`.
Lee [las instrucciones paso a paso aqui](https://firebase.google.com/docs/web/setup).

Otras:

* [Modulos: Export](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/export)
* [Modulos: Import](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/import)
* [Diseño web, responsive design y la importancia del mobile first - Media Click](https://www.mediaclick.es/blog/diseno-web-responsive-design-y-la-importancia-del-mobile-first/)
* [Mobile First: el enfoque actual del diseño web móvil - 1and1](https://www.1and1.es/digitalguide/paginas-web/diseno-web/mobile-first-la-nueva-tendencia-del-diseno-web/)
* [Mobile First - desarrolloweb.com](https://desarrolloweb.com/articulos/mobile-first-responsive.html)
* [Mobile First Is NOT Mobile Only - Nielsen Norman Group](https://www.nngroup.com/articles/mobile-first-not-mobile-only/)
