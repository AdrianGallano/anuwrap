import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';
import { RegisterSuccessComponent } from '../auth/register-success/register-success.component';
import { DashboardComponent } from '../workspace/dashboard/dashboard.component';
import { ProfileComponent } from '../workspace/profile/profile/profile.component';
import { WorkspacelistComponent } from '../workspace/workspacelist/workspacelist.component';
import { CreateworkspaceComponent } from '../workspace/createworkspace/createworkspace.component';
import { ReportComponent } from '../workspace/report/report.component';
import { CollageComponent } from '../workspace/collage/collage.component';
import { NavigationComponent } from '../workspace/navigation/navigation.component';
import { LayoutComponent } from '../layout/layout.component';
import { EditprofileComponent } from '../workspace/profile/editprofile/editprofile.component';
import { NavbarComponent } from '../workspace/navbar/navbar.component';
import { CreatereportComponent } from '../workspace/report/createreport/createreport.component';
import { DeleteworkspaceComponent } from '../workspace/deleteworkspace/deleteworkspace.component';
import { EditworkspaceComponent } from '../workspace/editworkspace/editworkspace.component';
import { AuthGuard } from '../auth/auth.guard';
import { NotfoundComponent } from '../errors/notfound/notfound.component';
import { UnauthorizedComponent } from '../errors/unauthorized/unauthorized.component';
import { AnnualreportComponent } from '../workspace/annualreport/annualreport.component';

const routes: Routes = [
    {
        path: '404',
        component: NotfoundComponent
    },
    {
        path: '401',
        component: UnauthorizedComponent
    },
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
                path: 'register_success',
                component: RegisterSuccessComponent,
            },
            {
                path: 'workspacelist',
                component: WorkspacelistComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'createworkspace',
                component: CreateworkspaceComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'navigation',
                component: NavigationComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'navbar',
                component: NavbarComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'dashboard',
                component: DashboardComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'profile',
                component: ProfileComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'editprofile',
                component: EditprofileComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'deleteworkspace/:id',
                component: DeleteworkspaceComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'editworkspace/:id',
                component: EditworkspaceComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'collage',
                component: CollageComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'report',
                component: ReportComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'annualreport',
                component: AnnualreportComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'createreport/:workspaceId',
                component: CreatereportComponent,
                canActivate: [AuthGuard]
            },
            {
                path: '**',
                redirectTo: '/404'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
