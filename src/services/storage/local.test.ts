import { LocalStorageService } from './local';

jest.mock('../../config', () => ({
    API_VERSION: 'v1',
    DOMAIN: 'localhost',
    LOCAL_DIRECTORY: 'uploads',
    PORT: '3333',
    PROTOCOL: 'http',
}));

jest.mock('fs');
jest.mock('path');

describe('LocalStorageService', () => {
    let storageService: LocalStorageService;

    beforeEach(() => {
        storageService = new LocalStorageService();
    });

    it('should upload a json string to the local file system', async () => {
        const bucket = 'test-bucket';
        const key = 'test-file.json';
        const body = '{"test": "data"}';
        const contentType = 'application/json';

        const result = await storageService.uploadFile(bucket, key, body, contentType);

        expect(result.uri).toEqual('http://localhost:3333/v1/test-bucket/test-file.json');
    });
});
