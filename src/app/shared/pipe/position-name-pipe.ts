import { Pipe, PipeTransform } from '@angular/core';
import { Position } from '../../interfaces/position';

@Pipe({
  name: 'positionName',
})
export class PositionNamePipe implements PipeTransform {
  transform(positionId: number, positions: Position[] | null | undefined): string {
    if (!positionId || !positions) {
      return 'Ismeretlen'
    }
    const pos = positions.find(p => p.id === positionId)
    return pos ? pos.name : 'Ismeretlen';
  }
}
