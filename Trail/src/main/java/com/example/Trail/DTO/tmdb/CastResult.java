package com.example.Trail.DTO.tmdb;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CastResult {

    private String name;
    private String character;

    @JsonProperty("profile_path")
    private String profilePath;

}
