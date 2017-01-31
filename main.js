document.querySelector('.choice_a button').addEventListener('click', onVote)
document.querySelector('.choice_b button').addEventListener('click', onVote)


function onVote(event){
  console.log("onVote button clicked")

  //submit the vote
  // // what button i clicked on
  console.log(event.target.dataset.value)
  const voteFor = event.target.dataset.value
  const url = 'https://west-voting-football.firebaseio.com/votes.json'

  // // go get the current counts

  // can use fetch to get images or videos - doesn't return all data
  // returns when first chunk of data returns
  // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
  fetch('https://west-voting-football.firebaseio.com/votes.json')
    // .json() belongs to fetch - return data as a json file
    .then(response => response.json())
    // this second .then only fires when the entire data is loaded in the first .then
    // use .catch() if data.json() doesnt return valid json
    .then(data => {
      console.log(data)
      // patch new count

      const newCount = data && data[voteFor] ? data[voteFor] + 1 : 1

      fetch(url, {
        method: 'PATCH',
        body: JSON.stringify({ [voteFor]: newCount})
      })

    })
    .catch(console.error)



  // hide buttons

  document.querySelectorAll('button').forEach(btn => btn.remove())



  // show current vote totals



  // submit the vote
}



// Notes

// forEach is a metho on all arrays or node lsits
    // like a for loop but takes an argument
    // the argument is each button in the array

    // Scott uses things like forEach()instaed of for loops

    /* Can use data-whatever to store data https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
      maybe store unique identifiers for delete buttons
    */
