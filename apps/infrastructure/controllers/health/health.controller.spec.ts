import { HealthCheckError, HealthCheckResult, HealthIndicatorResult } from '@nestjs/terminus';
import { HealthCheckExecutor } from '@nestjs/terminus/dist/health-check/health-check-executor.service';
import { Test } from '@nestjs/testing';

const healthyCheck = async (): Promise<HealthIndicatorResult> => {
  return {
    healthy: {
      status: 'up',
    },
  };
};

const unhealthyCheck = async (): Promise<HealthIndicatorResult> => {
  throw new HealthCheckError('error', {
    unhealthy: {
      status: 'down',
    },
  });
};
describe('HealthCheckExecutorService', () => {
  let healthCheckExecutor: HealthCheckExecutor;

  beforeEach(async () => {
    const module = Test.createTestingModule({
      providers: [HealthCheckExecutor],
    });
    const context = await module.compile();
    healthCheckExecutor = context.get(HealthCheckExecutor);
  });

  describe('execute', () => {
    it('should return a result object without errors', async () => {
      const result = await healthCheckExecutor.execute([() => healthyCheck()]);
      expect(result).toEqual<HealthCheckResult>({
        status: 'ok',
        info: {
          healthy: {
            status: 'up',
          },
        },
        error: {},
        details: {
          healthy: {
            status: 'up',
          },
        },
      });
    });

    it('should return a result object with errors', async () => {
      const result = await healthCheckExecutor.execute([() => unhealthyCheck()]);
      expect(result).toEqual<HealthCheckResult>({
        status: 'error',
        info: {},
        error: {
          unhealthy: {
            status: 'down',
          },
        },
        details: {
          unhealthy: {
            status: 'down',
          },
        },
      });
    });
    it('should return a result object without errors and with errors', async () => {
      const result = await healthCheckExecutor.execute([() => unhealthyCheck(), () => healthyCheck()]);
      expect(result).toEqual<HealthCheckResult>({
        status: 'error',
        info: {
          healthy: {
            status: 'up',
          },
        },
        error: {
          unhealthy: {
            status: 'down',
          },
        },
        details: {
          healthy: {
            status: 'up',
          },
          unhealthy: {
            status: 'down',
          },
        },
      });
    });
  });
});
