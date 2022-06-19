const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const port = 3030
const dbClient = require('mongodb').MongoClient

const dbUrl = 'mongodb+srv://mongouser:mongouser@cluster0.lhxtt.mongodb.net/?retryWrites=true&w=majority'

dbClient.connect(dbUrl, { useUnifiedTopology: true})
    .then(client => {
        console.log('DB Connected!')
        const db = client.db('userdata')
        const dbCollection = db.collection('user_col')
    
    app.set('view engine', 'ejs')    
    app.use(bodyParser.urlencoded({extended:true}))
    app.use(bodyParser.json())
    app.use(express.static('public'))

    app.get('/', (req, res) => {
        res.render('regis.ejs', {})
    })
    
    app.post('/user', (req, res) => {
        
        const { uname, pass } = req.body
        const tanggal = new Date().toISOString()
        const pemasukan = 0;
        const pengeluaran = 0;
        const saldo = 0;
        const newBody = { uname, pass, tanggal, pemasukan, pengeluaran, saldo }

        dbCollection.insertOne(newBody)
        .then(result => {
            res.redirect('login')
            console.log(req.body)
        })
        .catch(error => console.error(error))
    })
    
    app.get('/login', (req, res) => {
        res.render('login.ejs', {})
    })

    app.post('/login', (req, res) => {
        let username = req.body.uname;
        let password = req.body.pass;
        db.collection('user_col').find({ uname: `${username}`, pass: `${password}` }).toArray()
        .then(result => {

            const obj_array_len = Object.keys(result).length
            if (obj_array_len === 0) {
                console.log('Data Not Found!')
            } else {
                console.log('Data Found!\n')
                // console.log(result)
                let str = encodeURIComponent(`${username}`)
                res.redirect('/home?name=' + str)
            }
        })
        .catch(error => 
            console.error(error))
    })
    
    app.put('/update', (req, res) => {
        let old_uname = req.body.o_uname
        let new_uname = req.body.n_uname

        dbCollection.findOneAndUpdate(
            { uname: old_uname },
            {
                $set: { 
                    uname: new_uname,
                }
            }
        )
        .then(result => {                
            let str = encodeURIComponent(`${new_uname}`)
            res.redirect('/home?u_name=' + str);
        })
    })

    app.get('/home', (req, res) => {
        let username = req.query.name   
        let new_uname = req.query.n_uname
        let cur_uname = ""

        if (username) {
            cur_uname = username
        } else {
            cur_uname = new_uname
        }
        
        dbCollection.findOne({"uname": `${username}`})
        .then(result => {
            const { pemasukan, pengeluaran, saldo} = result
            res.render('home.ejs', { 
                account: cur_uname, 
                masuk: `${pemasukan}`,
                keluar: `${pengeluaran}`,
                saldo: `${saldo}`,
            })
        })
    })
    
    app.get('/masuk', (req, res) => {
        let str = encodeURIComponent(`${new_uname}`)
        res.redirect('/addMasuk?name=');
    })

    app.get('/addMasuk', (req, res) => {
        console.log('GOOD!')
    })
    
    app.put('/saldo', (req, res) => {
        console.log(req.body)
    })



    app.listen(port, () => {
        console.log(`Server at: http://localhost:${port}`);
    })
})
.catch(error => console.error(error))