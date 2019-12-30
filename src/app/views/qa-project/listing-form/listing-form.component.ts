import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
// import { NavigationStart, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Project, ReleaseSummary } from '@models/project.interface';

@Component({
  selector: 'app-listing-form',
  templateUrl: './listing-form.component.html',
  styleUrls: ['./listing-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListingFormComponent implements OnInit {
  @Input() releases: Array<ReleaseSummary> = [];
  @Input() limit = 5;
  @Output() delete: EventEmitter<any> = new EventEmitter();
  @Output() select: EventEmitter<any> = new EventEmitter();

  displayedColumns: Array<string> = [
    'id',
    'name',
    'lead',
    'release',
    'customer',
    'points',
    'count'
  ];
  dataSource: MatTableDataSource<ReleaseSummary>;

  constructor() {}

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  async ngOnInit() {
    this.dataSource = new MatTableDataSource<ReleaseSummary>(this.releases);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public deleteProject(project: Project) {
    this.delete.emit(project);
  }

  public selectProject(project: Project) {
    this.select.emit(project);
  }

  trackByFn(_, item) {
    return item.id;
  }
}
