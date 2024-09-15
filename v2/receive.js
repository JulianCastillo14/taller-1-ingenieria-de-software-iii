#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

const RABBITMQ_HOST = process.env.RABBITMQ_HOST || 'localhost';
const RABBITMQ_PORT = process.env.RABBITMQ_PORT || '5672';
const NUM_CONSUMER = process.env.NUM_CONSUMER || 1;
console.log(RABBITMQ_HOST);
console.log(RABBITMQ_PORT);

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

    
        channel.consume(queue, function(msg) {
            console.log(" [x] Consumer Num: %d", NUM_CONSUMER);
            console.log(" [x] Mensaje Recibido %s", msg.content.toString());
        }, {
            noAck: true
        });
    });
});