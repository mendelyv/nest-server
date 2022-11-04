import { ApiProperty } from "@nestjs/swagger";

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
        return this;
    }
}


export class BaseResponseWithData<T> extends BaseResponse {
    data: T;
    constructor(data?: T) {
        super();
        this.data = data;
    }
}


export class BaseFindAllQuery {

    @ApiProperty({
        required: false
    })
    page: number;

    @ApiProperty({
        required: false
    })
    limit: number;

}
