const path = require('path')
const Mali = require('mali')
// const grpc = require('grpc')

const PROTO_PATH = path.resolve(__dirname, "..", 'protos', './hello.proto')
const app = new Mali(PROTO_PATH, 'Greeter')


function sayHello(ctx) {
    ctx.res = { message: 'Hello ' + ctx.req.name }
}

function sayHi(ctx) {
    ctx.res = { message: 'Hi ' + ctx.req.name }
}

const main = async () => {
    const app = new Mali(PROTO_PATH, 'Greeter')
    app.use({ sayHello, sayHi })
    app.start('127.0.0.1:50052')
    // app.start(grpc.ServerCredentials.createInsecure())
}

main()