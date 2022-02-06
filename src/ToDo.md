
Trabajos futuros: 
 - Cuando el componente "survey" esté terminado, entonces hacer: 
    * El componente "survey-view" desaparece; su lógica es implementada en los mismos componentes de survey haciendo un "ngIf" para saber si el "actionText" es "view" or "add". 
http://localhost:4200/survey/876acbf2-5a67-4b5c-92ca-040761d54595/view
 - Poner al control booleano de "toco-lib" la option de mostrar un "control slider" o un "control select" para el True/False. 
    * Poner la option "control slider" para el True/False. 
 - Hacer en el control numérico de "toco-lib": 
    * Este es un control numérico que permite la entrada de un número entero. 
 - Arreglar que el campo `hasTaskInProgress` en [loading]="hasTaskInProgress" se actualice bien en "SurveyComponent". 
 - Arreglar que el campo `hasPermission` en *ngIf="hasPermission" se actualice bien en "SurveyComponent" y además verificar que se trata de la vista de detalles (adicionar otra verificación en el ngIf). 
 - Poner el fichero "evaluation.entity" para la librería "toco-ng" en la carpeta "lib/entities". 
 - Pasar algunos campos desde "FormFieldContent" para "InputContent" para que las interfaces "ActionContent" y "ContainerContent" que heredan desde "FormFieldContent" no tengan problemas con campos que no usan y tengan los campos que les toca a cada a una. 
    * Arreglar la lógica de initialization y los comentarios que tienen que ver con esta modificación. 
 - Hacer un componente para "Listar las evaluaciones" similar a los componentes que ya existen para listar, por ejemplo, el de listar repositorios institucionales. 
 - En el proyecto "Sceiba", en el fichero "about.es.md", cambiar el día 2 por 27 en "[VLIR JOINT 2019-01-2". 
 - Creo que hay que adicionar un nuevo valor al `enum AuthBackend` para representar el Evaluation's backend. Se usa en "ContactService". 
 - Crear el ícono svg `evaluation.svg` y usarlo en el código html en los lugares de "evaluation1.png" y "evaluation2.png". 
 - Borrar todo lo que no se usa de la carpeta `assets`. 
 - Respecto a `toco-ng` (toco-lib) está muy mal la forma en que están creados los módulos: 
    * Cada componente que se usa tiene que tener su propio módulo como en Agular Material. Esto hace que la aplicación que los usa quede óptima! 
    * Borrar los ficheros: 
jsonschemas/organization-v1.0.0-mock.json
 - Actualmente si tengo varias pestañas abiertas en el navegador, y en una de ellas se hace cambio de idioma, entonces las demás NO cambian de idioma. Este es el comportamiento por defecto cuando se usa la librería "ngx-translate". 
    * Para lograr que todas las pestañas en el browser cambien de idioma se debe guardar un estado a nivel de browser indicando el idioma actual. Entonces cuando una pestaña en específico se activa, recuperar ese estado, y verificar si necesito hacer cambio de idioma. 


Recomendaciones: 
- Revisar términos usados para la clasificación de las revistas (internacionalmente y ajustar, nos dice que ha cambiado). 
- Incluir Scielo como objeto de medición (si está en Scielo ya esta en Doarj?). 
- Hablar con el dpto de idioma para agregar el Portugues. 
- Recomiendan poner intención al diseño. 
- Valorar el título del formulacio, hacerlo menos informal. 
