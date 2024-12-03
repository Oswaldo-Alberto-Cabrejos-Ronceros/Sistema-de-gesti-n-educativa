package utp.edu.pe.Integrador_Backend.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.net.URL;
import java.util.UUID;

@Service
public class S3Service {

    @Autowired
    private S3Client s3Client;

    @Value("${aws.s3.bucketName}")
    private String bucketName;

    public String subirArchivo(MultipartFile archivo, String rutaDestino) {
        String nombreArchivo = UUID.randomUUID().toString() + "_" + archivo.getOriginalFilename();

        try {
            // Construir la clave del objeto en S3 (ruta en el bucket)
            String clave = rutaDestino + "/" + nombreArchivo;

            // Crear una solicitud PutObject
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(clave)
                    .contentType(archivo.getContentType())
                    .build();

            // Subir el archivo
            s3Client.putObject(putObjectRequest, RequestBody.fromInputStream(archivo.getInputStream(), archivo.getSize()));

            // Obtener la URL pública del archivo usando S3Utilities
            URL url = s3Client.utilities().getUrl(builder -> builder.bucket(bucketName).key(clave));
            String urlArchivo = url.toString();

            return urlArchivo;
        } catch (IOException e) {
            throw new RuntimeException("Error al subir el archivo a S3", e);
        }
    }

    public void eliminarArchivo(String clave) {
        try {
            DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                    .bucket(bucketName)
                    .key(clave)
                    .build();

            s3Client.deleteObject(deleteObjectRequest);
        } catch (Exception e) {
            throw new RuntimeException("Error al eliminar el archivo en S3", e);
        }
    }
}