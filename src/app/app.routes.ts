import { Routes } from '@angular/router';
import { MainComponentComponent } from './main-component/main-component.component';
import { ProjectDabubbleComponent } from './projects/project-dabubble/project-dabubble.component';
import { ProjectJoinComponent } from './projects/project-join/project-join.component';
import { ProjectElPolloLocoComponent } from './projects/project-el-pollo-loco/project-el-pollo-loco.component';
import { ImprintComponent } from './imprint/imprint.component';

export const routes: Routes = [
    {path: '', component: MainComponentComponent},
    {path: 'projects/project-dabubble', component: ProjectDabubbleComponent},
    {path: 'projects/project-join', component: ProjectJoinComponent},
    {path: 'projects/project-el-pollo-loco', component: ProjectElPolloLocoComponent},
    {path: 'imprint', component: ImprintComponent}
];
