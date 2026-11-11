import { Component, inject, signal } from '@angular/core';
import { PositionService } from '../shared/position-service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Position } from '../interfaces/position';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-position-component',
  styleUrl: './position-component.css',
  templateUrl: './position-component.html',
})
export class PositionComponent {
  positionApi = inject(PositionService)
  builder = inject(FormBuilder)

  positions = signal<Position[]>([])

  positionForm = this.builder.group({
    id: [null as number | null],
    name: [''],
    description: ['']
  })

  addMode = true
  visibleModal = false

  ngOnInit() {
    this.getPositions()
  }
  getPositions() {
    this.positionApi.getPositions().subscribe({
      next: (res:any) => {
        console.log(res.data)
        this.positions.set(res.data)
      },
      error: () => {}
    })
  }
  savePosition() {
    console.log('mentés...')
    if(this.addMode) {
      this.createPosition()
    }else {
      this.updatePosition()
    }
    this.startHideModal()
  }
  createPosition() {}
  editPosition() {}
  updatePosition() {}
  deletePosition() {}

  showModal() {
    this.visibleModal = true
  }
  startHideModal() {
    this.visibleModal = false
    this.positionForm.reset()
    this.addMode = true
  }
  
}
