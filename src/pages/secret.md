---
path: "/secret/2"
date: "2019-01-07"
title2: "Draft"
---

## Topic

There are many ways to implement a microservice. Here we make several opinionated design choices. 

1. For interface, we decide to expose the service via Restful HTTP endpoints. Other options include (g)RPC or message queue, which we will discuss later. 
2. For persistent storage of user information, we decide to use AWS's DynamoDB, which is a scalable key-value schema-less database. Even though this requires some prior configurations on AWS, the benefits of doing so are enormous:
    * We no longer worry about loss of data;
    * We do not need to set up a database ourselves;

### 

### AWS

DynamoDB is a scalable key-value scheme-less database. We can always start from a simple schema and add complexity later. At this moment, we can start from a simple key-value pair:  

```
key: user name
val: salted pss
```

```go
func a
```