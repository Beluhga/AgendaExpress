const Contato = require('../models/contatoModel');

exports.index = async (req, res) => {
  const contatos = await Contato.buscarContatos();
  res.render('index', {contatos});
};
