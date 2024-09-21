using System.Text;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

var value_host = Environment.GetEnvironmentVariable("RABBITMQ_HOST");
var value_port = Environment.GetEnvironmentVariable("RABBITMQ_PORT");
var RABBITMQ_HOST = value_host != null ? value_host : "localhost";
var RABBITMQ_PORT = value_port != null ?  Int32.Parse(value_port): 5672;

Console.WriteLine($"RABBITMQ__HOST: {RABBITMQ_HOST}");
Console.WriteLine($"RABBITMQ__HOST: {RABBITMQ_PORT}");

var factory = new ConnectionFactory { HostName = RABBITMQ_HOST, Port = RABBITMQ_PORT};
using var connection = factory.CreateConnection();
using var channel = connection.CreateModel();

channel.QueueDeclare(queue: "hello",
                     durable: false,
                     exclusive: false,
                     autoDelete: false,
                     arguments: null);

Console.WriteLine(" [*] ESPERANDO MENSAJES DESDE .NET");

var consumer = new EventingBasicConsumer(channel);

consumer.Received += (model, ea) =>
{
    var body = ea.Body.ToArray();
    var message = Encoding.UTF8.GetString(body);
    Console.WriteLine($" [x] MENSAJE RECIBIDO DESDE .NET ->  {message}");
};
channel.BasicConsume(queue: "hello",
                     autoAck: true,
                     consumer: consumer);

await Task.Delay(-1);  
