package com.ldpst.beans;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.context.SessionScoped;
import jakarta.inject.Named;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Named("timeBean")
@ApplicationScoped
public class CurTimeBean implements Serializable {
    private String formattedDate;
    private String formattedTime;

    private ScheduledExecutorService scheduler;

    private final SimpleDateFormat dateFormat =
            new SimpleDateFormat("EEEE, MMMM dd, yyyy", new Locale("ru"));
    private final SimpleDateFormat timeFormat =
            new SimpleDateFormat("HH : mm : ss");

    @PostConstruct
    public void init() {
        scheduler = Executors.newSingleThreadScheduledExecutor();
        scheduler.scheduleAtFixedRate(this::updateDateTime, 0, 6, TimeUnit.SECONDS);
    }

    @PreDestroy
    public void destroy() {
        scheduler.shutdownNow();
    }

    private synchronized void updateDateTime() {
        Date now = new Date();
        formattedDate = capitalizeFirst(dateFormat.format(now));
        formattedTime = timeFormat.format(now);
    }

    private String capitalizeFirst(String s) {
        if (s == null || s.isEmpty()) return s;
        return Character.toUpperCase(s.charAt(0)) + s.substring(1);
    }

    public synchronized String getFormattedDate() {
        return formattedDate;
    }

    public synchronized String getFormattedTime() {
        return formattedTime;
    }
}

