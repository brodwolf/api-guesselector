import { Controller, Get } from '@nestjs/common';
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  MemoryHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: TypeOrmHealthIndicator,
    private disk: DiskHealthIndicator,
    private memory: MemoryHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.http.pingCheck('http-connection', 'https://server.brodwolf.dev'),
      () => this.db.pingCheck('database'),
      () =>
        this.disk.checkStorage('storage', {
          path: 'C:',
          thresholdPercent: 0.8,
        }),
      () => this.memory.checkHeap('RAM memory', 150 * 1024 * 1024),
    ]);
  }
}
