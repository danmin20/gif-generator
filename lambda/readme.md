# AWS Lambda API
[https://9davbjzey4.execute-api.ap-northeast-2.amazonaws.com](https://9davbjzey4.execute-api.ap-northeast-2.amazonaws.com)

## gif upload
### request
- endpoint : /
- Method : POST
- Content-Type : multipart/form-data
- Body : gif=<file>
### response
- 200 : { id: <id> }
- 400 : no gif
- 500 : server error

## gif download
### request
- endpoint : /
- Method : GET
- QueryString : id=<id>
### response
- 200 : Content-type:image/gif
- 400 : no id
- 404 : not found
- 500 : server error