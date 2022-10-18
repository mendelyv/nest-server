import {Controller, Inject, Post, Query, UploadedFile, UseInterceptors} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { OssService } from './oss.service';

@Controller('api')
export class OssController {

    @Inject()
    private readonly ossService: OssService;

    @Post('ossPut')
    @UseInterceptors(FileInterceptor('file'))
    async put(@Query('filePath') filePath: string, @UploadedFile() file: Express.Multer.File) {
        const res = await this.ossService.put(filePath, file);
        return res;
    }

}
