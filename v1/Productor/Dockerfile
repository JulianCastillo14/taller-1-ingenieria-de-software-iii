#Establecemos la imagen base de Node.js
FROM node:18

#Creamos un directorio de trabajo en el contenedor
RUN mkdir -p /home/app

#Definimos un directorio de trabajo en el contenedor
WORKDIR /home/app

#Copiamos el archivo send.js que corresponder al productor
COPY send.js .

#Instalamos las dependencias
RUN npm install amqplib

#Ejecutamos el archivo send.js para enviar el mensaje
CMD ["node", "send.js"]