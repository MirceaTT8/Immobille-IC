package com.example.real_estate_backend.domain;

import java.util.Objects;

public class Property {
    private int id;
    private String name;
    private String description;
    private String location;
    private String image;
    private String type;
    private String status;

    public Property(int id, String name, String description, String location, String image, String type, String status) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.location = location;
        this.image = image;
        this.type = type;
        this.status = status;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public String getLocation() {
        return location;
    }

    public String getImage() {
        return image;
    }

    public String getType() {
        return type;
    }

    public String getStatus() {
        return status;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Property{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", location='" + location + '\'' +
                ", image='" + image + '\'' +
                ", type='" + type + '\'' +
                ", status='" + status + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Property property)) return false;
        return id == property.id && Objects.equals(name, property.name) && Objects.equals(description, property.description) && Objects.equals(location, property.location) && Objects.equals(image, property.image) && Objects.equals(type, property.type) && Objects.equals(status, property.status);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, description, location, image, type, status);
    }
}
