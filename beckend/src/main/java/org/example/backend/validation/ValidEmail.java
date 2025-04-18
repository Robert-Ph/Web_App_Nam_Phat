package org.example.backend.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import org.example.backend.validation.imp.EmailValidator;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Target({ FIELD})
@Retention(RUNTIME)
@Constraint(validatedBy = {EmailValidator.class })

public @interface ValidEmail {
    // Default message
    String message() default "Email not invalid";

    // group of validation
    Class<?>[] groups() default {};

    // Payload cho metadata
    Class<? extends Payload>[] payload() default {};
}
