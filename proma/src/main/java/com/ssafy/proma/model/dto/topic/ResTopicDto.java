package com.ssafy.proma.model.dto.topic;

import lombok.Getter;
import lombok.NoArgsConstructor;

public class ResTopicDto {

  @Getter
  @NoArgsConstructor
  public static class TopicDetailDto{

    Integer topicNo;
    String title;
    String description;

    public TopicDetailDto(Integer topicNo, String title, String description) {
      this.topicNo = topicNo;
      this.title = title;
      this.description = description;
    }
  }

  @Getter
  @NoArgsConstructor
  public static class TopicNoNameDto{

    Integer topicNo;
    String title;

    public TopicNoNameDto(Integer topicNo, String title) {
      this.topicNo = topicNo;
      this.title = title;
    }
  }
}
