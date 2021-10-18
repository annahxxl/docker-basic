# 베이스 이미지를 명시해 준다.
FROM alpine

# 추가적으로 필요한 파일들을 다운로드한다.
# RUN command

# 컨테이너 시작 시 실행 될 명령어를 명시해 준다.
CMD ["echo", "hello"]