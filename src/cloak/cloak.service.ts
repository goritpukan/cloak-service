import { Injectable } from '@nestjs/common';
import { RequestDto } from './dto/request.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Log } from './schemas/log.schema';
import { Model } from 'mongoose';
import { CheckResult } from './types/check-result.type';

@Injectable()
export class CloakService {
  constructor(@InjectModel(Log.name) private logModel: Model<Log>) {}
  async check(request: RequestDto): Promise<CheckResult> {
    if (!request.acceptLanguage || !request.userAgent) {
      await this.createLog(request, 'bot');
      return 'bot';
    }
    if (/bot|crawler|spider/i.test(request.userAgent)) {
      await this.createLog(request, 'bot');
      return 'bot';
    }

    const lastMinuteRequestCount = await this.countRecentRequests(request.ip);
    if (lastMinuteRequestCount > 100) {
      await this.createLog(request, 'bot');
      return 'bot';
    }

    await this.createLog(request, 'not bot');
    return 'not bot';
  }

  private async createLog(
    request: RequestDto,
    checkResult: CheckResult,
  ): Promise<void> {
    const log = new this.logModel({ ...request, checkResult });
    await log.save();
  }

  private async countRecentRequests(ip: string): Promise<number> {
    const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
    return this.logModel.countDocuments({
      ip,
      createdAt: { $gte: oneMinuteAgo },
    });
  }
}
