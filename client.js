import net from 'net';

const HOST='localhost';
const PORT=5555;

const client=new net.Socket();

client.connect(PORT,HOST,()=>{
    console.log('Connected to the server...');
});


client.on('data', (data) => { 
    console.log(data);
});//인자로 data buffer객체로 들어온다

client.on('close', () => { 
    console.log(`Connetction closed`);
});//양쪽의 연결이 끊기면 close 한쪽이 끊기면 end

client.on('error', (err) => {
    console.log(`client error${err}`);
});//error발생시