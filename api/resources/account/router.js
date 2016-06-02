'use strict';

const mongoose  = require('mongoose');
const bcrypt    = require('bcrypt');
const uuid      = require('node-uuid');

function isAuthenticated(req, res, next){

    const token = req.headers.authorization;

    const Account = mongoose.model('Account');

    console.log(req.method);
    console.log(token);

    Account.findOne({'tokens.value':token, 'tokens.expires':{$gt:Date.now()}}, (err, doc)=>{

        if(err){
            next(err);
        }

        if(doc){
            req.account = doc;
            next();
        }else{
            next('Who are you');
        }

    });

}

exports.init = (app)=>{

    app.get('/account/isLoggedIn', isAuthenticated, (req, res)=>{

        res.send(req.account);

    });

    app.post('/logout', isAuthenticated, (req, res)=>{

        const accountDoc    = req.account;
        const token         = req.headers.authorization;
        const Account = mongoose.model('Account');

        console.log('Logout');

        const q = Account.findByIdAndUpdate(accountDoc._id,
            {
                $pull:{
                    tokens:{
                        value:token
                    }
                }
            });

        q.exec()
            .then(()=>{

                res.sendStatus(200);

            });



    });

    /**
     * Login
     */
    app.post('/login', (req, res) => {

        req.checkBody('email', 'Email value is not a valid email address').isEmail();
        req.checkBody('password', 'Password required').notEmpty();

        var errors = req.validationErrors();
        if(errors) return res.status(400).send(errors);

        const email = req.body.email;
        const password = req.body.password;

        const Account = mongoose.model('Account');

        Account.findOne({ email: email }, (err, accountDoc)=>{

            if(err){
                res.status(400).send(err);
            }else{

                const hashedPassword = accountDoc.password;

                bcrypt.compare(password, hashedPassword, (err, match)=>{

                    if(match){
                        // login successful
                        const token = uuid.v1();

                        accountDoc.tokens.push({
                            value:token
                        });

                        accountDoc.save((err)=>{

                            if(!err){
                                // login successful, return token to the client
                                res.send({
                                    token:token,
                                    account:accountDoc
                                });
                            }else{
                                res.status(400).send(err);
                            }

                        });

                    }else{

                        res.status(400).send('Email or password wrong');

                    }

                });

            }

        });

    });

    /**
     * Registration
     */
    app.post('/account', (req, res)=>{

        req.checkBody('email', 'Email value is not a valid email address').isEmail();
        req.checkBody('username', 'Username only allows numbers and letters').isAlphanumeric();

        var errors = req.validationErrors();
        if(errors) return res.status(400).send(errors);

        const Account = mongoose.model('Account');

        const accountData = {
            username    : req.body.username,
            email       : req.body.email
        };

        let password = req.body.password;

        bcrypt.genSalt(10, (err, salt)=>{

            bcrypt.hash(password, salt, function(err, hash) {

                password = hash;

                accountData.password = password;

                const account = new Account(accountData);

                account.save((err)=>{

                    // login successful
                    const token = uuid.v1();

                    account.tokens.push({
                        value:token
                    });

                    account.save((err)=>{

                        if(!err) {
                            res.send({
                                token:token,
                                account:account
                            });
                        }else{
                            res.status(400).send(err);
                        }

                    });

                });

            });

        });

    });

};