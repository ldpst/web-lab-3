package com.ldpst.beans;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.inject.Named;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Named("controllerBean")
@ApplicationScoped
public class ControllerBean implements Serializable {
    private List<Point> points = new ArrayList<Point>();

    @Inject
    private PointBean point;

    public ControllerBean() {
    }

    public List<Point> getPoints() {
        return points;
    }

    public void setPoints(List<Point> points) {
        this.points = points;
    }

    public void submit() {
        long start = System.nanoTime();
        LocalDateTime localDateTime = LocalDateTime.now();

        Point p = new Point();

        p.setX(point.getX());
        p.setY(point.getY());
        p.setR(point.getR());

        p.setDate(localDateTime);
        p.setCheck(false);

        p.setDuration(System.nanoTime() - start);

        points.add(p);
    }

    public void clear() {
        points.clear();
    }
}
