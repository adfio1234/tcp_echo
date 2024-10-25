

const handler10 = (data) => {
    const processedData = data.toString().toUpperCase();//대문자로 바꾸는 코드
    return Buffer.from(processedData);
}

export default handler10;