import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Release } from '@models/project.interface';

@Component({
  selector: 'app-listing-form',
  templateUrl: './listing-form.component.html',
  styleUrls: ['./listing-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListingFormComponent implements OnInit {
  @Input() releases: Array<Release> = [] as Array<Release>;
  @Input() limit = 5;
  @Output() delete: EventEmitter<Release> = new EventEmitter();
  @Output() select: EventEmitter<Release> = new EventEmitter();

  displayedColumns: Array<string> = [
    'id',
    'projectName',
    'releaseName',
    'person'
  ];
  dataSource: MatTableDataSource<Release>;

  constructor() {}

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit() {
    this.initializeGrid();
  }

  initializeGrid() {
    this.dataSource = new MatTableDataSource<Release>(this.releases);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public deleteProject(project: Release) {
    this.delete.emit(project);
  }

  public selectProject(project: Release) {
    this.select.emit(project);
  }

  trackByFn(_, item) {
    return item.id;
  }
}
