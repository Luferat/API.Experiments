/**
 * control/userControl.js
 * Controller da tabela "things" do banco de dados.
 */

// Importa conector do banco de dados.
const conn = require('../model/mysql');

// Importa validador de campos.
const validate = require('../tools/validationUser')

// Inicializa variáveis.
user = {}
err = []

// Objeto "controller" para a entidade "things" do banco de dados.
const userControl = {

    // Lista todos os registros válidos.
    getAll: async (req, res) => {
        try {
            const [rows] = await conn.query("SELECT * FROM users WHERE ustatus = 'on' ORDER BY uname");
            res.json({ data: rows });
        } catch (error) {
            res.json({ status: "error", message: error });
        }
    },

    // Lista um registro único pelo Id.
    getOne: async (req, res) => {
        try {

            // Extrai o Id do usuário, da rota.
            const { id } = req.params;

            // Valida se o Id é um inteiro.
            if (isNaN(parseInt(id, 10)))
                res.json({ status: "error", message: "Id inválido!" });
            else {
                const { id } = req.params;
                const [rows] = await conn.query("SELECT * FROM users WHERE uid = ? AND ustatus = 'on'", [id]);
                res.json({ data: rows });
            }
        } catch (error) {
            res.json({ status: "error", message: error });
        }

    },

    // Apaga um registro único pelo Id.
    delete: async (req, res) => {
        try {

            // Extrai o Id do usuário, da rota.
            const { id } = req.params;

            // Valida se o Id é um inteiro.
            if (isNaN(parseInt(id, 10)))
                res.json({ status: "error", message: "Id inválido!" });
            else {
                const sql = "UPDATE users SET ustatus = 'del' WHERE uid = ?"
                const [rows] = await conn.query(sql, [id]);
                res.json({ data: rows });
            }
        } catch (error) {
            res.json({ status: "error", message: error });
        }
    },

    // Insere um novo registro.
    post: async (req, res) => {

        // Valida preenchimento dos campos.
        err = validate(req.body);

        // Se ocorreram erros...
        if (err.length > 0) {
            res.json({ status: "error", message: err })
        } else {
            try {
                const sql = "INSERT INTO users (uname, uemail, upassword, uavatar, ubirth) VALUES (?, ?, SHA1(?), ?, ?)";
                const [rows] = await conn.query(sql, [user.name, user.email, user.password, user.avatar, user.birth]);
                res.json({ status: "success", data: rows });
            } catch (error) {
                res.json({ status: "error", message: error });
            }
        }

    },

    // Edita o registro pelo Id.
    put: async (req, res) => {

        // Extrai o Id do usuário, da rota.
        const { id } = req.params;

        // Valida se o Id é um inteiro.
        if (isNaN(parseInt(id, 10)))
            res.json({ status: "error", message: "Id inválido!" });
        else {

            try {

                // Valida preenchimento dos campos.
                val = validate(req.body);

                console.log(val)

                // Se ocorreram erros...
                if (err.length > 0) {
                    res.json({ status: "error", message: err })
                } else {

                    // Executa query.
                    const { id } = req.params;
                    const sql = "UPDATE users SET uname = ?, uemail = ?, upassword = SHA1(?), uavatar = ?, ubirth = ? WHERE uid = ?"
                    const [rows] = await conn.query(sql, [user.name, user.email, user.password, user.avatar, user.birth, id]);
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
module.exports = userControl;

/**
 * By Luferat 2023
 * MIT Licensed
 */