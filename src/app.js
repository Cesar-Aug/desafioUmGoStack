const express = require("express");
const { v4: uuidv4 } = require('uuid');
const cors = require("cors");
const { isUuid } = require('uuidv4');


// const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];


function validateRepoId(request, response, next){
  const {id} = request.params;

  if( !isUuid(id)){
    return response.status(400).json({error: 'Invalid project ID'});
  }
  return next();
};
app.use('/repositories/:id',validateRepoId);


app.get("/repositories", (request, response) => {
  // TODO
  return response.status(200).json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
  const {title, url, techs} = request.body;

  const repositore = {
    id: uuidv4(),
    likes: 0,
    techs,
    title,
    url

  }
  repositories.push(repositore);
  return response.status(201).json(repositore);

});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const {id} = request.params;
  const {title,url,techs} = request.body;

  const repositoreIndex = repositories.findIndex((repositore) =>repositore.id === id)
  //const repositoreIndex = findIndex(id);
  if(repositoreIndex < 0 ){
    return response.status(400).json({ error: 'Repositore Not Found' })
  }
  const repositore = {
 ...repositories[repositoreIndex],
    techs,
    title,
    url
  }

  repositories[repositoreIndex] = repositore;

  return response.status(201).json(repositore);


});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const {id} = request.params;


  const repositoreIndex = repositories.findIndex((repositore) =>repositore.id === id)

  if(repositoreIndex < 0 ){
    return response.status(400).json({ error: 'Repositore Not Found' })
  }
  repositories.splice(repositoreIndex,1);

  return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
 // TODO
 const {id} = request.params;

 const repoIndex = repositories.findIndex((repo) =>repo.id === id)
 const repositore  = repositories[repoIndex];

 if(repoIndex < 0 ){
   return response.status(400).json({ error: 'Repositore Not Found' })
 }

 repositore.likes =  repositore.likes + 1;

 repositories[repoIndex] = repositore;

 return response.status(201).json( repositories[repoIndex]);

});

module.exports = app;
