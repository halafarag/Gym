import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { NgConfirmService } from 'ng-confirm-box';
import { NgToastService } from 'ng-angular-popup';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.scss'],
})
export class RegistrationListComponent implements OnInit {
  userList: User[] = [];
  user: User = {} as User;
  searchText: any;
  constructor(
    private apiService: ApiService,
    private router: Router,
    private confirm: NgConfirmService,
    private toast: NgToastService
  ) {}
  ngOnInit(): void {
    this.getAllRegist();
  }
  getAllRegist() {
    this.apiService.getAllUsers().subscribe((data) => {
      this.userList = data;
    });
  }
  showDetails(id: string) {
    this.apiService.getUserByID(id).subscribe((data) => {
      this.user = data;
    });
  }
  edit(id: string) {
    this.router.navigate(['update', id]);
  }
  deleteUser(id: string) {
    Swal.fire({
      title: 'Are you sure  Want To Delete?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.deleteUser(id).subscribe((res) => {
          Swal.fire('Deleted!', 'Your file has been deleted.');
          this.getAllRegist();
        });
      }
    });
  }
}
