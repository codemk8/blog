---
path: "/blog/build-cloud-native-microservices-I-user-registration"
date: "2019-04-27"
title: "Build Cloud Native Microservices (I) -- User Registration"
---

# Introduction

Some people now believe that microservice is the closest thing as the silver bullet to build web applications. This serie of blog posts intends to share some concrete examples of building small but essential microservices in a cloud-native environment. We start from building a user registration service.

# Objectives

First let's collect our requirements to provide such a service. We would like to provide three functionalities:

* User registration with user name (or email) and password
* Password update with user name, old password and new password
* User authentication with user name and password

# Design Choices

There are many ways to implement a microservice. Here we make several opinionated design decisions. 

1. For interface, we decide to expose the service via Restful HTTP endpoints. Other options include (g)RPC, message queue or GraphQL. Since this service is so fundamental, we pick REST.
2. For persistent storage of user information, we decide to use AWS's DynamoDB, which is a scalable key-value schema-less database. Even though this requires some prior configurations on AWS, the benefits of doing so are enormous:
    * We no longer worry about loss of data;
    * We do not need to set up and maintain a database ourselves;

For 1, each of the above service corresponds to a RESTful HTTP endpoint, more specifically:

* POST with user name and password in the HTTP request (JSON body);
* POST with user name, old password and new password in the HTTP request (JSON body);
* GET with basic authentication in the HTTP request;

# Passcode Hashing and Checking

The password verification scheme is based on `bcrypt` package in go-lang. Given a plain-text password, `GenerateFromPassword` generates a per-user hash code (embedded with a random salt and the level of difficulty). The real password is thrown away after the hash code has been generated. In future authentications, we use the one-way function `CompareHashAndPassword` to verify if the given password matches with the stored hash code.

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

We choose `dynamoDB` for fast prototyping. We start with the simpliest schema:

```go
type User struct {
	UserName string
	Pass     string
	Created  int64
	Data     map[string]interface{}
}
```

where `UserName` is the primary key.

The checking, adding and updating of users on the database via dynamoDB operations can be found at [client.go](https://github.com/codemk8/muser/blob/master/pkg/dynamodb/client.go).

# Deploy and Test

After build the binary, we can run the server on a host with aws credentials:

```bash
./bin/muser --addr 127.0.0.1:8000 --region us-west-2 --table dev.muser.codemk8
```

Note this assumes we have created a database named `dev.muser.codemk8` at `us-west-2` region.

To test the server, we can issue some simple curl commands:

* To register a user 

```bash
$ curl -X POST -H "Content-Type: application/json" \
        -d '{"user_name": "test_user", "password": "secret"}' \
        http://localhost:8000/v1/user/register
```

* To authenticate a user

```bash
$ curl -X GET --user test_user:password  http://localhost:8000/v1/user/auth
```

* To change the password

```bash
$ curl -X POST -H "Content-Type: application/json" \
        -d '{"user_name": "test_user", "password": "secret", "new_password":"secret2"}' \
        http://localhost:8000/v1/user/update
# Change back
$ curl -X POST -H "Content-Type: application/json" \
        -d '{"user_name": "test_user", "password": "secret2", "new_password":"secret"}' \
        http://localhost:8000/v1/user/update
```

# Code

The complete code can be found at [https://github.com/codemk8/muser](https://github.com/codemk8/muser).

