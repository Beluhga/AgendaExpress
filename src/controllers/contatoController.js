const Contato = require('../models/contatoModel');

exports.index = (req, res) => {
    res.render('contato', {
        contato: {}
    })
    
};

exports.register = async (req, res) => {
    try{
    const contato = new Contato(req.body);
    await contato.register();

    if(contato.errors.length > 0) {
    req.flash('errors', contato.errors);
    req.session.save(() => res.redirect('/contato/index')); 
    return;
    }

    req.flash('success', 'Contato registrado com sucesso');
    req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`));
    return;
    }catch(e) {
        console.log(e);
        return res.render('404');
    }
};

exports.editIndex = async (req, res) => {
    if(!req.params.id) return res.render('404');
  
    const contato = await Contato.buscaPorId(req.params.id);
    if(!contato) return res.render('404')
  
    res.render('contato', {contato});
  };

  exports.edit = async (req, res) => { // exportando os contatos
    try {
    if(!req.params.id) return res.render('404');
    const contato = new Contato(req.body); // ele vai para o this.body de contatoModel. Ele esta chamando o Contato.prototype
    await contato.edit(req.params.id);

    if(contato.errors.length > 0) {
        req.flash('errors', contato.errors);
        req.session.save(() => res.redirect('/contato/index')); 
        return;
        }
    
        req.flash('success', 'Editado com sucesso');
        req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`));
        return;
    } catch(e){
        console.log(e);
        res.render('404');
    }
  };