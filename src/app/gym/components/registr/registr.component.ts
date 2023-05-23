import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { NgToastService } from 'ng-angular-popup';
import { User } from '../../models/user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-registr',
  templateUrl: './registr.component.html',
  styleUrls: ['./registr.component.scss'],
})
export class RegistrComponent implements OnInit {
  public packeges: string[] = ['Weekely', 'Monthely', 'Yearly'];
  public importantList: string[] = [
    'Fitness',
    'Suger Craving Body',
    'Building Lean Musical',
    'Energey And Endurance',
    'Toxic Fat Reduction',
  ];
  registerForm!: FormGroup;
  public userIdToUpdate!: string;
  registerOrUpdate: boolean = false;
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private toast: NgToastService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile: [
        '',
        [Validators.required, Validators.pattern('^((\\+20-?)|0)?[0-9]{11}$')],
      ],
      weight: ['', [Validators.required]],
      height: ['', [Validators.required]],
      bmi: [''],
      bmiResult: [''],
      gender: [''],
      requireTrainer: [''],
      package: ['', [Validators.required]],
      important: ['', [Validators.required]],
      haveGymBefor: [''],
      enquireyDate: ['', [Validators.required]],
    });
    this.registerForm.controls['height'].valueChanges.subscribe((res) => {
      this.bmiCalculate(res);
    });
    // edit
    this.activeRoute.params.subscribe((val) => {
      this.userIdToUpdate = val['id'];
      this.apiService.getUserByID(this.userIdToUpdate).subscribe((user) => {
        this.registerOrUpdate = true;
        this.fillFormToEdit(user);
      });
    });
  }

  register() {
    console.log(this.registerForm.value);
    const user = this.registerForm.value;
    this.apiService.register(user).subscribe((res) => {
      this.toast.success({
        detail: 'success',
        summary: 'Registered Successfully',
        duration: 3000,
      });
      this.registerForm.reset();
    });
  }
  bmiCalculate(hightValue: number) {
    const weight = this.registerForm.value.weight;
    const hight = hightValue;
    const bmi = weight / (hight * hight);
    this.registerForm.controls['bmi'].patchValue(bmi);
    switch (true) {
      case bmi < 16.5:
        this.registerForm.controls['bmiResult'].patchValue('UnderWeight');

        break;
      case bmi >= 16.5 && bmi < 23:
        this.registerForm.controls['bmiResult'].patchValue('OverWeight');

        break;
      case bmi >= 23 && bmi < 27:
        this.registerForm.controls['bmiResult'].patchValue('Normal');
        break;

      default:
        this.registerForm.controls['bmiResult'].patchValue('Done');
        break;
    }
  }
  fillFormToEdit(user: User) {
    this.registerForm.setValue({
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      package: user.package,
      email: user.email,
      mobile: user.mobile,
      enquireyDate: user.enquireyDate,
      weight: user.weight,
      height: user.height,
      haveGymBefor: user.haveGymBefor,
      bmi: user.bmi,
      bmiResult: user.bmiResult,
      requireTrainer: user.requireTrainer,
      important: user.important,
    });
  }
  update() {
    const user = this.registerForm.value;
    this.apiService.updateUser(this.userIdToUpdate, user).subscribe((data) => {
      this.toast.success({
        detail: 'success',
        summary: 'Enquiry Updated',
        duration: 3000,
      });
      this.registerForm.reset();
      this.router.navigate(['/list']);
    });
  }
}
