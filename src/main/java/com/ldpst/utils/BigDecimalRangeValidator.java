package com.ldpst.utils;

import jakarta.faces.application.FacesMessage;
import jakarta.faces.component.UIComponent;
import jakarta.faces.context.FacesContext;
import jakarta.faces.validator.FacesValidator;
import jakarta.faces.validator.Validator;
import jakarta.faces.validator.ValidatorException;
import java.math.BigDecimal;

@FacesValidator("bigDecimalRangeValidator")
public class BigDecimalRangeValidator implements Validator<Object> {

    private static final BigDecimal MIN = new BigDecimal("-3");
    private static final BigDecimal MAX = new BigDecimal("5");

    @Override
    public void validate(FacesContext context, UIComponent component, Object value) throws ValidatorException {
        if (value == null) {
            throw new ValidatorException(
                    new FacesMessage(FacesMessage.SEVERITY_ERROR, "Поле Y не может быть пустым", null)
            );
        }

        if (!(value instanceof BigDecimal)) {
            throw new ValidatorException(
                    new FacesMessage(FacesMessage.SEVERITY_ERROR, "Неверный формат числа Y", null)
            );
        }

        BigDecimal bd = (BigDecimal) value;
        if (bd.compareTo(MIN) < 0 || bd.compareTo(MAX) > 0) {
            throw new ValidatorException(
                    new FacesMessage(FacesMessage.SEVERITY_ERROR, "Введите число Y от -3 до 5", null)
            );
        }
    }
}
