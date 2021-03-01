const path = require('path')
const protoLoader = require('@grpc/proto-loader')
const grpc = require('grpc')

const PROTO_PATH = path.resolve(__dirname, "..", 'protos', './hello.proto')

const pd = protoLoader.loadSync(PROTO_PATH)
const loaded = grpc.loadPackageDefinition(pd)
const hello_proto = loaded.helloworld

const main = () => {
    const client = new hello_proto.Greeter('localhost:50052', grpc.credentials.createInsecure())
    let user
    if (process.argv.length >= 3) {
        user = process.argv[2]
    } else {
        user = 'world'
    }
    client.sayHello({ name: user }, (err, response) => {
        console.log('Greeting:', response.message)
    })
}

main()





// const Mali = require('mali')
// // const grpc = require('grpc')

// const PROTO_PATH = path.resolve(__dirname, "..", 'protos', './hello.proto')
// const app = new Mali(PROTO_PATH, 'Greeter')


// function sayHello(ctx) {
//     ctx.res = { message: 'Hello ' + ctx.req.name }
// }

// function sayHi(ctx) {
//     ctx.res = { message: 'Hi ' + ctx.req.name }
// }

// const main = async () => {
//     const app = new Mali(PROTO_PATH, 'Greeter')
//     app.use({ sayHello, sayHi })
//     app.start('127.0.0.1:50052')
//     // app.start(grpc.ServerCredentials.createInsecure())
// }

// main()