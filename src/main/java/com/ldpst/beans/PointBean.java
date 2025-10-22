package com.ldpst.beans;

import jakarta.enterprise.context.SessionScoped;
import jakarta.inject.Inject;
import jakarta.inject.Named;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Named("point")
@SessionScoped
public class PointBean implements Serializable {
    private Double x;
    private Double y;
    private Double r = 1.0;

    @Inject
    private ControllerBean controllerBean;

    public PointBean() {
    }

    public Double getX() {
        return x;
    }

    public void setX(Double x) {
        this.x = x;
    }

    public Double getY() {
        return y;
    }

    public void setY(Double y) {
        this.y = y;
    }

    public Double getR() {
        return r;
    }

    public void setR(Double r) {
        this.r = r;
    }

    public void submit() {
        send(getX(), getY(), getR());
    }

    public void send(Double x, Double y, Double r) {
        long start = System.nanoTime();
        LocalDateTime localDateTime = LocalDateTime.now();

        Point p = new Point();

        p.setX(x);
        p.setY(y);
        p.setR(r);

        p.setDate(localDateTime);
        p.setCheck(false);

        p.setDuration(System.nanoTime() - start);

        controllerBean.addPoint(p);
    }
}
