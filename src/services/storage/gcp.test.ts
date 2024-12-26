import { Storage } from '@google-cloud/storage';
import { GCPStorageService } from './gcp';

jest.mock('@google-cloud/storage', () => {
    const mockFileSave = jest.fn().mockResolvedValue([]);
    const mockFile = jest.fn(() => ({ save: mockFileSave }));
    const mockBucket = jest.fn(() => ({ file: mockFile }));
    return { Storage: jest.fn(() => ({ bucket: mockBucket })) };
});

describe('GCPStorageService', () => {
    let service: GCPStorageService;

    beforeEach(() => {
        jest.clearAllMocks();
        service = new GCPStorageService();
    });

    it('should upload a file and return its URI', async () => {
        const bucketName = 'custom-bucket';
        const key = 'test-file';
        const body = '{"test": "data"}';
        const contentType = 'application/json';

        const expectedUri = `https://${bucketName}.storage.googleapis.com/${key}`;
        const result = await service.uploadFile(bucketName, key, body, contentType);

        const mockFileSave = (Storage as unknown as jest.Mock).mock.results[0].value.bucket().file().save;

        expect(Storage).toHaveBeenCalledTimes(1);
        expect(mockFileSave).toHaveBeenCalledWith(body, {
            metadata: { contentType },
        });

        expect(result).toEqual({ uri: expectedUri });
    });
});
