const update = document.querySelector('#update_uname')
const masuk = document.querySelector('#add_masuk')

// update.addEventListener('click', _ => {
//     let o_uname = document.querySelector('#o_uname').value;
//     let n_uname = document.querySelector('#n_uname').value;
//     fetch('/update', {
//         method: 'put',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             "o_uname": o_uname,
//             "n_uname": n_uname,
//         })
//     })
//     .then(response => {
//         window.location.reload(true)
//     })
// })

masuk.addEventListener('click', _ => {
    // let pmasuk = document.querySelector('#pmasuk').value;

    // fetch('/masuk', {
    //     method: 'put',
    //     headers: { 'Content-Type': 'application/json' },
    //     message: "Succces"
    // })
    // .then(response => {
    //     console.log(response)
    //     window.location.reload(true)
    // })

    document.querySelector('test').innerHTML = "pmasuk";
})