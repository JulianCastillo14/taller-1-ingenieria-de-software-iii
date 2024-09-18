import java.nio.charset.StandardCharsets;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.DeliverCallback;

public class Receiver {

    private final static String QUEUE_NAME = "hello";


    public static void main(String[] argv) throws Exception {

        String value_name = System.getenv("RABBITMQ_HOST");
        String value_host = System.getenv("RABBITMQ_PORT");
        String RABBITMQ_HOST = value_name != null ? value_name : "localhost";
        String RABBITMQ_PORT = value_host != null ? value_host : "5672";
        
        System.out.println("RABBITMQ_HOST: " + RABBITMQ_HOST);
        System.out.println("RABBITMQ_PORT: " + RABBITMQ_PORT);
        
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost(RABBITMQ_HOST);
        Connection connection = factory.newConnection();
        Channel channel = connection.createChannel();

        channel.queueDeclare(QUEUE_NAME, false, false, false, null);
        System.out.println(" [*] Esperando mensajes en JAVA.... ");

        DeliverCallback deliverCallback = (consumerTag, delivery) -> {
            String message = new String(delivery.getBody(), StandardCharsets.UTF_8);
            System.out.println(" [x] MENSAJE RECIBIDO EN JAVA: '" + message + "'");
        };
        channel.basicConsume(QUEUE_NAME, true, deliverCallback, consumerTag -> { });
    }
    
}
