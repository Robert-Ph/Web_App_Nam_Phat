package org.example.beckend.validation.imp;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.example.beckend.validation.EnumValid;

import java.util.Arrays;
import java.util.Objects;

public class EnumValidator implements ConstraintValidator<EnumValid, String> {
    private EnumValid annotation;

    @Override
    public void initialize(EnumValid annotation) {
        this.annotation = annotation;
    }



    //Verify các enum hợp lệ
    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (Objects.isNull(value)) {
            return true;
        }
        return Arrays.stream(annotation.enumClass().getEnumConstants())
                .anyMatch(e -> e.name().equals(value));
    }

}
