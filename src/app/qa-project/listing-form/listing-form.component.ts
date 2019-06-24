import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormBuilder,
  Validators,
  FormGroup
} from "@angular/forms";
import { Project, Story, System, Environment } from "../project-form";

@Component({
  selector: "app-listing-form",
  templateUrl: "./listing-form.component.html",
  styleUrls: ["./listing-form.component.css"]
})
export class ListingFormComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
