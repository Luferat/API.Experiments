/**
 * control/thingControl.js
 * Controller da tabela "things" do banco de dados.
 */

// Importa conector do banco de dados.
const conn = require('../model/mysql');

// Importa validador de things.
const validate = require('../tools/validationThing')

// Objeto "controller" para a entidade "things" do banco de dados.
const thingControl = {

  // Lista todos os registros válidos.
  getAll: async (req, res) => {
    try {
      const [rows] = await conn.query("SELECT * FROM things WHERE tstatus = 'on' ORDER BY tdate DESC");
      res.json({ data: rows });
    } catch (error) {
      res.json({ status: "error", message: error });
    }
  },

  // Lista um registro único pelo Id.
  getOne: async (req, res) => {

    try {

      // Extrai o Id da rota.
      const { id } = req.params;

      // Valida se o Id é um inteiro.
      if (isNaN(parseInt(id, 10)))
        res.json({ status: "error", message: "Id inválido!" });
      else {

        // Executa a consulta.
        const { id } = req.params;
        const [rows] = await conn.query("SELECT * FROM things WHERE tstatus = 'on' AND tid = ?", [id]);
        res.json({ data: rows });
      }
    } catch (error) {
      res.json({ status: "error", message: error });
    }
  },

  // Apaga um registro único pelo Id.
  delete: async (req, res) => {
    try {
      // Extrai o Id da rota.
      const { id } = req.params;

      // Valida se o Id é um inteiro.
      if (isNaN(parseInt(id, 10)))
        res.json({ status: "error", message: "Id inválido!" });
      else {

        // Executa a consulta.
        const { id } = req.params
        const sql = "UPDATE things SET tstatus = 'del' WHERE tid = ?"
        const [rows] = await conn.query(sql, [id]);
        res.json({ data: rows });
      }
    } catch (error) {
      res.json({ status: "error", message: error });
    }

  },

  // Insere um novo registro.
  post: async (req, res) => {
    try {
      const { user, name, photo, description, location, options } = req.body;
      const sql = "INSERT INTO things (tuser, tname, tphoto, tdescription, tlocation, toptions) VALUES (?, ?, ?, ?, ?, ?)";
      const [rows] = await conn.query(sql, [user, name, photo, description, location, options]);
      res.json({ data: rows });
    } catch (error) {
      res.json({ status: "error", message: error });
    }
  },

  // Edita o registro pelo Id.
  put: async (req, res) => {

    // Extrai o Id da rota.
    const { id } = req.params;

    // Valida se o Id é um inteiro.
    if (isNaN(parseInt(id, 10)))
      res.json({ status: "error", message: "Id inválido!" });
    else {

      try {

        // Valida preenchimento dos campos.
        err = validate(req.body);

        // Se ocorreram erros...
        if (err.length > 0) {
          res.json({ status: "error", message: err })
        } else {
          // Executa a consulta.
          const { user, name, photo, description, location, options } = req.body;
          const { id } = req.params;
          const sql = "UPDATE things SET tuser = ?, tname = ?, tphoto = ?, tdescription = ?, tlocation = ?, toptions = ? WHERE tid = ?"
          const [rows] = await conn.query(sql, [thing.user, thing.name, thing.photo, thing.description, thing.location, thing.options, id]);
          res.json({ data: rows });
        }
      }

      catch (error) {
        res.json({ status: "error", message: error });
      }
    }
  }
};

// Exporta o módulo.
module.exports = thingControl;

/**
 * By Luferat 2023
 * MIT Licensed
 */