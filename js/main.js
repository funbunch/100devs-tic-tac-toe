window.addEventListener("DOMContentLoaded", () => {
  let playerResult = document.getElementById('playerText')
  let boxes = Array.from(document.getElementsByClassName('box'))
  let reset = document.querySelector('.clear')
  let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')
  //console.log(boxes)

  const playerX = 'X'
  const playerO = "O"
  let currentPlayer = playerX
  let spaces = Array(9).fill(null)
  //console.log(spaces)

  const startGame = () => {
    boxes.forEach( box => box.addEventListener('click', boxClicked))
  }

  function boxClicked(e) {
    const id = e.target.id
    //console.log(e)

    if(!spaces[id]) {
      spaces[id] = currentPlayer
      //adding x's and o's
      e.target.innerText = currentPlayer

      if (playerWon() !==false) {
        playerResult.innerHTML = `${currentPlayer} has won!`
        let winningBlocks = playerWon()
        
        //console.log(winningBlocks) 
        winningBlocks.map(box => boxes[box].style.backgroundColor = winnerIndicator)
      }
      //console.log("Player:",currentPlayer,"| BoxID:", e.target.id, spaces)
      currentPlayer = currentPlayer === playerX ? playerO : playerX

    }
  }
  
  const winning = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]
    
  function playerWon() {    
    for (const condition of winning) {
      const id = e.target.id
      let [a, b, c] = condition 
      //this is IF Spaces A exists > then check if they are the same
      if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] === spaces[c])) {
        console.log('playtriggered')
        e.target.removeEventListener('click', boxClicked);
        return [a,b,c]
      
      }
    }
  return false
  }

reset.addEventListener('click', restart) 

  function restart() {
    spaces.fill(null)

    boxes.forEach( box => {
      box.innerText = ''
      box.style.backgroundColor = ''
    })

    playerResult = "Tix Tac Toe"
    currentPlayer = playerX
    
  }

  startGame()
})

