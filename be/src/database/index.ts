import { connection, connect } from 'mongoose';

export async function connectDB() {
    const resp = await connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    connection.once('open', () => console.log('Database connected'))
    return resp;
}
