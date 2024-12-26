const fs: any = jest.createMockFromModule('fs');

function mkdirSync(directoryPath: string, options: any) {
    return;
}
function writeFileSync(filePath: string, body: string) {
    return;
}

fs.mkdirSync = mkdirSync;
fs.writeFileSync = writeFileSync;

export default fs;
