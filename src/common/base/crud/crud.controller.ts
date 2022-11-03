import { Body, Delete, Get, Inject, Param, Post, Put, Query, UsePipes } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { Model } from "sequelize-typescript";
import { ValidationPipe } from "src/common/pipe/validate.pipe";
import { BaseController } from "../controller/base.controller";
import { BaseDBDto } from "../database/base.dto";
import { BaseFindAllQuery } from "../http/base.dto";
import { CreateResponse, DeleteResponse, FindAndCountAllResponse, FindOneResponse, UpdateResponse } from "../http/crud.dto";
import { CRUDService } from "./crud.service";

export abstract class CRUDController<
    T extends Model<T>,
    TDataDto extends BaseDBDto,
    TFindAllQuery extends BaseFindAllQuery,
    TCreateDto extends any,
    TUpdateDto extends any,
> extends BaseController<T> {
    protected abstract readonly service: CRUDService<T>;

    @Get()
    @ApiOperation({ summary: '列表' })
    @ApiResponse({ type: FindAndCountAllResponse })
    @ApiParam({ name: '', type: BaseFindAllQuery })
    async index(@Query() packet?: TFindAllQuery): Promise<FindAndCountAllResponse<TDataDto>> {
        return await this.service.index(packet);
    }


    @Get(':id')
    @UsePipes(ValidationPipe)
    @ApiOperation({ summary: '查' })
    @ApiResponse({ type: FindOneResponse })
    @ApiParam({ name: 'id', type: 'string', required: true })
    async show(@Param('id') id: string): Promise<FindOneResponse<TDataDto>> {
        return await this.service.show(id);
    }


    @Post()
    @UsePipes(ValidationPipe)
    @ApiOperation({ summary: '增' })
    @ApiResponse({ type: CreateResponse })
    @ApiBody({ type: 'object' })
    async create(@Body() packet: TCreateDto): Promise<CreateResponse<TDataDto>> {
        return await this.service.create(packet);
    }


    @Put(':id')
    @ApiOperation({ summary: '改' })
    @ApiResponse({ type: UpdateResponse })
    @ApiParam({ name: 'id', type: 'string' })
    @ApiBody({ type: 'object' })
    async update(@Param('id') id: string, @Body() packet: TUpdateDto): Promise<UpdateResponse> {
        return await this.service.update(id, packet);
    }


    @Delete(':id')
    @ApiOperation({ summary: '删' })
    @ApiResponse({ type: DeleteResponse })
    @ApiParam({ name: 'id', type: 'string' })
    async destroy(@Param('id') ids: string): Promise<DeleteResponse> {
        return await this.service.destroy(ids);
    }
}
