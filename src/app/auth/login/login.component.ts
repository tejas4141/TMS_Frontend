import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Action } from 'rxjs/internal/scheduler/Action';
import { AuthService } from 'src/app/services/auth.service';
import { Toast } from 'src/app/services/sweetalert';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
// export class LoginComponent implements OnInit {
 
//   logindata: any;
//   errorMesseage: string = ''

//   ispassvisible: boolean = false;
//   constructor(private fb: FormBuilder,
//     private route: Router,
//     private authSerivce: AuthService
//   ) {
//     this.logindata = this.fb.group({
//       name: ['', Validators.required],
//       password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('')]],
     
//       // module:['',Validators.required],
//       // action:['',Validators.required]
//     })

//   }
//   ngOnInit(): void {
   
//   }

 



//   login_submit() {
//     if (this.logindata.valid) {
//       this.logindata.value;
//       this.authSerivce.login(this.logindata.value).subscribe({
//         next: (responce: any) => {
//        if(responce.jwtToken !=null && responce.jwtToken !=undefined){
//         sessionStorage.setItem('token', responce.jwtToken)
//         this.route.navigate(['/dashboard/'])
//        }else{
//         Toast.fire({
//           icon: "success",
//           title: responce.message
//           });
//         }},
//         error: (error:any) => {
//           this.errorMesseage = "invalid password";
//           console.log("Login Error", error.error);
//           Toast.fire({
//             icon: "success",
//             title: error.error
//             });
//         }
//       });
//     }
//     else {
//       Toast.fire({
//         icon: "success",
//         title: "Enter enter valid detail"
//           });
//     }
//   }


//   passtoggle() {
//     this.ispassvisible = !this.ispassvisible;
//   }
// }
export class LoginComponent implements OnInit {
  logindata: FormGroup;
  errorMesseage: string = '';
  ispassvisible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.logindata = this.fb.group({
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      // Remove or adjust pattern if not needed
    });
  }

  ngOnInit(): void { }

  login_submit() {
    if (this.logindata.valid) {
      this.authService.login(this.logindata.value).subscribe({
        next: (response: any) => {
          if (response.jwtToken) {
            // Roles are already handled in AuthService via tap
            this.router.navigate(['/dashboard']);
            Toast.fire({
              icon: "success",
              title: "Login successful!"
            });
          } else {
            Toast.fire({
              icon: "error",
              title: response.message || "Login failed!"
            });
          }
        },
        error: (error: any) => {
          this.errorMesseage = "Invalid credentials";
          console.error("Login Error", error.error);
          Toast.fire({
            icon: "error",
            title: error.error.message || "Login failed!"
          });
        }
      });
    } else {
      Toast.fire({
        icon: "warning",
        title: "Please enter valid details."
      });
    }
  }

  passtoggle() {
    this.ispassvisible = !this.ispassvisible;
  }
}