import { ProjectsService } from './../projects.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Project } from '../project.type';
import { GetProjectById, GetProjects } from './graphql/queries.graphql';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-listing-form',
  templateUrl: './listing-form.component.html',
  styleUrls: ['./listing-form.component.css']
})
export class ListingFormComponent implements OnInit {
  public limit = 5;
  list: Array<Project>;
  displayedColumns: Array<string> = [
    'id',
    'name',
    'lead',
    'release',
    'customer',
    'points',
    'count'
  ];
  dataSource: MatTableDataSource<Project>;

  constructor(private serviceOne: ProjectsService) {}

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  async ngOnInit() {
    this.list = new Array<Project>();
    const collection = await this.serviceOne.getProjects();
    collection.subscribe((items: any[]) => {
      items.map((v, ix) =>
        this.list.push(<Project>{
          id: v.id,
          name: v.title,
          leadName: v.userId,
          totalStoryCount: 5,
          releaseName: `${ix + 1}.0.0`,
          totalStoryPoints: 20,
          customerName: 'Cardinal Group'
        })
      );

      this.dataSource = new MatTableDataSource<Project>(this.list);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
