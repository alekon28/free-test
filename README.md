# free-test
Web application for creating tests


#API
##Возможности
###Регистрация
Регистрация происходить при отправке запроса на `/api/signup`
```
POST /api/signup HTTP/1.1
> Host: 127.0.0.1:5000
> User-Agent: curl/7.68.0
> Accept: */*
> Content-Type: application/json
> Content-Length: 36
>
{"username":"user","password":"pass"}

< HTTP/1.0 200 OK
< Content-Type: application/json
< Content-Length: 33
< Server: Werkzeug/1.0.1 Python/3.8.5
< Date: Tue, 04 May 2021 15:56:22 GMT
< 
{"id": "<user_id>"}
* Closing connection 0
```
###Авторизация
Авторизация происходить при отправке запроса на `/api/signin`
```
POST /api/signin HTTP/1.1
> Host: 127.0.0.1:5000
> User-Agent: curl/7.68.0
> Accept: */*
> Content-Type: application/json
> Content-Length: 34
> 
{"username":"a","password":"didi"}
< HTTP/1.0 200 OK
< Content-Type: application/json
< Content-Length: 278
< Server: Werkzeug/1.0.1 Python/3.8.5
< Date: Tue, 04 May 2021 16:06:56 GMT
< 
{"token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTYyMDE0NDQxNiwianRpIjoiN2U2OTIwYjAtMmIyOC00Njk2LTllNjgtMmIwYzdjMmEyOTMwIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImEiLCJuYmYiOjE2MjAxNDQ0MTYsImV4cCI6MTYyMDIzMDgxNn0.uSLrnLydtt6FLNOsDhtSl6w-hfLZ0L79b16LWUShr2Q"}
* Closing connection 0
```
Последующие запросы должны содержать заголовок `Authorization: Bearer <token>`
```
GET /api/test HTTP/1.1
> Host: 127.0.0.1:5000
> User-Agent: curl/7.68.0
> Accept: */*
> Content-Type: application/json
> Content-Length: 34
> Authorization: Bearer <token>
>
```