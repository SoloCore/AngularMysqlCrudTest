import { Request, Response }  from 'express';
import pool from  '../database';

class GamesController { 

    // async : await : dice que es un evento que permite continuar con el codigo, pero contiene una promesa
    // Promise<void: dice que es una promesa per que devuelve vacio ya que se ejecutra una consutla

    public async list (req: Request, res: Response) {
        const games = await pool.query('SELECT * FROM games');
        // pool.query('DESCRIBE games');
        res.json(games);
    }

    public async getOne (req: Request, res: Response  ): Promise<any> {
        const { id } = req.params;
        const games = await pool.query('SELECT * FROM games where id =?', [id]);
        // res.json({text: 'Juego Unico ' + req.params.id})
        if (games.length > 0 ){
            console.log(games);
            return res.json(games[0]);
        }
        res.status(404).json({text: 'Juego no existe '});

    }

    public async create (req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO games set ?', [req.body]);
        // console.log(req.body);
        res.json({message: 'Juego Guardado'});
    }

    public async delete (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM games where id = ?', [id])
        res.json({text: 'Juego eliminado ' + req.params.id });
    }

    public async update (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('UPDATE games set ? WHERE id = ?', [req.body, id]);
        res.json({text: 'Juego actualizado ' + req.params.id });
    }
}

export const gamesController = new GamesController();
export default gamesController;