
import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common'
import { Cache } from 'cache-manager'

@Injectable()
export class AppCacheService {
  public instance: Cache;

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
    this.instance = this.cacheManager;
  }
}
