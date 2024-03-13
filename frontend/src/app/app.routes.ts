import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './workspace/dashboard/dashboard.component';
import { ProfileComponent } from './workspace/profile/profile/profile.component';
import { WorkspacelistComponent } from './workspace/workspacelist/workspacelist.component';
import { CreateworkspaceComponent } from './workspace/createworkspace/createworkspace.component';
import { LayoutComponent } from './layout/layout.component';
import { CollageComponent } from './workspace/collage/collage.component';
import { NavigationComponent } from './workspace/navigation/navigation.component';
import { ReportComponent } from './workspace/report/report.component';
import { EditprofileComponent } from './workspace/profile/editprofile/editprofile.component';
import { NavbarComponent } from './workspace/navbar/navbar.component';
import { CreatereportComponent } from './workspace/report/createreport/createreport.component';
import { DeleteworkspaceComponent } from './workspace/deleteworkspace/deleteworkspace.component';
export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'register',
                component: RegisterComponent
            },
            {
                path: 'workspacelist',
                component: WorkspacelistComponent
            },
            {
                path: 'createworkspace',
                component: CreateworkspaceComponent
            },
            {
                path: 'navigation',
                component: NavigationComponent
            },
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'profile',
                component: ProfileComponent
            },
            {
                path: 'editprofile',
                component: EditprofileComponent
            },
            {
                path: 'deleteworkspace/:id',
                component: DeleteworkspaceComponent
            },
            {
                path: 'navbar',
                component: NavbarComponent
            },
            {
                path: 'collage',
                component: CollageComponent
            },
            {
                path: 'report/:workspaceId',
                component: ReportComponent
            },
            {
                path: 'createreport/:workspaceId',
                component: CreatereportComponent
            }
        ]
    }


];
