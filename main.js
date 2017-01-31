 {
   // Initialize Firebase
    var config = {
      apiKey: "AIzaSyCrMfAJaz1vug4rV7_7a0muV8NRBwy-NME",
      authDomain: "west-voting-football.firebaseapp.com",
      databaseURL: "https://west-voting-football.firebaseio.com",
      storageBucket: "west-voting-football.appspot.com",
      messagingSenderId: "71850084430"
    };
    firebase.initializeApp(config);

  document
    .querySelectorAll('.choice button')
    .forEach(btn => btn.addEventListener('click', onVote))


  function onVote(event){
    console.log("onVote button clicked")

    //submit the vote
    // // what button i clicked on
    // console.log(event.target.dataset.value)
    const voteFor = event.target.closest('.choice').dataset.value
    const url = 'https://west-voting-football.firebaseio.com/votes.json'


    firebase.database().ref('votes').once('value', snap => snap.val() )

      .then(data => {
        // patch new count

        const newCount = data && data[voteFor] ? data[voteFor] + 1 : 1

        return firebase.database().ref('votes').update({[voteFor]: newCount})
      })

      .catch(console.error)



    // hide buttons

    document.querySelectorAll('button').forEach(btn => btn.remove())
    document.querySelectorAll('.hidden').forEach(item => item.classList.remove('hidden'))

  } // clone onVote function


  firebase.database().ref('votes').on('value', onUpdate)

  function onUpdate (snap) {
    const data = snap.val()

    document.querySelectorAll('h3').forEach(choice => {
            // reduce first arg - previous value - second arg next value
            const total = Object.values(data).reduce((acc, val) => acc + val)
            const current = data[choice.closest('.choice').dataset.value]
            choice.innerText = Math.round(current / total * 100) + "%"
          })
  }



} // Close script in brackets to make es6 variables non global




// Notes

// forEach is a metho on all arrays or node lsits
    // like a for loop but takes an argument
    // the argument is each button in the array

    // Scott uses things like forEach()instaed of for loops

    /* Can use data-whatever to store data https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
      maybe store unique identifiers for delete buttons
    */


// REMEMBER THESE

  // forEach - return is undefined

  // // take each item and do something with it
  // map - return is the array mangled ['apples', 'banana'] = > ['APPLE', 'BANANA']

  // filter - returns the array with possible fewer items

  // reduce - take array and reduces it down to a single value
