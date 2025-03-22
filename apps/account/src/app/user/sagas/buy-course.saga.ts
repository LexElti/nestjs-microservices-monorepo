import { PurchaseState } from '@nestjs-microservices-monorepo/interfaces';
import { RMQService } from 'nestjs-rmq';
import { UserEntity } from '../entities/user.entity';
import { BuyCourseSagaState } from './buy-course.state';

export class BuyCourseSaga {
  private state: BuyCourseSagaState;

  constructor(
    public user: UserEntity,
    public courseId: string,
    public rmqService: RMQService
  ) {
    this.setState(user.getCourseState(courseId), courseId);
  }

  setState(state: PurchaseState, courseId: string) {
    switch (state) {
      case PurchaseState.Started:
        break;
      case PurchaseState.WaitingForPayment:
        break;
      case PurchaseState.Purchased:
        break;
      case PurchaseState.Cenceled:
        break;
    }
    this.state.setContext(this);
    this.user.setCourseStatus(courseId, state);
  }

  getState() {
    return this.state;
  }
}
