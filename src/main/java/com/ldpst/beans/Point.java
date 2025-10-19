package com.ldpst.beans;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Point {
    private Double x;
    private Double y;
    private Double r;

    private long duration;
    private LocalDateTime date;

    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");

    private boolean check;

    public Point() {
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

    public long getDuration() {
        return duration;
    }

    public void setDuration(long duration) {
        this.duration = duration;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public boolean getCheck() {
        return check;
    }

    public void setCheck(Boolean check) {
        this.check = check;
    }

    public DateTimeFormatter getFormatter() {
        return formatter;
    }

    public void setFormatter(DateTimeFormatter formatter) {
        this.formatter = formatter;
    }

    public String beautifulDate() {
        return date.format(formatter);
    }

    public String beautifulDuration() {
        return ((duration / 1e6) * 1e6) / 1e6 + " ms";
    }
}
