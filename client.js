import net from 'net';
import { writeHeader,readHeader } from './utile.js';
import { HANDLER_ID, TOTAL_LENGTH_SIZE } from './constant.js';
const HOST = 'localhost';
const PORT = 5555;

const client = new net.Socket();

client.connect(PORT, HOST, () => {
    console.log('Connected to the server...');

    const message = "Hello";
    const buffer = Buffer.from(message);//buffer객체로 전달

    const header = writeHeader(buffer.length, 10);
    const packet = Buffer.concat([header, buffer]);//header와 buffer을 합친다.
    client.write(packet);//packet을 전송
});


client.on('data', (data) => {
    const buffer=Buffer.from(data);

    const { handlerId, length } = readHeader(data);

    console.log(`handlerId: ${handlerId}`);
    console.log(`length: ${length}`);

    const headerSize=TOTAL_LENGTH_SIZE+HANDLER_ID;//헤더의 사이즈
    const message=buffer.slice(headerSize);//header부분을 삭제한다.
    console.log(`server 에게 받은 메시지:${message}`);//server에게 받은 메세지
});//인자로 data buffer객체로 들어온다

client.on('close', () => {
    console.log(`Connetction closed`);
});//양쪽의 연결이 끊기면 close 한쪽이 끊기면 end

client.on('error', (err) => {
    console.log(`client error${err}`);
});//error발생시