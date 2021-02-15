const axios = require('axios');

let cat = `https://aws.random.cat/meow`;
let dog = `https://random.dog/woof.json`;
let redPanda = `https://some-random-api.ml/img/red_panda`;
let panda = `https://some-random-api.ml/img/panda`; //res.data.link
let bird = `https://some-random-api.ml/img/birb`; //res.data.link
let fox = `https://some-random-api.ml/img/fox`; //res.data.link

const fetchCat = (message) => {
  axios.get(`${cat}`)
    .then(res => {
      message.channel.send(res.data.file)
    })
    .catch(err => {
      message.reply(`Woops, couldn't find a random cat 😿`)
    })
}

const fetchDog = (message) => {
  axios.get(`${dog}`)
  .then(res => {
    message.channel.send(res.data.url)
  })
  .catch(err => {
    message.reply(`Woops, couldn't find a random dog`)
  })
};

const fetchRedPanda = (message) => {
  axios.get(`${redPanda}`)
    .then(res => {
      message.channel.send(res.data.link)
    })
    .catch(err => {
      message.reply(`Woops. couldn't find a random red panda`)
    })
}

module.exports = {
  name: 'animal',
  description: 'Get a random animal gif/image! Limited to cats and dogs for now',
  execute(message) {
    let rand = Math.floor(Math.random() * 3) + 1;
    console.log(rand);

    switch (rand) {
      case 1:
        return fetchCat(message);
        break;
      case 2: 
        return fetchDog(message);
        break;
      case 3:
        return fetchRedPanda(message);
        break;
    }
  }
}