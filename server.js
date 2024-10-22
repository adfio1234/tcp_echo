import net from 'net';//node.je에서 기본적으로 제공하는 tcp서버
import { readHeader, writeHeader } from './utile.js';
import { HANDLER_ID, TOTAL_LENGTH_SIZE } from './constant.js';


const PORT = 5555;

const server = net.createServer((socket) => {
    console.log(`client connected: ${socket.remoteAddress}:${socket.remotePort}`);

    //event관리
    socket.on('data', (data) => {
        // console.log(data);

        const buffer=Buffer.from(data);
        const { handlerId, length } = readHeader(data);
        console.log(`handlerId: ${handlerId}`);
        console.log(`length: ${length}`);

        //데이터를 가공
        const headerSize=TOTAL_LENGTH_SIZE+HANDLER_ID;//헤더의 사이즈
        const message=buffer.slice(headerSize);//header부분을 삭제한다.
        console.log(`client에게 받은 메시지${message}`);//client에게 받은 메세지

        //response만들기
        const responseMessage='Hi, There';
        const responseBuffer=Buffer.from(responseMessage);

        const header=writeHeader(responseBuffer.length,handlerId);
        const packet=Buffer.concat([header,responseBuffer]);

        socket.write(packet);//clint data event로 보낸다
        
        
       
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