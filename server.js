import net from 'net';//node.je에서 기본적으로 제공하는 tcp서버


const PORT = 5555;

const server = net.createServer((socket) => {
    console.log(`client connected: ${socket.remoteAddress}:${socket.remotePort}`);

    //event관리
    socket.on('data', (data) => { 
        console.log(data);
    });//인자로 data buffer객체로 들어온다

    socket.on('end', () => { 
        console.log(`client connected: ${socket.remoteAddress}:${socket.remotePort}`);
    });//connection이 끊겼을때

    socket.on('error', (err) => {
        console.log(`Socket error${err}`);
    });//error발생시

});//server를 생성 ipv6가 기본 세팅


server.listen(PORT, () => {
    console.log(`Echo Sever Listening on port ${PORT}`);
    console.log(server.address());
});