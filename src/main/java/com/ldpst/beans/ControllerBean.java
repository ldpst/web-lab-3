package com.ldpst.beans;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.inject.Named;
import org.primefaces.PrimeFaces;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Named("controllerBean")
@ApplicationScoped
public class ControllerBean implements Serializable {
    private List<Point> points = new ArrayList<Point>();

    public ControllerBean() {
    }

    public List<Point> getPoints() {
        return points;
    }

    public void setPoints(List<Point> points) {
        this.points = points;
    }

    public void clear() {
        points.clear();
        PrimeFaces.current().executeScript("");
    }

    public void addPoint(Point point) {
        points.add(point);
    }
}
