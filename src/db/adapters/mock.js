const collection = [
  {
    id: "3290SNJK",
    name: "Pepper Jamson",
    age: 33,
    description: "Why do seals live in salt water? Pepper makes them sneeze. haha! call me, baby ;)",
    image: "img/profiles/pepper.png",
  },
  {
    id: "2D4NY9DNY24",
    name: "Jenny Spuds",
    age: 19,
    description: "I'm so sweet <3",
    image: "img/profiles/jenny.jpg",
  },
  {
    id: "QNDCANFF8DD",
    name: "Assley Grahams",
    age: 23,
    description: "I love butterflies",
    image: "img/profiles/assley.jpg",
  },
  {
    id: "A08NCFH4",
    name: "Mike",
    age: 25,
    description: "Eat me ;D",
    image: "img/profiles/mike.jpg",
  },
  {
    id: "NYC8R09N",
    name: "Scarrot Johanson",
    age: 32,
    description: "Hey, what's up?",
    image: "img/profiles/scarrot.jpg",
  },
];

// @private
const operative = id => element => element.id === id && !element.like && !element.dislike;

// @private
const indexExists = index => index >= 0;

// exports
const MockAdapter = () => {
  let localCollection = collection;

  return {
    getSuggestions: () => localCollection,

    getSuggestion: id => {
      const index = localCollection.findIndex(operative(id));

      if (indexExists(index)) {
        return localCollection[index];
      }

      console.warn(`- Cannot fetch [id:${id}]`)
      return null;
    },

    doLikeProfile: id => {
      const index = localCollection.findIndex(operative(id));

      if (indexExists(index)) {
        localCollection[index] = {
          ...localCollection[index],
          like: true,
        };
        console.info(`- 👍 Like ${localCollection[index].name}.`)
        return true;
      }

      console.warn(`- Cannot like [id:${id}]`)
      return false;
    },

    doDislikeProfile: id => {
      const index = localCollection.findIndex(operative(id));

      if (indexExists(index)) {
        localCollection[index] = {
          ...localCollection[index],
          dislike: true,
        };
        console.info(`- 👎 Dislike ${localCollection[index].name}.`)
        return true;
      }

      console.warn(`- Cannot dislike [id:${id}]`)
      return false;

    },

    getLikes: () => localCollection.filter(c => c.like),

    getDislikes: () => localCollection.filter(c => c.dislike),

    reset: () => {
      console.warn(`-🔙 Reset database.`)
      localCollection = collection;
      return true;
    },
  };
};

module.exports = MockAdapter;
