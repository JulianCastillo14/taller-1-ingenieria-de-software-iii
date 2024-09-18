#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

const RABBITMQ_HOST = process.env.RABBITMQ_HOST || 'localhost';
const RABBITMQ_PORT = process.env.RABBITMQ_PORT || '5672';
const MENSAJE = process.env.MENSAJE || 'Hola mundo!';

console.log(`RabbitMQ Host: ${RABBITMQ_HOST}`);
console.log(`RabbitMQ Port: ${RABBITMQ_PORT}`);
console.log(`Mensaje: ${MENSAJE}`);

amqp.connect(`amqp://${RABBITMQ_HOST}:${RABBITMQ_PORT}`, function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'hello';

        channel.assertQueue(queue, {
            durable: false
        });

        setInterval(() => {
            channel.sendToQueue(queue, Buffer.from(MENSAJE));
            console.log(" [x] ENVIADO: %s", MENSAJE);
        }, 3500);
        
    });
});