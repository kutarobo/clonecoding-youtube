1. redux - devtool

2. class component vs functional component

- class component 가 좀 더 느리지만 기능이 많았다.
- react hook이 나온 이후 functional component가 지원하는 기능이 많이 따라와서 퍼포먼스가 나은 functional 이 대세가 되고있다
- todo 검색

3. 드랍존 패키지 라이브러리 `npm install react-dropzone --save`

4. multer

- 설치 `npm install multer --save`
- 서버에 파일 저장하는 패키지 라이브러리
- [한국어버젼 도큐먼트](https://github.com/expressjs/multer/blob/master/doc/README-ko.md)
- 강의 내용중 버그 [관련이슈](https://github.com/jaewonhimnae/react-youtube-clone/issues/18)

  ```js
  const path = require("path");

  const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`);
  },
  });

  const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {  // 필터위치가 이쪽.
      const ext = path.extname(file.originalname);
      if (ext !== ".mp4") {
        return cb(new Error("only mp4 is allowed"), false); // req.status 같은건 찾을 수 없다. 이런식으로 에러를 던져준다.
      }
      cb(null, true);
  },
  }).single("file");

  router.post("/uploadfiles", (req, res) => {
      upload(req, res, (err) => {
          if (err) {
              return res.json({ success: false, err: err.message }); // 에러메세지 전달.
          }
  ```
