AWS Lambda 업로드를 위해 사용하는 코드

## bundle
webpack

## usage
aws lambda에서는 npm을 사용할 수 없기 때문에 사용할 npm 모듈을 미리 로드하여 bundle.

사용할 npm 모듈을 import에 넣어 webpack을 이용해 bundle한 후 aws lambda에 import.js 파일 업로드

이후 index.js에서 import.js를 불러와 사용