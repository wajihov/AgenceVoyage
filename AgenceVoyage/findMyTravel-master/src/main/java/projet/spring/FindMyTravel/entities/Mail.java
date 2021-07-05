package projet.spring.FindMyTravel.entities;

import java.util.Map;

public class Mail {

    private String from;
    private String to;
    private String subject;
    private Map<String, Object> model;

    public Mail() {

    }

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public String getTo() {
        return to;
    }

    public String setTo(String to) {
        return this.to = to;
    }

    public String getSubject() {
        return subject;
    }

    public String setSubject(String subject) {
        return this.subject = subject;
    }

    public Map<String, Object> getModel() {
        return model;
    }

    public void setModel(Map<String, Object> model) {
        this.model = model;
    }
}
