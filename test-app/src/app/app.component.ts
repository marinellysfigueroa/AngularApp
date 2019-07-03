import { Component , OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Prueba técnica Angular Java';
  form: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.form = this.formBuilder.group({
        documentnumber: ['', Validators.required],
        name: ['', Validators.required]
    });
}

get f() { return this.form.controls; }

onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
        return;
    }

    alert('Mensaje Enviado !');
}
}


