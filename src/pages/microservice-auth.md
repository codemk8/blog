---
path: "/blog/build-cloud-native-microservices-I-user-registration"
date: "2019-04-27"
title: "Build Cloud Native Microservices (I) -- User Registration"
---

## Introduction

Recent years have witnessed the proliferation of building applications with microservices. This serie of blog posts intends to share some concrete examples of building such microservices in a cloud-native environment.


### Objectives

First let's collect our requirements to provide a user registration service. In this service, we will provide three functionalities:

* User registration with user name and password, returns success or not;
* Password update with user name, old password and new password, returns success or not;
* User authentication with user name and password, returns success or not;

Each of the above service, in this implementation, corresponds to a RESTful HTTP endpoint, more specifically:

* POST with user name and password in the HTTP request header;
* POST with user name, old password and new password as JSON in the HTTP request body;
* GET with user name and password in the HTTP request header;

```go
import "golang.org/x/crypto/bcrypt"

func HashPassword(password string) (string, error) {
        bytes, err := bcrypt.GenerateFromPassword([]byte(password), 12)
        return string(bytes), err
}

func CheckPasswordHash(password, hash string) bool {
        err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
        return err == nil
}
```