---
path: "/blog/build-cloud-native-microservices-I-user-registration"
date: "2019-04-27"
title: "Build Cloud Native Microservices (I) -- User Registration"
---

# Introduction

Recent years have witnessed the proliferation of building applications with microservices. This serie of blog posts intends to share some concrete examples of building such microservices in a cloud-native environment.


# Objectives

First let's collect our requirements to provide a user registration service. In this service, we will provide three functionalities:

* User registration with user name and password
* Password update with user name, old password and new password
* User authentication with user name and password

# Design Choices

There are many ways to implement a microservice. Here we make several opinionated design choices. 

1. For interface, we decide to expose the service via Restful HTTP endpoints. Other options include (g)RPC or message queue, which we will try later. 
2. For persistent storage of user information, we decide to use AWS's DynamoDB, which is a scalable key-value schema-less database. Even though this requires some prior configurations on AWS, the benefits of doing so are enormous:
    * We no longer worry about loss of data;
    * We do not need to set up and maintain a database ourselves;

For 1, each of the above service, corresponds to a RESTful HTTP endpoint, more specifically:

* POST with user name and password in the HTTP request (JSON body);
* POST with user name, old password and new password in the HTTP request (JSON body);
* GET with basic authentication in the HTTP request;

# Passcode Hashing and Checking

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

# DynamoDB Schema

