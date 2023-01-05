export class TimeUtils {
    /**
     * 获取当前时间戳
     * @returns 
     */
    static get now() {
        return Math.floor(Date.now() / 1000);
    }


    /**
     * 获取当天开始的时间戳
     * @param hour - 
     * @param minute - 
     * @param second - 
     */
    static getTodayBeginTimeStamp(hour: number = 0, minute: number = 0, second: number = 0) {
        let ret = new Date();
        ret.setHours(hour);
        ret.setMinutes(minute);
        ret.setSeconds(second);
        return ret;
    }


    /**
     * 格式化Date -> yy-MM-dd HH:mm:ss
     */
    static format_1(date: Date) {
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    }


    /**
     * 格式化Date -> yyyy年MM月dd日-HH时mm分ss秒
     */
    static format_2(date: Date) {
        return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日-${date.getHours()}时${date.getMinutes()}分${date.getSeconds()}秒`;
    }


    /**
     * 格式化Date -> yyyy/MM/dd
     */
    static format_3(date: Date) {
        return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    }
}
