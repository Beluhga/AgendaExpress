const Login = require('../models/LoginMOdel');

exports.index = (req, res) => {
    if(req.session.user) return res.render('logado');
    res.render('login');
}

// instanciando para dentro da classe
exports.register = async (req, res) => { 
    try {
        const login = new Login(req.body); 
        await login.register();
    
        if(login.errors.length > 0) {
            req.flash('errors', login.errors); 
            req.session.save(function() {
                return res.redirect('/login/index'); 
            });
            return;
        }
        req.flash('success', 'Seu usuário foi criado com sucesso'); 
            req.session.save(function() {
                return res.redirect('/login/index'); 
            });
    } catch(e){
        console.log(e);
        res.render('404');
    }
   
}

exports.login = async (req, res) => { 
    try {
        const login = new Login(req.body); 
        await login.login(); //pedi para fazer o login
    
        if(!login.user) { // se ocorrer algum error
            req.flash('errors', login.errors); 
            req.session.save(function() { //se estiver certo, ele salva a sessao e retorna
                return res.redirect('/login/index'); 
            });
            return;
        }
        req.flash('success', 'Conectado'); //se nao tiver errros ele passa normalmente
        req.session.user = login.user;// recebendo o usuario
            req.session.save(function() {
                return res.redirect('/login/index'); 
            });
    } catch(e){
        console.log(e);
        res.render('404');
    }
}
exports.logout = function(req, res) {
    req.session.destroy();
    res.redirect('/');
}