import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNumber } from "class-validator";

export class BaseResponse {

    @ApiProperty()
    status: number;

    @ApiProperty()
    message: string;

    constructor(status: number = 200, message: string = 'success') {
        this.status = status != null ? status : 200;
        this.message = message != null ? message : 'success';
    }

    set({ message, status }: { message: string, status: number }) {
        this.message = message;
        this.status = status;
    }
}


export class BaseResponseWithData<T extends {} = any> extends BaseResponse {
    data: T;
    constructor(data?: T) {
        super();
        this.data = data;
    }
}


export class BaseFindAllQuery {

    @Expose()
    @IsNumber()
    @ApiProperty({
        required: false
    })
    page: number;

    @Expose()
    @IsNumber()
    @ApiProperty({
        required: false
    })
    limit: number;

}
