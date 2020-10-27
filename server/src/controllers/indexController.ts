import { Request, Response }  from 'express';

class IndexController { 

    index (req: Request, res: Response) {
        res.json({text: 'APIs is /api/games/'});
    }
}

export const indexController = new IndexController();