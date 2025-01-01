import { Component, computed, inject, Signal } from '@angular/core';
import { Data } from '../Data';
import { HttpService } from '../HttpService';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-todo-container',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './todo-container.component.html',
  styleUrl: './todo-container.component.css'
})
export class TodoContainerComponent {
 
  private data = inject(Data);
  activitiesData: Signal<{ id: number; name: string }[]> = this.data.arraySignal;
  
  activities: any;
  constructor(private httpService: HttpService){}

  ngOnInit() {
    this.httpService.getActivities().subscribe((response: any) => {
      if (Array.isArray(response)) {
        this.data.arraySignal.set(response);
      } else {
        console.error('Expected an array but received:', response);
      }
    });
  }
  complete(itemId: number): void {
    this.httpService.deleteActivity(itemId).subscribe(() => {
      // Remove only the item with the specified ID
      const updatedActivities = this.data.arraySignal().filter(item => item.id !== itemId);
      this.data.arraySignal.set(updatedActivities); // Update the signal with the filtered array
    });
  }
  

  delete(): void {
    console.log("Delete activity.")

  }
}
