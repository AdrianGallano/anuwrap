import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './workspace/dashboard/dashboard.component';
import { ProfileComponent } from './workspace/profile/profile/profile.component';
import { WorkspacelistComponent } from './workspace/workspacelist/workspacelist.component';
import { CreateworkspaceComponent } from './workspace/createworkspace/createworkspace.component';
import { LayoutComponent } from './layout/layout.component';
import { CollageComponent } from './workspace/collage/collage.component';
import { ReportComponent } from './workspace/report/report.component';
import { EditprofileComponent } from './workspace/profile/editprofile/editprofile.component';
import { CreatereportComponent } from './workspace/report/createreport/createreport.component';
import { ReportitemComponent } from './workspace/report/reportitem/reportitem.component';
import { DeleteworkspaceComponent } from './workspace/deleteworkspace/deleteworkspace.component';
import { AnnualreportComponent } from './workspace/annualreport/annualreport.component';
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
                path: 'deleteworkspace/:id',
                component: DeleteworkspaceComponent
            },
            {
                path: 'createworkspace',
                component: CreateworkspaceComponent
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
                path: 'workspace/:workspace_id',
                children: [
                    {
                        path: '',
                        redirectTo: 'dashboard',
                        pathMatch: 'full'
                    },
                    {
                        path: 'dashboard',
                        component: DashboardComponent
                    },

                    {
                        path: 'collage',
                        component: CollageComponent
                    },
                    {
                        path: 'report',
                        component: ReportComponent
                    },
                    {
                        path: 'report/:report_id',
                        component: ReportitemComponent,
                    },
                    {
                        path: 'createreport',
                        component: CreatereportComponent
                    },
                    {
                        path: 'annualreport',
                        component: AnnualreportComponent
                    }
                ]
            }
        ]
    }


];
