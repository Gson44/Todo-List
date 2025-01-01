import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Data } from '../Data';
import { HttpService } from '../HttpService';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})
export class UserInputComponent {
  private data = inject(Data)
  userForm = new FormGroup({
    inputForm: new FormControl<string>("")
  });

  constructor(private httpService: HttpService){}

  onSubmit(): void {
    const value: string = this.userForm.value.inputForm!;
    this.httpService.postActivity(value, false).subscribe((newActivity: any) => {
      // Add the new activity to the existing array
      const currentActivities = this.data.arraySignal();
      this.data.arraySignal.set([...currentActivities, newActivity]); // Update the signal
    });
  }
}
