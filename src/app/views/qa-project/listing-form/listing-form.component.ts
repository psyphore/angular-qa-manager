import { ProjectsService } from '@shared/services/projects.service';
import { Project } from '@shared/interfaces/project.interface';
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

@Component({
  selector: 'app-listing-form',
  templateUrl: './listing-form.component.html',
  styleUrls: ['./listing-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListingFormComponent implements OnInit {
  @Input() projects: Array<any> = [];
  @Output() delete: EventEmitter<any> = new EventEmitter();
  @Output() select: EventEmitter<any> = new EventEmitter();
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
