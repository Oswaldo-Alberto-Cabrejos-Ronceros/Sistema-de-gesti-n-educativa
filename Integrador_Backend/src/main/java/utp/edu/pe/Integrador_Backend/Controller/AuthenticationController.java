package utp.edu.pe.Integrador_Backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import utp.edu.pe.Integrador_Backend.Authentication.AuthResponse;
import utp.edu.pe.Integrador_Backend.Authentication.LoginRequest;
import utp.edu.pe.Integrador_Backend.Service.AuthenticationService;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequest) {
        AuthResponse response = authenticationService.authenticateUser(loginRequest);
        return ResponseEntity.ok(response);
    }
}
