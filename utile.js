import { HANDLER_ID, TOTAL_LENGTH_SIZE } from "./constant.js";

export const readHeader=(buffer)=>{
    //빅인디안 방식(순서대로 읽음)
    const length=buffer.readUInt32BE(0);//0번째 위치부터 시작하겠다.
    const handlerId=buffer.readUInt16BE(TOTAL_LENGTH_SIZE);
    return{
        length,handlerId
    };
}

export const writeHeader=(length,handlerId)=>{
    const headerSize=TOTAL_LENGTH_SIZE+HANDLER_ID;//6
    const buffer=Buffer.alloc(headerSize);//headersize만큼의 buffer를 만들겠다.
    buffer.writeUInt32BE(length+headerSize,0);//0번쨰부터 length+headerSize만큼 쓰겠다.
    buffer.writeUInt16BE(handlerId,TOTAL_LENGTH_SIZE);//TOTAL_LENGTH_SIZE부터 handlerID만큼 쓰겠다.

    return buffer;
}