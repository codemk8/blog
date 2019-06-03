---
path: "/blog/build-cloud-native-microservices-II-token-issuer"
date: "2019-05-27"
title: "Build Cloud Native Microservices (II) -- Token Issuer"
---

# Introduction

In the previous post ([user registration microservice](https://codemk8.dev/blog/build-cloud-native-microservices-I-user-registration)), we built a microservice to handle user registration and password authentication. Each authentication operation involves a round-trip to database, which can be expensive. Therefore, in modern web applications, that authentication mechanism is used much less frequently by token issue service, where authentication becomes a much faster in-memory operation. 

# APIs

# Code

The complete code can be found at [https://github.com/codemk8/mtoken](https://github.com/codemk8/mtoken).


# Reference

* [For using browser cookie](https://www.sohamkamani.com/blog/golang/2019-01-01-jwt-authentication/)