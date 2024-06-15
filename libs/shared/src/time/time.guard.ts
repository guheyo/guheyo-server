import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';

@Injectable()
export class TimeGuard implements CanActivate {
  constructor(
    private readonly startHour: number,
    private readonly endHour: number,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const now = new Date();
    const currentHour = now.getHours(); // Use local time

    // Check if the current time is within the maintenance window
    if (this.isInMaintenanceWindow(currentHour)) {
      throw new BadRequestException(
        'The server is currently under maintenance. Please try again later.',
      );
    }

    return true;
  }

  private isInMaintenanceWindow(currentHour: number): boolean {
    if (this.startHour < this.endHour) {
      return currentHour >= this.startHour && currentHour < this.endHour;
    }
    // Handle wrapping around midnight
    return currentHour >= this.startHour || currentHour < this.endHour;
  }
}
