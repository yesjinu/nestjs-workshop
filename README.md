# Purpose 
- 프로젝트에 공통으로 필요한 기능들을 템플릿으로 만들어 재사용하기 위함
- `libs/`에 독립적으로 사용 가능한 모듈의 구현부가 있고, `apps/`에서는 이를 이용한 데모 유즈케이스를 구현함

# How to run 
```bash
nest start app_name (--watch)
```

# How to add new app
```bash
nest generate app app_name
nest generate lib app_name
```


# TODO
- [x] Cache
- [x] Global Exception Filter
- [ ] Async local storage
- [ ] Id generator
