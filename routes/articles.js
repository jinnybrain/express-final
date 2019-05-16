var express = require('express');
var router = express.Router();

/* /articles 전체보기  */
router.get('/', (req, res) => {
  const client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    if(err){
      res.status(500).send(err.toString());
    } else {
      const collection = client.db(DBNAME).collection(COLLECTION);
      const cursor = collection.find({});
      cursor.toArray((err, data)=>{
        res.json(data);
      });
      client.close();
    }
  });
});

/* /articles/:id 상세보기  */
router.get('/:articleNum', (req, res) => {
  const articleNumber = req.params.articleNum;
  res.send(articleNumber + ' 번글 보기');
});

/* /articles 등록  */
router.post('/', (req, res) => {
  const articleJsonFromClient = req.body;
  res.json(articleJsonFromClient);
});

/* /articles/:id 수정  */
router.put('/:articleNum', (req, res) => {
  const articleNumber = req.params.articleNum;
  const jsonFromClient = req.body;

  res.send(articleNumber + ' 번 글 수정');
});

/* /articles/:id 삭제  */
router.delete('/:articleNum', (req, res) => {
  const articleNumber = parseInt(req.params.articleNum);
  res.send(articleNumber + ' 번 글 삭제');
});


module.exports = router;
