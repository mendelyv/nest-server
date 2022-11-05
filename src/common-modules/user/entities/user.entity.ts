import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { Column, DataType, Model, Table, Unique } from "sequelize-typescript";
import { DB } from "src/system/database/database.tables";

enum Gender {
    None,
    male = '1',
    female = '2',
}

@Table({
    tableName: 'user',
    comment: '后台管理员表'
})
export class User extends Model<User> {

    @Expose()
    @ApiProperty()
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id: number;

    @Expose()
    @ApiProperty({ description: '用户名' })
    @Column({
        type: DataType.STRING,
        comment: '用户名'
    })
    username: string;

    @Exclude()
    @Column({
        type: DataType.STRING,
        comment: '密码'
    })
    password: string;

    @Expose()
    @ApiProperty({ description: '显示名称' })
    @Column({
        type: DataType.STRING,
        comment: '显示名称'
    })
    displayName: string;

    @Expose()
    @ApiProperty({ description: '邮箱' })
    @Column({
        type: DataType.STRING,
        comment: '邮箱'
    })
    email: string;

    @Expose()
    @ApiProperty({ description: '手机号' })
    @Unique
    @Column({
        type: DataType.STRING,
        comment: '手机号'
    })
    mobile: string;

    @Expose()
    @ApiProperty({ description: '性别' })
    @Column({
        type: DataType.ENUM(Gender.male, Gender.female),
        defaultValue: Gender.male,
        comment: '性别'
    })
    sex: number;

    @Expose()
    @ApiProperty({ description: '头像' })
    @Column({
        type: DataType.STRING,
        comment: '头像'
    })
    profileImageUrl: string

    @Expose()
    @ApiProperty({ description: '简介' })
    @Column({
        type: DataType.STRING,
        comment: '简介'
    })
    introduction: string;

    @Expose()
    @ApiProperty({ description: '角色id' })
    @Column({
        type: DataType.INTEGER,
        comment: '角色id'
    })
    roleId: number;

    @Expose()
    @ApiProperty({ description: '是否可用' })
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: true,
        comment: '是否可用'
    })
    isEnabled: boolean;

    @Expose()
    @ApiProperty({ description: 'github id' })
    @Column({
        type: DataType.STRING,
        comment: 'github id'
    })
    githubId: string;

    @Expose()
    @ApiProperty({ description: '微信 id' })
    @Column({
        type: DataType.STRING,
        comment: '微信 id'
    })
    weixinId: string;

    @Expose()
    @ApiProperty({ description: '钉钉 id' })
    @Column({
        type: DataType.STRING,
        comment: '钉钉 id'
    })
    dingtalkId: string;

}

DB.addModel(User);
