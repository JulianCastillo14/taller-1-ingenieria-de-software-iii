#Establecemos la imagen base de Node.js
FROM node:18

#Creamos un directorio de trabajo en el contenedor
RUN mkdir -p /home/app

#Definimos un directorio de trabajo en el contenedor
WORKDIR /home/app

#Copiamos el archivo receive.js que corresponder al consumidor
COPY receive.js .

#Instalamos las dependencias
RUN npm install amqplib

#Ejecutamos el archivo receive.js para recibir el mensaje
CMD ["node", "receive.js"]