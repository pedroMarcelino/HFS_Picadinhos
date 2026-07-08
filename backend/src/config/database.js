import mongoose from 'mongoose';
import 'dotenv/config';

const db_user = process.env.DB_USER;
const db_pass = process.env.DB_PASSWORD;

// conexão mongo

export async function connection() {
    await mongoose.connect(
        `mongodb://${db_user}:${db_pass}@ac-viwbayx-shard-00-00.godvf2v.mongodb.net:27017,ac-viwbayx-shard-00-01.godvf2v.mongodb.net:27017,ac-viwbayx-shard-00-02.godvf2v.mongodb.net:27017/?ssl=true&replicaSet=atlas-ovjjyh-shard-0&authSource=admin&appName=dbPicadinhos`
    )
        .then(() => {
            console.log("-----!BANCO-CONECTADO!-----");

        })
        .catch((error) => {
            console.log("-----!ERRO NA CONEXAO COM BANCO DE DADOS!-----");
            console.log(error.message);
        });
}