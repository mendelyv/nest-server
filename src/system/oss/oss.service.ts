import { Injectable } from '@nestjs/common';
import * as OSS from 'ali-oss'
import { plainToClass } from 'class-transformer';
import { envConfig } from 'src/common/config';
import { OssPutSuccessResponseDto } from './dto/oss-put-success-response.dto';

@Injectable()
export class OssService {
    private _client: OSS;

    constructor() {
        this._client = new OSS(envConfig.oss);
    }

    async put(filePath: string, file: Express.Multer.File) {
        const basePath = envConfig.ossBaseFilePath;
        const fileName = file.originalname;
        const putPath = `${basePath}/${filePath}/${Date.now()}${fileName}`;
        let result = await this._client.put(putPath, file.buffer);
        let res = new OssPutSuccessResponseDto();
        res.url = result.url;
        res.name = result.name;
        res.status = result.res.status;
        res.message = 'success';
        return res;
    }

}
