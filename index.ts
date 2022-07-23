import { ApolloServer } from "apollo-server";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge"
import path from 'path';
import { connect } from 'mongoose';
import { loadFilesSync } from '@graphql-tools/load-files';
import * as dotenv from 'dotenv';
dotenv.config();
// console.log(process.env.DB_PORT);
const resolversFiles = loadFilesSync(path.join(__dirname, './graphql/resolvers'));
const typeDefsFiles = loadFilesSync(path.join(__dirname, './graphql/typeDefs'));

const resolvers = mergeResolvers(resolversFiles)
const typeDefs = mergeTypeDefs(typeDefsFiles)

// https://mongoosejs.com/docs/typescript.html
// https://kimsereylam.com/typescript/graphql/2021/10/29/get-started-with-apollo-server-in-typescript.html#setup-the-project

async function main() {
    await connect(`${process.env.DB_PORT}`)
        .then(e => console.log('DB Connected'))
        .catch(er => console.log('DB Connection Error', er));
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.listen(process.env.PORT);
    console.log(`Server started on http://localhost:${process.env.PORT}`);
}

main();