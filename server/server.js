const Client = require("newsie").default;
const client = new Client({
  host: "news.epita.fr"
});

const app = require("express")();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

app.get("/groups/:group", (req, res) => {
  listMessagesInGroup(req.params.group)
    .then(snap => res.send(snap))
    .catch(err => console.error(err));
});

app.get("/groups", (req, res) => {
  listAllGroups()
    .then(snap => res.json(snap))
    .catch(err => console.error(err));
});

app.get("/", (req, res) => {
  res.send("Rien");
});

app.listen(8000);

function listAllGroups() {
  return client.connect().then(res => {
    return client.list().then(res => {
      let group = [];
      for (let i = 0; i < Object.keys(res.newsgroups).length; i++) {
        group.push(res.newsgroups[i].name);
      }
      return group;
    });
  });
}

function listMessagesInGroup(group) {
  return client
    .connect()
    .then(() => {
      return client.group(group).then(res => {
        let messages = [];
        for (let i = res.group.low; i < res.group.high; i++) {
          messages.push(
            client
              .body(i)
              .then(res => res.article.body.join())
              .catch(() => messages.slice(i, 1))
          );
        }
        return Promise.all(messages);
      });
    })
    .catch(err => console.error(err));
}
