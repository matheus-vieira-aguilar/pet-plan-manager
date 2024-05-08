import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import IPet from 'src/domain/pet/pet.entity';
import PetService from 'src/domain/pet/pet.service';
import IService from 'src/shared/interface/service.interface';

@Injectable()
export class RecourseAccessInterceptor<T> implements NestInterceptor {
  constructor(@Inject(PetService) private readonly service: IService<IPet>) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const { id } = req.params;
    const userId = req.user._id;

    const resource = await this.service.listBy({ _id: id, user: userId });

    if (!resource || !resource.length) {
      throw new UnauthorizedException(
        'User does not have access to this resource',
      );
    }

    return next.handle().pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }
}
