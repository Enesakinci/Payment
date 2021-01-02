import { PaymentDetailService } from "./../../shared/payment-detail.service";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  Validators,
  FormGroup,
  ReactiveFormsModule,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import swal from "sweetalert2";

@Component({
  selector: "app-payment-detail",
  templateUrl: "./payment-detail.component.html",
  styles: [],
})
export class PaymentDetailComponent implements OnInit {
  frmPaymentDedail: FormGroup;

  constructor(
    private service: PaymentDetailService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.createForm();
    this.resetForm();
    let numericRegex = /^[0-9]*$/;

    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();

    let ones_number_year = currentYear % 10;
    console.log(ones_number_year);
    let tens_number_year = Math.floor((currentYear % 100) / 10);
    var currentMonth = currentDate.getMonth()+1;
    let ones_number_month = currentMonth % 10;
    console.log("first:"+ones_number_month);
    console.log("curr:"+currentMonth);
    console.log("year:"+currentYear);
    if (currentMonth != ones_number_month) {
      var regrexStr =
        "^(([1])|(1[0-2]))/?((" +
        tens_number_year +
        "[" +
        ones_number_year +
        "-9])|([" +
        (tens_number_year + 1) +
        "-9][0-9]))$";
    } else {
      var regrexStr =
        "^(([0])|(1["+ones_number_month+"-9]))/?((" +
        tens_number_year +
        "[" +
        ones_number_year +
        "-9])|([" +
        (tens_number_year + 1) +
        "-9][0-9]))$";
    }

    let dateRegex = new RegExp(regrexStr); // /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    this.frmPaymentDedail = this.formBuilder.group({
      PMId: [""],
      CardOwnerName: ["", [Validators.required, Validators.maxLength(100)]],
      CardNumber: [
        "",
        [
          Validators.required,
          Validators.maxLength(16),
          Validators.minLength(16),
          Validators.pattern(numericRegex),
        ],
      ],
      ExpirationDate: [
        "",
        [
          Validators.required,
          Validators.maxLength(5),
          Validators.minLength(5),
          Validators.pattern(dateRegex),
        ],
      ],
      CVV: [
        "",
        [
          Validators.required,
          Validators.maxLength(3),
          Validators.minLength(3),
          Validators.pattern(numericRegex),
        ],
      ],
    });
  }

  createForm() {
    this.frmPaymentDedail = this.formBuilder.group({
      PMId: [0],
      CardOwnerName: [null],
      CardNumber: [null],
      ExpirationDate: [null],
      CVV: [null],
    });
  }

  resetForm() {
    this.frmPaymentDedail.controls["CardOwnerName"].setValue("");
    this.frmPaymentDedail.controls["CardNumber"].setValue("");
    this.frmPaymentDedail.controls["ExpirationDate"].setValue("");
    this.frmPaymentDedail.controls["CVV"].setValue("");
    this.frmPaymentDedail.controls["PMId"].setValue(0);
  }

  onSubmit() {
    //this.service.formData = Object.assign({}, this.frmPaymentDedail.value)
    this.service.formData = this.frmPaymentDedail.getRawValue();
    console.log(this.service.formData);
    if (
      this.service.formData.PMId === null ||
      this.service.formData.PMId === 0
    ) {
      this.insertRecord();
    } else {
      this.updateRecord();
    }
  }

  insertRecord() {
    this.service.formData = Object.assign({}, this.frmPaymentDedail.value);
    this.service.formData.PMId = 0;

    this.service.postPaymentDetail().subscribe(
      (res) => {
        //debugger;
        swal("Successfull");
        this.service.refreshList();
        this.ngOnInit();
      },
      (err) => {
        //debugger;
        swal("Invalid Field Try again");
        console.log(err);
      }
    );
  }
  updateRecord() {
    this.service.formData = Object.assign({}, this.frmPaymentDedail.value);
    this.service.putPaymentDetail().subscribe(
      (res) => {
        swal("Record is updated succesfully");
        this.service.refreshList();
        this.ngOnInit();
        // this.resetForm();
        // this.toastr.info('Submitted successfully', 'Payment Detail Register');
        // this.service.refreshList();
      },
      (err) => {
        swal("Record is not updated");
      }
    );
  }
}
