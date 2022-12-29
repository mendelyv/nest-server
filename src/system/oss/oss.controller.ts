import {Controller, Inject, Post, Query, UploadedFile, UseInterceptors} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiFile } from 'src/common/decorator/api-file.decorator';
import { OssService } from './oss.service';

@ApiTags('阿里云OSS')
@Controller('api')
export class OssController {

    @Inject()
    private readonly ossService: OssService;

    @Post('ossPut')
    @ApiFile('file')
    @ApiOperation({ summary: '文件上传' })
    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    async put(@Query('filePath') filePath: string, @UploadedFile() file: Express.Multer.File) {
        const res = await this.ossService.put(filePath, file);
        return res;
    }

}
