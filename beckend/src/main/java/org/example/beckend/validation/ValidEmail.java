package org.example.beckend.validation;

import jakarta.validation.Payload;

public @interface ValidEmail {
    // Default message
    String message() default "Field not invalid";

    // group of validation
    Class<?>[] groups() default {};

    // Payload cho metadata
    Class<? extends Payload>[] payload() default {};
}
