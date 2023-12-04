package com.viajecito.api.service.impl;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class StorageService {

    @Autowired
    private AmazonS3 amazonS3;

    private String bucketName = "1023c01-grupo1-s3";

    public void uploadFile(String keyName, MultipartFile file) {
        try {
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentLength(file.getSize());
            amazonS3.putObject(new PutObjectRequest(bucketName, keyName, file.getInputStream(), metadata));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // Métodos adicionales para descargar, eliminar, etc.
}
