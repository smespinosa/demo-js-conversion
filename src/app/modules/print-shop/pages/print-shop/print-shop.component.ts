import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserCredentialsService } from 'src/app/services/user-credentials.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-print-shop',
  templateUrl: './print-shop.component.html',
  styleUrls: ['./print-shop.component.scss'],
})
export class PrintShopComponent implements OnInit {
  passRegMatchTxt = '';
  passRegMatchColor = 'cust-color-transparent';
  passRegMatchCheckmark = 'cust-color-transparent';
  submitRegBtnDisabled = true;
  passRegConfirmHidden = true;
  accountExistsAlertHidden = true;
  errorOutMessageHidden = true;

  errorOutMessage = null;

  invalidAcctAlertHidden = true;
  submitLogBtnDisabled = true;
  registeredSuccessHidden = true;
  formId = 0;
  userAccess = false;

  emailReg: string | null | undefined = '';
  emailRegBorderColor = '';
  passRegBorderColor = '';
  passRegConfirmBorderColor = '';
  passReg = '';
  passMatchColor = '';
  passRegConfirm = '';

  regLogHidden = false;

  emailLog = '';
  passLog = '';

  @Input() someState: string;

  constructor(
    private router: Router,
    private userService: UserService,
    private userCredentialService: UserCredentialsService
  ) {
    this.someState = 'whatever';
  }

  ngOnInit() {
    this.userService.getUserProfile().subscribe({
      next: (user) => {
        if (user) {
          this.regLogHidden = true;
          this.formId = user.formId;
          this.gotoHomePage();
        } else {
          this.regLogHidden = false;
          this.formId = 0;
        }
        console.log('a new user was emitted from user service', user);
      },
      error: (err) => {
        console.error('error while emitting new user', err);
      },
    });
  }

  validateRegForm(): void {
    if (this.validateRegEmail() && this.validateRegPasswords()) {
      this.submitRegBtnDisabled = false;
    } else {
      this.submitRegBtnDisabled = true;
    }
  }

  validateRegEmail(): boolean {
    if (this.emailReg != null && this.emailReg != '') {
      this.emailRegBorderColor = 'cust-border-red';
      if (this.emailReg.indexOf('@') > -1 && this.emailReg.indexOf('.') > -1) {
        this.emailRegBorderColor = '';
        return true;
      }
    }
    return false;
  }

  validateRegPasswords(): boolean {
    var minPassLen = 8;
    this.passRegConfirmHidden = true;
    this.passRegMatchCheckmark = 'cust-color-transparent';

    if (this.passReg != null && this.passReg != '') {
      if (this.passReg.length < minPassLen) {
        this.passRegMatchTxt =
          'Password must be at least ' + minPassLen + ' characters long';
        this.passRegMatchColor = 'cust-color-red';
        this.passRegBorderColor = 'cust-border-red';
        this.passRegConfirmBorderColor = '';
      } else {
        if (this.passReg != this.passRegConfirm) {
          this.passRegMatchTxt = 'Passwords must match';
          this.passRegMatchColor = 'cust-color-red';
          this.passRegBorderColor = 'cust-border-red';
          this.passRegConfirmBorderColor = 'cust-border-red';
          this.passRegConfirmHidden = false;
        } else {
          this.passRegMatchTxt = 'Passwords match ';
          this.passRegMatchColor = 'cust-color-green';
          this.passRegMatchCheckmark = 'fas fa-check cust-color-green';
          this.passRegBorderColor = '';
          this.passRegConfirmBorderColor = '';
          this.passRegConfirmHidden = false;
          return true;
        }
      }
    } else {
      this.passRegMatchTxt = '';
      this.passMatchColor = 'cust-color-transparent';
    }
    return false;
  }

  gotoHomePage() {
    this.router.navigate(['splash']);
  }

  getUser() {
    this.userService.getUserInfoFromApi();
  }

  logInSubmit() {
    this.userService.logIn(this.emailLog, this.passLog).subscribe({
      next: (data) => {
        console.log('got this data back from api', data);
      },
      error: (err) => {
        console.error('error getting user from api', err);
      },
    });
  }
}
