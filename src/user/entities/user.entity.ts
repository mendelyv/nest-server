import { Column, DataType, Model, Table, Unique } from "sequelize-typescript";

enum Gender {
    None = 'none',
    male = 'male',
    female = 'female',
}

@Table({
    tableName: 'user',
})
export class User extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id: number;

    @Column({
        type: DataType.STRING,
        comment: '用户名'
    })
    username: string;

    @Column({
        type: DataType.STRING,
        comment: '密码'
    })
    password: string;

    @Column({
        type: DataType.STRING,
        comment: '显示名称'
    })
    displayName: string;

    @Column({
        type: DataType.STRING,
        comment: '邮箱'
    })
    email: string;

    @Unique
    @Column({
        type: DataType.STRING,
        comment: '手机号'
    })
    mobile: string;

    @Column({
        type: DataType.ENUM(Gender.male, Gender.female),
        defaultValue: Gender.male,
        comment: '性别'
    })
    sex: number;

    @Column({
        type: DataType.STRING,
        comment: '头像'
    })
    profileImageUrl: string

    @Column({
        type: DataType.STRING,
        comment: '简介'
    })
    introduction: string;

    @Column({
        type: DataType.INTEGER,
        comment: '角色id'
    })
    roleId: number;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: true,
        comment: '是否可用'
    })
    isEnabled: boolean;

    @Column({
        type: DataType.STRING,
        comment: 'github id'
    })
    githubId: string;

    @Column({
        type: DataType.STRING,
        comment: '微信 id'
    })
    weixinId: string;


    @Column({
        type: DataType.STRING,
        comment: '钉钉 id'
    })
    dingtalkId: string;

}
