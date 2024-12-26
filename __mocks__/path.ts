const path: any = jest.createMockFromModule('path');

function join(...paths: string[]) {
    return paths.join('/');
}

function dirname(filePath: string) {
    return filePath.substring(0, filePath.lastIndexOf('/'));
}

path.join = join;
path.dirname = dirname;

export default path;
