
const swipe = document.querySelector('#swipeblediv')
let action = undefined

let xDown = null;
let yDown = null;

function getTouches(e) {
  return e.touches ||             // browser API
    e.originalEvent.touches; // jQuery
}

function handleTouchStart(e) {
  const firstTouch = getTouches(e)[0];
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
};

async function handleTouchMove(e) {
  if (!xDown || !yDown) {
    return;
  }

  let xUp = e.touches[0].clientX;
  let yUp = e.touches[0].clientY;

  let xDiff = xDown - xUp;
  let yDiff = yDown - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
    if (xDiff > 0) {
      action = 'dislike'
      /* left swipe */
    } else {
      action = 'like'
      /* right swipe */
    }
  } else {
    if (yDiff > 0) {
      action = "up"
      /* up swipe */
    } else {
      action = "down"
      /* down swipe */
    }
  }

  // const div = document.querySelector('#hidden')
  // div.classList.toggle('hide-element')
  // window.location = '/account'
  /* reset values */
  xDown = null;
  yDown = null;
};

async function handleTouchEnd(e) {
  if (action === 'dislike' || action === 'like') {
    _id = e.target.id
    voteFetch(action, _id)
  }
}

async function mouseClick(e) {

  let relX = Math.round(100 * e.layerX / e.target.clientWidth)
  let relY = Math.round(100 * e.layerY / e.target.clientHeight)
  if (relY > 30 && relY < 70) {
    if (relX < 25) {
      action = 'dislike'
    }
    if (relX > 75) {
      action = 'like'
    }
  }


  if (action === 'dislike' || action === 'like') {
    _id = e.target.id
    voteFetch(action, _id)
  }

  // const body = { action }
  // const act = await fetch('/api/swipe', {
  //   method: 'post',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(body)
  // })
  // const result = await act.json()
}

async function voteFetch(act, _id) {

  const divs = document.querySelectorAll('#swipeblediv')

const leftdiv = document.querySelector('#leftdiv')
const rightdiv = document.querySelector('#rightdiv')


  const targetClassList = divs[0].classList

  const likespinner = document.querySelector('#like')
  const dislikespinner = document.querySelector('#dislike')
  if (act === 'like') {
    leftdiv.classList.remove('dislike')
    targetClassList.add('like')
    likespinner.style.visibility = 'visible'
  } else if (act === 'dislike') {
    rightdiv.classList.remove('like')
    targetClassList.add('dislike')
    // dislikespinner.style.visibility = 'visible'
  }
  const body = { act, _id }
  const response = await fetch('/api/swipe', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  const result = await response.json()
  window.location = '/'
  action = undefined
}

swipe.addEventListener('touchstart', handleTouchStart, false);
swipe.addEventListener('touchmove', handleTouchMove, false);
swipe.addEventListener('touchend', handleTouchEnd, false);
swipe.addEventListener('click', mouseClick, false)
