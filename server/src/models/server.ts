import express, { Application } from 'express';
import cors from 'cors';
import routesProduct from '../routes/product';
import routesUser from '../routes/user'
import { Product } from './product';
import { User } from './user';

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.middlewares();
        this.routes();
        this.dbConnect();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Aplicación corriendo en el puerto ' + this.port);
        })
    }

    routes() {
        this.app.use('/api/products', routesProduct);
        this.app.use('/api/users', routesUser)
    }

    middlewares() {
        // Parseo body
        this.app.use(express.json());
        // Cors
        this.app.use(cors())
    }

    async dbConnect() {
        console.log('Conectando a la base de datos...');
        try {
            await Product.sync();
            await User.sync();
            console.log('Base de datos conectada');
        } catch (error) {
            console.log('Imposible conectar a la base de datos', error);
        } 
    }
}

export default Server;