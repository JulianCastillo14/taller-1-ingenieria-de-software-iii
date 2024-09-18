#!/usr/bin/env python
import pika
import time
import os

RABBITMQ_HOST = os.environ.get('RABBITMQ_HOST') if os.environ.get('RABBITMQ_HOST') != None else 'localhost' 
RABBITMQ_PORT = int(os.environ.get('RABBITMQ_PORT')) if os.environ.get('RABBITMQ_PORT') != None else 5672
MENSAJE = os.environ.get('MENSAJE') if os.environ.get('MENSAJE') != None else 'Hola Mundo'

print("RABBITMQ_HOST: ", RABBITMQ_HOST)
print("RABBITMQ_PORT: ", RABBITMQ_PORT)
print("MENSAJE: ", MENSAJE)

connection = pika.BlockingConnection(pika.ConnectionParameters(host = RABBITMQ_HOST, port = RABBITMQ_PORT))
channel = connection.channel()
channel.queue_declare(queue='hello')

while True:
    channel.basic_publish(exchange='',
                      routing_key='hello',
                      body=MENSAJE)
    print(" [x] ENVIADO: " + MENSAJE, flush=True)
    time.sleep(4)