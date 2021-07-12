import { Component, OnInit, Inject } from '@angular/core';
import { CarService } from '../services/car.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['name', 'price', 'sku', 'model', 'status', 'soldAt', 'actions'];
  dataSourceArray: any[] = [];
  dataSource: any[]= [];
  options = [
    {value: "all", view: "All"},
    {value: "available", view: "Available"},
    {value: "sold out", view: "Sold Out"}
  ]
  filterVal : string = 'all';

  constructor(
    private carService: CarService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.getCars();
  }

  getCars() {
    this.carService.getCars()
      .subscribe({
        next: (res: any)=>{
          this.dataSourceArray = res;
          this.filter();
        },
      });
  }

  addCar(result: any) {
    this.carService.addCar(result)
      .subscribe({
        next: ((res: any)=>{
          this.getCars();
        }),
        error: (err: any)=>{
          this.notify();
        }
      });
  }

  sellCar(car: any) {
    this.carService.sellCar(car)
      .subscribe({
        next: ((res: any)=>{
          this.getCars();
        }),
        error: (err: any)=>{
          this.notify();
        }
      });
  }

  filter() {
    if (this.filterVal == 'all') {
      this.dataSource = this.dataSourceArray;
    } else {
      this.dataSource = this.dataSourceArray.filter(el=>{
        return el.status == this.filterVal;
      });
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddCar, {
      width: '50%',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.addCar(result);
    });
  }

  notify() {
    this.snackBar.openFromComponent(DialogNotify, {
      duration: 3000,
    });
  }
}

@Component({
  selector: '.dialog-add-car',
  templateUrl: './dialog/add-car.html',
})
export class DialogAddCar {
  carForm = new FormGroup({
    name: new FormControl('', Validators.required,),
    price: new FormControl('', Validators.required,),
    sku: new FormControl('', Validators.required,),
    model: new FormControl('', Validators.required,),
  });

  constructor(
    public dialogRef: MatDialogRef<DialogAddCar>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'notify',
  templateUrl: './dialog/notify.html',
})
export class DialogNotify {}
