// // const axios = require('axios')
// document.getElementById('postForm').addEventListener('submit', e => {
//     e.preventDefault()

//     axios.post('/posts/create', {withCredentials: true})
//     .then(res => {
//       if(res.success) {
//         console.log(res.message)
//       }
//     })
//     .catch(e => {
//       console.log('post error ', e)
//     })
//   })