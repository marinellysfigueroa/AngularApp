import { Component, OnInit, InjectionToken, Type } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { testApiService } from "./services/testapi.service";
import { Response } from "./models/response";
var forge = require("../assets/forge.all.min.js");

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  public originalDocNum;
  title = "Prueba técnica Angular Java";
  form: FormGroup;
  submitted = false;
  response: Response;

  constructor(
    private formBuilder: FormBuilder,
    private _testApiService: testApiService
  ) {}
  get f() {
    return this.form.controls;
  }
  ngOnInit() {
    //Validates
    this.form = this.formBuilder.group({
      documentnumber: ["", [Validators.required, Validators.minLength(3)]],
      name: ["", Validators.required]
    });

    //Get element to transform
    const docnumberfield = document.getElementById("documentnumber");
    const documentoCifrado = document.getElementById("documentoCifrado");
    const docnumber = document.getElementById(
      "documentnumber"
    ) as HTMLInputElement;

    docnumberfield.addEventListener("change", maskDocument);

    function maskDocument(e) {
      var publicKey =
        "MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgFziZlz1VnGhqISYCoKet7ED8pEJU5Y3XoZ7Pep8LCFUlKZ+bZTmgq4gawbpVtUCMJlTIDyQcT2zlzyBDLbBPgsDdEw868F9TioOjbQ+l6dfrXIuaRR3n8+IKEx2NIP0HtwtIjwKNv1nhbmEttYau/fAtxi/Xvw2mmAXi+e3kFJPAgMBAAE=";
      var pkstr =
        "-----BEGIN PUBLIC KEY-----" + publicKey + "-----END PUBLIC KEY-----";
      var encrypting = forge(pkstr, "documentnumber", "documentoCifrado", 2);
      //documentoCifrado.textContent = encrypting;
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    //Get WS
    var documentoCifrado = (document.getElementById(
      "documentoCifrado"
    ) as HTMLInputElement).value;
    var name = (document.getElementById("name") as HTMLInputElement).value;

    this._testApiService.getResponse(documentoCifrado, name).subscribe(data => {
      this.response = data.response;
    });
  }
}
