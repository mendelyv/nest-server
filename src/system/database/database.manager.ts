import { Injectable, Inject } from '@nestjs/common'
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class DatabaseManager {

    @Inject('Sequelize')
    private _sequelize: Sequelize;
    public get sequelize() { return this._sequelize; }

}
