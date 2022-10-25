import { Injectable } from '@nestjs/common'
import { Sequelize } from 'sequelize-typescript';
import { envConfig } from 'src/common/config';
import { User } from 'src/common-modules/user/entities/user.entity';

@Injectable()
export class DatabaseManager {
    private inited: boolean = false;
    public sequelize: Sequelize;
    initSequelize(sequelize: Sequelize) {
        if (!sequelize || this.inited) return;

        this.sequelize = sequelize;
        sequelize.addModels([User]);
        if (envConfig.db_sync)
            sequelize.sync();
    }
}
